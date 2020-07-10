const express = require("express")
const router = express.Router()

const controller = require("./student.controller")


router.get("/log", controller.getLogs)

router.post("/start_study", controller.startStudy)

router.post("/finish_study", controller.finishStudy)

module.exports = router