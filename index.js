const time = document.getElementById("time");
const datep = document.getElementById("date");
const setAlarm = document.getElementById("alarm-btn");
var days = document.querySelector("#day")
const alarmContainer = document.getElementById("alarmContainer");
const alarmbody = document.querySelector("#alarmContainer");
var audio = new Audio('ringtone.mp3');
var alarmAddBtn = document.getElementById("alarmAddBtn");
var alarmAdd = document.getElementById("setAlarm");
var closeBtn = document.getElementById("closeBtn");

// hide unhide alarm seter
alarmAddBtn.addEventListener("click", function () {
    alarmAdd.style.display = "flex";
    closeBtn.style.display = "block"
    alarmAddBtn.style.display = "none"
})
closeBtn.addEventListener("click", function () {
    closeBtn.style.display = "none"
    alarmAddBtn.style.display = "block"
    alarmAdd.style.display = "none";
})


showAlarm()


// changing days of the week
setInterval(
    function runAlarm() {
        let date = new Date();
        let time = date.getTime()
        var Alarms = localStorage.getItem("Alarms");
        if (Alarms == null) {
            allAlarm = [];
        } else {
            allAlarm = JSON.parse(Alarms);
        }
        allAlarm.forEach(function (element, index) {
            if (element.time - time <= 0) {
                alarmbody.children[index].classList.add("animate");
                if (element.snooze > 0) {
                    alarmbody.children[index].children[2].childNodes[3].style.display = "inline-block"
                }
                audio.play()
            }
            else {


                alarmbody.children[index].classList.remove("animate");
                alarmbody.children[index].children[2].childNodes[3].style.display = "none"


            }
        })
        localStorage.setItem("Alarms", JSON.stringify(allAlarm));
    })

var currentDate = new Date();
var currentDay = currentDate.getDay()
// making disable
for (let i = 0; i < currentDay; i++) {
    days[i].disabled = true;
}
// setting current day
days[currentDay].selected = true;
// setting value of left days
var day = 6 - currentDay;
j = currentDay;
for (let i = 0; i <= day; i++) {
    days[j].value = i;
    j++;
}

function showAlarm() {
    var Alarms = localStorage.getItem("Alarms");
    if (Alarms == null) {
        allAlarm = [];
    } else {
        allAlarm = JSON.parse(Alarms);
    }

    let html = "";
    allAlarm.forEach(function (element, index) {
        var values = dateTime(element.time)
        var snoozeDisplay = "inline-block";
        if (element.snooze == 0) {
            var snoozeDisplay = "none";
        }
        html +=
            `<div class="alarmbody">
       <h2>${h}:${m}:${s} ${ampm},${day}</h2>
       <p></p>
       <div>
       <button class="delete" onclick="deleteAlarm(${index})"><span class="material-symbols-outlined">
           do_not_disturb_on
           </span></button>
       <button class="snooze" onclick="snooze(${index})" style="display:${snoozeDisplay}"><span class="material-symbols-outlined">
               snooze
           </span>${element.snooze}</button>
           </div>
         </div>`
    });

    alarmContainer.innerHTML = html

}

// snooze
function snooze(index) {
    var Alarms = localStorage.getItem("Alarms");
    if (Alarms == null) {
        allAlarm = [];
    } else {
        allAlarm = JSON.parse(Alarms);
    }
    allAlarm[index].snooze--;
    allAlarm[index].time = allAlarm[index].time + 300000;
    localStorage.setItem("Alarms", JSON.stringify(allAlarm));
    showAlarm()
    audio.pause();
    audio.currentTime = 0;

}

// delete alarm
function deleteAlarm(index) {
    var Alarms = localStorage.getItem("Alarms");
    if (Alarms == null) {
        allAlarm = [];
    } else {
        allAlarm = JSON.parse(Alarms);
    }

    allAlarm.splice(index, 1);
    localStorage.setItem("Alarms", JSON.stringify(allAlarm));
    showAlarm()
    audio.pause();
    audio.currentTime = 0;
}
// convert millisecond to date and time
function dateTime(millisecond) {
    let date = new Date(millisecond);
    h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";
    year = date.getFullYear()
    month = date.getMonth() + 1
    dayDate = date.getDate()
    day = date.getDay();
    // for day
    if (day == 7) {
        day = "Sunday";
    }
    if (day == 1) {
        day = "Monday";
    }
    if (day == 2) {
        day = "Tuesday";
    }
    if (day == 3) {
        day = "Wednesday";
    }
    if (day == 4) {
        day = "Thursday";
    }
    if (day == 5) {
        day = "Friday";
    }
    if (day == 6) {
        day = "Saturday";
    }
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    // time
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    return {
        day: day,
        dayDate: dayDate,
        month: month,
        h: h,
        m: s,
        ampm: ampm
    }
}

// calculating time left b/w alarm and currentime
setInterval(
    function calculatingTime(millisecond) {
        var time = null
        let date = new Date();
        let newTime = date.getTime()
        time = millisecond - newTime
        return time;
    }
)



// setting clock

setInterval(() => {
    let date = new Date();
    let values = dateTime(date);
    datep.innerText = `${day},${dayDate}-${month}-${year}`;
    time.innerText = `${h}:${m}:${s} ${ampm}`;
});

setAlarm.addEventListener("click", function () {
    const aDay = document.getElementById("day");
    const aHour = document.getElementById("hour");
    const aMin = document.getElementById("minute");
    const AAmPm = document.getElementById("AmPm");
    const warning = document.getElementById("warning");
    if (aHour.value == "Hour") {
        warning.style.display = "block"
    }
    else {
        if (aMin.value == "Minute") {
            warning.style.display = "block"
        }
        else {
            var date = new Date();
            var year = date.getFullYear();
            var dayDate = date.getDate();
            var month = date.getMonth()
            // set am/pm
            if (AAmPm.value == "PM") {
                var hour = Number(aHour.value) + 12;
            }
            else {
                hour = aHour.value;
            }
            var alarmTime = new Date(year, month, dayDate, hour, aMin.value)
            var alarmTimeInMS = alarmTime.getTime();
            console.log(alarmTime)
            console.log(alarmTimeInMS)
            // setting day          
            alarmTimeInMS = alarmTimeInMS + (aDay.value * 86400000)
            var setDate = new Date(alarmTimeInMS);
            if (date.getTime() < alarmTimeInMS) {
                console.log(setDate)
                console.log(alarmTimeInMS)
                warning.style.display = "none"
                var Alarms = localStorage.getItem("Alarms");
                if (Alarms == null) {
                    allAlarm = [];
                } else {
                    allAlarm = JSON.parse(Alarms);
                }

                let myAlarm = {
                    time: alarmTimeInMS,
                    snooze: 3,
                    on: false
                }
                allAlarm.push(myAlarm);
                localStorage.setItem("Alarms", JSON.stringify(allAlarm));
                console.log(allAlarm)
            }
            else {
                warning.style.display = "block"
            }


            aHour.value = "Hour"
            aMin.value = "Minute"
            showAlarm()
        }
    }

})



