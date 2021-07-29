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
      .select(["classes.*", "users.*"])

    return response.json(classes)
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body
  
    // Cria uma transação, ou seja todas as alterações no banco serão feitas ao mesmo tempo. impedindo que uma funcione se a outra der erro
    const trx = await db.transaction() 
  
    try {
      const insertedUsersIds = await trx("users").insert({
        name,
        avatar,
        bio,
        whatsapp
      })
    
      const user_id = insertedUsersIds[0]
    
      const insertedClassesIds = await trx("classes").insert({
        subject,
        cost,
        user_id
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
}