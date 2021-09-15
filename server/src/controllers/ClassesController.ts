import {Request, Response} from "express"

import db from "../database/connection"
import convertHourToMinutes from "../utils/convertHourToMinutes"

interface ScheduleProps {
  week_day: number,
  to: string,
  from: string
}

interface ClassProps {
  avatar: string,
  name: string,
  lastname: string,
  bio: string,
  email: string,
  whatsapp: string,
  subject: string,
  cost: number,
  if: number,
  user_id: number
}

export default class ClassesController {
  async show(request: Request, response:Response) {
    const { id } = request.params

    const [classes] = await db("classes")
      .where("classes.user_id", "=", id)
      .select("*")

    const [user] = await db("users")
      .where("users.id", "=", id)
      .select(["users.whatsapp", "users.bio"])

    const schedules = await db("class_schedule")
      .where("class_schedule.class_id", "=", classes.id)
      .select(["class_schedule.week_day", "class_schedule.from", "class_schedule.to"])

    return response.status(200).json({
      ...user,
      ...classes,
      schedules
    })
  }

  async index(request: Request, response: Response) {
    const classes = await db("classes")
      .join("users", "users.id", "=", "classes.user_id")
      .select([
        "users.name", 
        "users.lastname", 
        "users.email", 
        "users.whatsapp", 
        "users.bio",
        "users.avatar", 
        "classes.*",
      ])

      const classesModify = classes.map((item: ClassProps) => {
        return {
          ...item,
          avatar: `http://192.168.1.102:3333/uploads/${item.avatar}`
        }
      })

    return response.status(200).json(classesModify)
  }

  async search(request: Request, response: Response) {
    const filters = request.query

    const week_day = filters.week_day as string
    const subject = filters.subject as string
    const time = filters.time as string

    if(!week_day || !subject || !time) {
      return response.status(400).json({
        error: "Missing filters to search classes"
      })
    }

    const timeInMinutes = convertHourToMinutes(time)

    const classes = await db("classes")
      .whereExists(function() {
        this.select("class_schedule.*")
        .from("class_schedule")
        .whereRaw("`class_schedule`.`class_id` = `classes`.`id`") // Join
        .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)]) // "??" significa cada posição no array, se fosse 2 posições seriam "?? ??"
        .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
        .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes])
      })
      .where("classes.subject", "=", subject)
      .join("users", "users.id", "=", "classes.user_id")
      .select([
        "users.name", 
        "users.lastname", 
        "users.email", 
        "users.whatsapp", 
        "users.bio",
        "users.avatar", 
        "classes.*",
      ])

      const classesModify = classes.map((item: ClassProps) => {
        return {
          ...item,
          avatar: `http://192.168.1.102:3333/uploads/${item.avatar}`
        }
      })

    return response.json(classesModify)
  }

  async create(request: Request, response: Response) {
    const {
      subject,
      cost,
      schedule,
      user_id,
      bio,
      whatsapp
    } = request.body
  
    // Cria uma transação, ou seja todas as alterações no banco serão feitas ao mesmo tempo. impedindo que uma funcione se a outra der erro
    const trx = await db.transaction() 
  
    try {
      const insertedClassesIds = await trx("classes").insert({
        subject,
        cost,
        user_id
      })

      await trx("users")
        .where("users.id", "=", user_id)
        .update({
          proffy: true,
          bio,
          whatsapp
        })
    
      const class_id = insertedClassesIds[0]

    
      const classSchedule = schedule.map((scheduleItem: ScheduleProps) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id
        }
      })
    
      await trx("class_schedule").insert(classSchedule)
    
      await trx.commit() // Executa as transações no banco
    
      return response.status(201).send()
    } catch(err) {
      trx.rollback() // Desfaz qualquer alteração que foi feita no banco durante a execução do trx
  
      return response.status(400).json({
        error: "Unexpected error while creating a new class"
      })
    }
  }

  async update(request: Request, response: Response) {
    const {
      id,
      subject,
      cost,
      schedule,
      user_id,
      name,
      lastname,
      bio,
      whatsapp,
      email
    } = request.body

  
    // Cria uma transação, ou seja todas as alterações no banco serão feitas ao mesmo tempo. impedindo que uma funcione se a outra der erro
    const trx = await db.transaction() 
  
    try {
      await trx("classes")
        .where("classes.id", "=", id)
        .update({
          subject,
          cost,
          user_id
        })

      await trx("users")
        .where("users.id", "=", user_id)
        .update({
          name,
          lastname,
          avatar: request.file?.filename,
          bio,
          whatsapp,
          email
        })
    
      const classSchedule = schedule.map((scheduleItem: string) => {
        const scheduleObject = JSON.parse(scheduleItem)

        return {
          week_day: scheduleObject.week_day,
          from: convertHourToMinutes(scheduleObject.from),
          to: convertHourToMinutes(scheduleObject.to),
          class_id: id
        }
      })
    
      await trx("class_schedule").where("class_schedule.class_id", "=", id).delete()
      await trx("class_schedule").insert(classSchedule)
    
      await trx.commit() // Executa as transações no banco
    
      return response.status(201).send()
    } catch(err) {
      trx.rollback() // Desfaz qualquer alteração que foi feita no banco durante a execução do trx
  
      return response.status(400).json({
        error: "Unexpected error while updating a new class"
      })
    }
  }
}
