import {Request, Response} from "express"

import db from "../database/connection"
import convertHourToMinutes from "../utils/convertHourToMinutes"

interface ScheduleProps {
  week_day: number,
  to: string,
  from: string
}


export default class ClassesController {
  async index(request: Request, response: Response) {
    const classes = await db("classes")
      .join("users", "users.id", "=", "classes.user_id")
      .select([
        "users.name", 
        "users.lastname", 
        "users.email", 
        "users.whatsapp", 
        "users.bio", 
        "users.bio", 
        "users.avatar", 
        "classes.*",
      ])

    return response.status(200).json(classes)
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
        "users.bio",
        "users.avatar", 
        "classes.*",
      ])

    return response.json(classes)
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
      avatar,
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
          avatar,
          bio,
          whatsapp,
          email
        })
    
      const classSchedule = schedule.map((scheduleItem: ScheduleProps) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
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