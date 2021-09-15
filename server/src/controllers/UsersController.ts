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
      .select(["users.avatar", "users.email", "users.id", "users.name",  "users.lastname", "users.password", "users.proffy"])
      
    if(user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if(result) {
          return response.status(200).json({
            name: user.name,
	          lastname: user.lastname,
	          email: user.email,
	          id: user.id,
            avatar: `http://192.168.1.102:3333/uploads/${user.avatar}`,
            proffy: user.proffy
          })
        } else {
          return response.status(202).json({message: "Senha Incorreta"})
        }
      })
    } else {
      return response.status(202).json({message: "Email ou senha Incorretos"})
    }
  }

  async create(request: Request, response: Response) {
    const { name, lastname, email, password } = request.body

    const [user] = await db("users")
      .where("users.email", "=", email.toLowerCase())
      .select("*")

    if(user) {
      return response.status(202).json({message: "E-mail ja existe!"})
    }

    try {
      if(name && lastname && email && password) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
            await db("users").insert({
              avatar: "default.png",
              name,
              lastname,
              email: email.toLowerCase(),
              password: hash,
            })
          })
        })
      } else {
        return response.status(202).json({message: "Preencha todos os campos"})
      }
    } catch(err) {
      return response.status(400).json({
        message: "Internal error, try again."
      })
    }


    return response.status(201).send()
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

    return response.status(202).json({message: "Email não existe"})
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

  async index(request: Request, response: Response) {
    const [count] = await db("users").where("users.proffy", "=", true).count()

    return response.status(200).json({totalProffys: count["count(*)"]})
  }
}
