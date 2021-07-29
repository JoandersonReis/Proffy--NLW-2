import { Request, Response } from "express"
import db from "../database/connection"

export default class ConnectionController {
  async index(request: Request, response: Response) {
    const connections = await db("connections").select("*")

    return response.json({
      total: connections.length
    })
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body

    await db("connections").insert({
      user_id
    })

    return response.status(201).send()
  }
}