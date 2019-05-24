var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    log_s:[],
    modalHidden: true,
    toastHidden: true
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '任务记录'
    })
    this.getLogs()
  },
  set: function() {

  },
  // getLenght:function(jsonData){
  //   var jsonLength = 0;
  //   for(var i in jsonData){
  //     jsonLength++;
  //   }
  //   return jsonLength;
  // },
  getLogs: function() {
    var log_s=[]
    let logs = wx.getStorageSync('logs')
    console.log(logs)
    logs.forEach(function(item, index, arry) {
      console.log(typeof item)
      if(typeof item != "number"){
        item.startTime = new Date(item.startTime).toLocaleString()
        log_s.push(item)
      }
    })
    // var index=0
    // for(var item in logs){
    //   if (typeof item != "number") {
    //     item.startTime = new Date(item.startTime).toLocaleString()
    //     index++;
    //   } else {
    //     logs.splice(index, 1)
    //     // if(index != 0){index--;}
    //   }
    // }
    this.setData({
      logs: log_s
    })
  },
  onLoad: function() {},
  switchModal: function() {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  hideToast: function() {
    this.setData({
      toastHidden: true
    })
  },
  clearLog: function(e) {
    wx.setStorageSync('logs', [])
    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  }
})
