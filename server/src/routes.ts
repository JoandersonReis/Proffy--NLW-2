import express from "express"

import ClassesController from "./controllers/ClassesController"
import ClassScheduleController from "./controllers/ClassScheduleController"
import ConnectionController from "./controllers/ConnectionController"
import UsersController from "./controllers/UsersController"

const routes = express.Router()

const classesController = new ClassesController()
const connectionsController = new ConnectionController()
const usersController = new UsersController()
const scheduleController = new ClassScheduleController()

routes.get("/classes", classesController.index)
routes.post("/classes", classesController.create)
routes.get("/search", classesController.search)

routes.get("/connections", connectionsController.index)
routes.post("/connections", connectionsController.create)

routes.post("/login", usersController.login)
routes.post("/users", usersController.create)
routes.post("/reset-password", usersController.resetPassword)
routes.put("/change-password", usersController.changePassword)

routes.get("/schedules", scheduleController.index)

export default routes