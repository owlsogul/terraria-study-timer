const models = require("../models")
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

const findNotFinishedLog = (cond)=>{

    return models.Log.findOne({ where: {
        logType: 0,
        startedAt: { [Op.ne]: null },
        endedAt: null
    }})
    .then(log=>{
        if (cond(log)) throw new Error("NoLog")
        return log
    })

}


exports.getLogs = (req, res)=>{
    const respond = (data)=>{
        res.json(data)
    }

    models.Log
        .findAll()
        .then(respond)
        .catch(err=>{
            console.log(err)
            res.status(400).json({ msg: "fail" })
        })
}

exports.deleteLog = (req, res)=>{

    let logId = req.params.logId

    models.Log
        .destroy({ where: { logId: logId } })
        .then(()=>{
            res.json({ msg: "success" })
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({ msg: "fail" })
        })


}

exports.addLog = (req, res)=>{

    let title = req.body.title
    let logType = req.body.logType
    let startedAt = req.body.startedAt
    let endedAt = req.body.endedAt

    models.Log
        .create({
            title: title,
            logType: logType,
            startedAt: startedAt,
            endedAt: endedAt
        })
        .then(log=>{
            res.json(log)
        })
        .catch(err=>{
            console.log(err)
            res.status(400).json({ msg: "fail" })
        })

}


exports.startGame = (req, res)=>{

    let title = req.body.title

    const start = ()=>{
        return models.Log.create({
            logType: 0,
            title: title
        })
    }

    const respond = (newLog)=>{
        res.json(newLog)
    }

    findNotFinishedLog(log=>log)
        .then(start)
        .then(respond)
        .catch(err=>{
            console.log(err)
            if (err.message == "NoLog") res.status(400).json({ msg: "AlreadyStart" })
            else res.status(400).json({ msg:"fail"})
        })
}

exports.finishGame = (req, res)=>{
    
    let logId = -1

    const finish = (log)=>{
        logId = log.logId
        return models.Log.update({ endedAt: Date.now() }, { where: logId })
    }

    const respond = (result)=>{
        res.json({ msg: logId })
    }

    findNotFinishedLog(log=>!log)
        .then(finish)
        .then(respond)
        .catch(err=>{
            console.log(err)
            if (err.message == "NoLog") res.status(400).json({ msg: "NoStart" })
            else res.status(400).json({ msg:"fail"})
        })
}

const conf = require("../config/config.json")
exports.login = (req, res)=>{

    let password = req.body.password

    if (conf.adminPassword == password){
        req.session.isAdmin = true
        res.json({ msg: "success"})
    }
    else {
        res.status(400).json({ msg: "fail" })
    }


}