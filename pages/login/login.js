var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
  },

  onLoad () {
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },

  formSubmit: function(e) {
    console.log(api.json2Form(e.detail.value))
    // api.post('http://ios1.artand.cn/login/doLogin', api.json2Form(e.detail.value))
    //   .then(res => {
    //     console.log(res)
    //   })
    var userInfo = api.json2Form(e.detail.value);
    var userInfoArr = userInfo.split("&");
    var userName = (userInfoArr[0].split("="))[1];
    var userPassword = (userInfoArr[1].split("="))[1];
    wx.cloud.init({ env:"yun-kai-fa-5ccaab",traceUser:true});
    // 1. 获取数据库引用
    const db = wx.cloud.database({ env:"yun-kai-fa-5ccaab"});
    db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        description: 'learn cloud database',
        due: new Date('2018-09-01'),
        tags: [
          'cloud',
          'database'
        ],
        done: false,
        userName:userName,
        userPassword:userPassword
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })

    db.collection('user').doc('XOi1VPdsX1oQesfZ').get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
      }
    })
  
  }
})
