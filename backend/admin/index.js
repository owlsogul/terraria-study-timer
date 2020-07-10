const express = require("express")
const router = express.Router()
const controller = require("./admin.controller")

const chkAdmin = (req, res, next)=>{
    if (req.session && req.session.isAdmin){
        next()
    }
    else {
        res.status(400).json({ msg: "NeedPassword" })
    }
}

router.post("/login", controller.login)

router.use("/", chkAdmin)

router.get("/log", controller.getLogs)

router.delete("/log/:logId", controller.deleteLog)

router.post("/log", controller.addLog)


router.post("/start_game", controller.startGame)

router.post("/finish_game", controller.finishGame)

module.exports = router