import { Request, Response } from "express"
import bcrypt, { hash } from "bcrypt"
import nodemailer from "nodemailer"
import { randomBytes } from "crypto"
import fs from "fs"
import Handlebars from "handlebars"
import path from "path"

import db from "../database/connection"

export default class UsersController {
  async login(request: Request, response: Response) {
    const { email, password } = request.body

    const [user] = await db("users")
      .where("users.email", "=", email)
      .select(["users.avatar", "users.email", "users.id", "users.name",  "users.lastname", "users.password"])
      
    if(user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if(result) {
          return response.status(200).json(user)
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

  async resetPassword(request: Request, response: Response) {
    const { to } = request.body

    const [user] = await db("users").where("users.email", "=", to).select("*")

    if(user) {
      const date = new Date()

      await db("users").where("users.email", "=", to).update({
        token: randomBytes(10).toString("hex"),
        tokenTime: (date.getHours() + 1) * 60
      })

      // Nodemailer
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "joandersonreis470@gmail.com",
          pass: "12191517eu"
        }
      })

      const filePath = path.join(__dirname, '../utils/bodyNodemailer/index.html');
      const source = fs.readFileSync(filePath, 'utf-8').toString();

      let template = Handlebars.compile(source)

      let data = {
        name: user.name,
        token: user.token
      }

      let htmlModified = template(data)

      let mailOptions = {
        from: "joandersonreis470@gmail.com",
        to,
        subject: "Troca de senha",
        text: "Troca de senha Proffy",
        html: htmlModified
      }
  
      transporter.sendMail(mailOptions, (error, res) => {
        if(error) {
          console.log(error)
        } else {
          return response.status(200).send()
        }
      })

      return response.status(200).send()
    }

    return response.status(404).json({message: "Email not found"})
  }

  async changePassword(request: Request, response: Response) {
    const { token, id, password } = request.body
    const date = new Date()

    console.log(date.getHours() * 60)

    const [user] = await db("users")
      .where("users.id", "=", id)
      .where("users.token", "=", token)
      .where("users.tokenTime", ">=", date.getHours() * 60)
      .where("users.tokenTime", "<=", (date.getHours() + 1) * 60)

    if(user) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          await db("users")
            .where("users.id", "=", id)
            .update({
              password: hash,
              token: null,
              tokenTime: null
            })
        })
      })

      return response.status(200).send()
    }

    return response.status(500).send()
  }
}