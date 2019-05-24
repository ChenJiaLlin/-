const formatTime_zidai = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 时钟函数
function format_Time(time, format) {
  let temp = '0000000000' + time
  let len = format.length
  return temp.substr(-len)
}

//首页任务框的函数
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute];

  // return [ month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function halfHour() {
  let timeArr = [];
  for (let i = 0; i <= 48; i++) {
    if (i % 2 == 0) {
      timeArr.push(formatNumber(i / 2) + ':00');
    } else {
      timeArr.push(formatNumber(Math.floor(i / 2)) + ":30")
    }
  }
  return timeArr;
}
let timeArr = halfHour();

function setTimeHalf() {
  var thisDate = new Date(), thisTime = formatTime(thisDate), lastTimeArr = [], index = 0;

  timeArr.map(function (t, i) {
    let tArr = t.split(":");
    if (thisTime[0] >= Number(tArr[0])) {
      index = thisTime[1] <= 30 ? i : i + 1;
    }
  })
  lastTimeArr = timeArr.slice(index);
  if (thisTime[1] !== 0 && thisTime[1] !== 30) {
    lastTimeArr.unshift(thisTime[0] + ":" + thisTime[1]);
  }
  return lastTimeArr;
}
function setTimeShi(){
  var thisDate=new Date(),shiArr = [];
  return thisDate.getHours + ":"+thisDate.getMinutes;
}

module.exports = {
  formatTime: formatTime,
  setTimeHalf: setTimeHalf,
  format_Time:format_Time
}


