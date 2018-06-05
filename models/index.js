const Sequelize = require('sequelize')

const sequelize = new Sequelize('pkuhole', 'root', 'root', {
  dialect: 'mysql',
  logging: false
})

const Post = sequelize.define('post', {
  pid: {
    type: Sequelize.INTEGER
  },
  text: {
    type: Sequelize.TEXT
  },
  type: {
    type: Sequelize.CHAR
  },
  timestamp: {
    type: Sequelize.INTEGER
  },
  reply: {
    type: Sequelize.INTEGER
  },
  likenum: {
    type: Sequelize.INTEGER
  },
  extra: {
    type: Sequelize.INTEGER
  },
  url: {
    type: Sequelize.STRING
  },
  deleted: {
    type: Sequelize.BOOLEAN
  },
  /*dangerous: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }*/
}, {
  indexes: [
    {
      unique: true,
      fields: ['pid']
    }
  ]
})

const PostDetail = sequelize.define('postDetail', {
  pid: Sequelize.INTEGER,
  text: Sequelize.TEXT('MEDIUM')
}, {
  indexes: [
    {
      unique: true,
      fields: ['pid']
    }
  ]
})

module.exports = {
  Post,
  PostDetail
}