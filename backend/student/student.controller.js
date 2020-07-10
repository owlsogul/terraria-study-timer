const models = require("../models")
const Sequelize = require("sequelize")
const Op = Sequelize.Op;

const findNotFinishedLog = (cond)=>{

    return models.Log.findOne({ where: {
        logType: 1,
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
}



exports.startStudy = (req, res)=>{

    let title = req.body.title

    const start = ()=>{
        return models.Log.create({
            logType: 1,
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

exports.finishStudy = (req, res)=>{
    
    let logId = -1

    const finish = (log)=>{
        logId = log.logId
        return models.Log.update({ endedAt: Date.now() }, { where: { logId: logId } })
    }

    const respond = ()=>{
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