import { Request, Response } from "express"
import bcrypt from "bcrypt"

import db from "../database/connection"

export default class UsersController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body

    const [user] = await db("users")
      .where("users.email", "=", email)
      .select(["users.id", "users.password", "users.email", "users.name", "users.lastname", "users.avatar"])
      
    
    if(user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if(result) {
          return response.status(200).json({
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            avatar: user.avatar
          })
        } else {
          return response.status(400).json({message: "Password Incorrect"})
        }
      })
    } else {
      return response.status(404).json({message: "Email incorrect"})
    }
  }

  async create(request: Request, response: Response) {
    const { name, lastname, email, password, avatar } = request.body

    const [user] = await db("users")
      .where("users.email", "=", email.toLowerCase())
      .select("*")

    if(user) {
      return response.json({"message": "E-mail aready exists!"})
    }

    try {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          await db("users").insert({
            avatar,
            name,
            lastname,
            email: email.toLowerCase(),
            password: hash,
          })
        })
      })
    } catch(err) {
      return response.status(400).json({
        message: "Internal error, try again."
      })
    }


    return response.status(201).json({
      message: "User create successfull"
    })
  }
}
