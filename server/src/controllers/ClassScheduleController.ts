import { Request, Response } from "express"

import db from "../database/connection"

export default class ClassScheduleController {
  async index(request: Request, response: Response) {
    const { class_id } = request.query as any

    const schedules = await db("class_schedule")
      .where<any>("class_schedule.class_id", "=", class_id)
      .select("*")

    return response.status(200).json(schedules)
  }
}
