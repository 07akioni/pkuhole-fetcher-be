var express = require('express');
var router = express.Router();
var Op = require('sequelize').Op
const { Post, PostDetail } = require('../models')

router.get('/q', async function (req, res, next) {
  let { fromPid } = req.query
  fromPid = Number.parseInt(fromPid)
  if (typeof fromPid !== 'number' || fromPid < 0) {
    res.status(400).send({
      status: 'error',
      statusMessage: 'wrong parameter'
    })
    return
  } else {
    let postModels
    if (fromPid === 0) {
      postModels = await Post.findAll({
        order: [['pid', 'DESC' ]],
        limit: 15
      })
    } else {
      postModels = await Post.findAll({
        where: {
          pid: {
            [Op.lt]: fromPid
          }
        },
        order: [['pid', 'DESC' ]],
        limit: 15
      })
    }
    res.send({
      status: 'ok',
      data: postModels.map(v => {
        if (v.dangerous) {
          return {
            pid: v.pid,
            dangerous: v.dangerous
          }
        } else {
          return v.dataValues
        }
      })
    })
  }
});

router.get('/d', async function (req, res, next) {
  let { pid } = req.query
  pid = Number.parseInt(pid)
  if (typeof pid !== 'number' || pid < 0) {
    res.status(400).send({
      status: 'error',
      statusMessage: 'wrong parameter'
    })
    return
  } else {
    let postDetailModel = await PostDetail.findOne({
      where: {
        pid
      }
    })
    if (postDetailModel.dangerous) {
      res.send({
        status: 'ok',
        data: {
          pid: v.pid,
          dangerous: v.dangerous
        }
      })
    } else {
      res.send({
        status: 'ok',
        data: postDetailModel.dataValues
      })
    }
  }
})

module.exports = router;
