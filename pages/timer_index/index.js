const util = require('../../utils/util.js')
const defaultLogName = {
  work: '工作',
  rest: '休息'
}
const actionName = {
  stop: '停止',
  start: '开始'
}

const initDeg = {
  left: 45,
  right: -45,
}


Page({

  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  data: {
    remainTimeText: '',
    keepTimeList: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23","24" , "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"],
    timerType: 'work',
    log: {},
    completed: false,
    isRuning: false,
    leftDeg: initDeg.left,
    rightDeg: initDeg.right,
    isPicker:true,
    v:[1],

    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://dl.stream.qqmusic.qq.com/M500003OHEyE0KsfOJ.mp3?vkey=267E4D1D6DB9FEC99223F424A0D32779C461F04DF0B43F69CF5C7AE1BE5148311DD2457EB8E754B5AFFE1CD3C24C7881D68065214C3A26E6&guid=5150825362&fromtag=1',
  },


  onShow: function() {
    if (this.data.isRuning) return 
    let workTime = util.format_Time(wx.getStorageSync('workTime'), 'HH')
    let restTime = util.format_Time(wx.getStorageSync('restTime'), 'HH')
    console.log(wx.getStorageSync('workTime'))
    this.setData({
      workTime: workTime,
      restTime: restTime,
      remainTimeText: workTime + ':00'
    })
  },

  changeWorkTime: function (e) {
    console.log(e.detail.value[0]),
    wx.setStorage({
      key: 'workTime',
      data: this.data.keepTimeList[e.detail.value[0]]
    })
  },

  startTimer: function(e) {
    let startTime = Date.now()
    let isRuning = this.data.isRuning
    let timerType = e.target.dataset.type
    console.log(e.target.dataset.type)
    let showTime = this.data["workTime"]
    let keepTime = showTime * 60 * 1000
    let logName = this.logName || defaultLogName[timerType]

    if (!isRuning) {
      this.audioCtx.play()
      console.log("播放音乐")
      this.timer = setInterval((function() {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
    } else {
      this.audioCtx.pause()
      this.stopTimer()
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: timerType,
      //timerType:"work",
      remainTimeText: showTime + ':00',
      taskName: logName
    })

    this.data.log = {
      name: logName,
      startTime: Date.now(),
      keepTime: keepTime,
      endTime: keepTime + startTime,
      action: actionName[isRuning ? 'stop' : 'start'],
      type: timerType
    }

    this.saveLog(this.data.log)
  },

  startNameAnimation: function() {
    let animation = wx.createAnimation({
      duration: 450
    })
    animation.opacity(0.2).step()
    animation.opacity(1).step()
    this.setData({
      nameAnimation: animation.export()
    })
  },

  stopTimer: function() {
    // reset circle progress
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })

    // clear timer
    this.timer && clearInterval(this.timer)
  },

  //改变时间的方法
  updateTimer: function() {
    let log = this.data.log //获取日志信息
    let now = Date.now()  //获取当前时间
    //用结束时间-当前时间=剩余时间
    let remainingTime = Math.round((log.endTime - now) / 1000)  
    let H = util.format_Time(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = util.format_Time(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = util.format_Time(Math.floor(remainingTime) % 60, 'SS')
    let halfTime

    // update text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      this.setData({
        completed: true
      })
      this.stopTimer()
      this.audioCtx.pause()
      return
    }

    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
    }
  },

  changeLogName: function(e) {
    this.logName = e.detail.value
  },

  saveLog: function(log) {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(log)
    wx.setStorageSync('logs', logs)
  },

  changePicker:function(){
    if(this.data.isPicker){
        this.setData({
        isPicker:false,
        completed:true
      })
    }else{
      this.setData({
        isPicker:true,
        completed:false
      })
    }
    this.onShow()

    console.log(this.data.isPicker)
  },

  // 音乐
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },
  funplay: function () {
    console.log("audio play");
  },
  funpause: function () {
    console.log("audio pause");
  },
  funtimeupdate: function (u) {
    console.log(u.detail.currentTime);
    console.log(u.detail.duration);
  },
  funended: function () {
    console.log("audio end");
  },
  funerror: function (u) {
    console.log(u.detail.errMsg);
  }
  
})
