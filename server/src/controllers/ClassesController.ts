import db from "../database/connection"
import { Request, Response } from "express"
import convertedHourToMinute from "../utils/convertedHourToMinute"

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}

export default class ClassesController {
  async index(req: Request, res: Response) {
    const filters = req.query

    if(!filters.week_day || !filters.subject || !filters.time) {
      res.status(400).json({ error: "Missing filters to search classes" })
    }

    const timeinMinutes = convertedHourToMinute(filters.time as string)

    const classes = await db("classes")
      .whereExists(function() {
        this.select("class_schedule.*")
        .from("class_schedule")
        .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
        .whereRaw("`class_schedule`.`week_day` = ??", [Number(filters.week_day)])
        .whereRaw("`class_schedule`.`from` <= ??", [Number(timeinMinutes)])
        .whereRaw("`class_schedule`.`to` > ??", [Number(timeinMinutes)])
      })
      .where("classes.subject", "=", filters.subject as string)
      .join("users", "classes.user_id", "=", "users.id" )
      .select(["classes.*", "users.*"])

    return res.json(classes)
  }

  async create(req: Request, res: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body
  
    const trx = await db.transaction()
  
    try {
      // Banco Users
      const insertedUsersIds =await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio
      })
  
      const user_id = insertedUsersIds[0]
  
      // Banco Classes
      const insertedClassesId = await trx("classes").insert({
        subject,
        cost,
        user_id
      })
  
      const class_id = insertedClassesId[0]
  
      // Banco Class_Schedule
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertedHourToMinute(scheduleItem.from),
          to: convertedHourToMinute(scheduleItem.to)
        }
      })
  
      await trx("class_schedule").insert(classSchedule)
  
      await trx.commit()
  
      return res.status(201).send()
    } catch(err) {
      await trx.rollback()
  
      return res.status(400).json({ error: "Unexpected error while creating new class" })
    }
  }
}