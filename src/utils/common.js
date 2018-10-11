export function countDown(allSecond) {
    let timeStr
    var day = 0,
        hour = 0,
        minute = 0,
        second = 0 //时间默认值
    if (allSecond > 0) {
        day = Math.floor(allSecond / (60 * 60 * 24))
        hour = Math.floor(allSecond / (60 * 60)) - day * 24
        minute = Math.floor(allSecond / 60) - day * 24 * 60 - hour * 60
        second =
            Math.floor(allSecond) -
            day * 24 * 60 * 60 -
            hour * 60 * 60 -
            minute * 60
    }
    if (day <= 9) day = '0' + day
    if (hour <= 9) hour = '0' + hour
    if (minute <= 9) minute = '0' + minute
    if (second <= 9) second = '0' + second
    if (Number(day) <= 0) {
        timeStr = hour + ':' + minute + ':' + second
    } else {
        timeStr = day + '天  ' + hour + ':' + minute + ':' + second
    }
    return timeStr

}