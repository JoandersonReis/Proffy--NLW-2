import express from "express"
import ClassesController from "./controllers/ClassesController"
import ConnectionsController from "./controllers/ConnectionsController"

const classesController = new ClassesController()
const connectionsController = new ConnectionsController()

const router = express.Router()


router.post("/classes", classesController.create)
router.get("/classes", classesController.index)
router.get("/connections", connectionsController.index)
router.post("/connections", connectionsController.create)

export default router