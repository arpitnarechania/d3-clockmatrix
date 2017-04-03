var dataset = [{"meta_startdate": 1486771208000, "meta_enddate": 1486857608000, "wake_time": 1486781408143, "month": 2, "processed_at": 1486877416030, "year": 2017, "weekday_id": 10, "sleep_duration": 7.314540833333333, "customer_id": "LA67194852", "sleep_time": 1486755075796}, {"meta_startdate": 1486857610000, "meta_enddate": 1486944010000, "wake_time": 1486861023788, "month": 2, "processed_at": 1486963816872, "year": 2017, "weekday_id": 11, "sleep_duration": 6.147785833333334, "customer_id": "LA67194852", "sleep_time": 1486838891759}, {"meta_startdate": 1486944014000, "meta_enddate": 1487030414000, "wake_time": 1486949463331, "month": 2, "processed_at": 1487050220856, "year": 2017, "weekday_id": 12, "sleep_duration": 6.121757777777778, "customer_id": "LA67194852", "sleep_time": 1486927425003}, {"meta_startdate": 1487030407000, "meta_enddate": 1487116807000, "wake_time": 1487040433986, "month": 2, "processed_at": 1487136614811, "year": 2017, "weekday_id": 13, "sleep_duration": 7.166171944444445, "customer_id": "LA67194852", "sleep_time": 1487014635767}, {"meta_startdate": 1487116848000, "meta_enddate": 1487203248000, "wake_time": 1487127483959, "month": 2, "processed_at": 1487223055249, "year": 2017, "weekday_id": 14, "sleep_duration": 7.8417525, "customer_id": "LA67194852", "sleep_time": 1487099253650}, {"meta_startdate": 1487203213000, "meta_enddate": 1487289613000, "wake_time": 1487216350443, "month": 2, "processed_at": 1487309420581, "year": 2017, "weekday_id": 15, "sleep_duration": 9.423508333333332, "customer_id": "LA67194852", "sleep_time": 1487182425813}, {"meta_startdate": 1487289610000, "meta_enddate": 1487376010000, "wake_time": 1487299225393, "month": 2, "processed_at": 1487395817241, "year": 2017, "weekday_id": 16, "sleep_duration": 6.769802777777778, "customer_id": "LA67194852", "sleep_time": 1487274854103}, {"meta_startdate": 1487462406000, "meta_enddate": 1487548806000, "wake_time": 1487474916878, "month": 2, "processed_at": 1487568613713, "year": 2017, "weekday_id": 18, "sleep_duration": 8.1397175, "customer_id": "LA67194852", "sleep_time": 1487445613895}, {"meta_startdate": 1487635252000, "meta_enddate": 1487721652000, "wake_time": 1487642344058, "month": 2, "processed_at": 1487741459255, "year": 2017, "weekday_id": 20, "sleep_duration": 6.634220555555555, "customer_id": "LA67194852", "sleep_time": 1487618460864}, {"meta_startdate": 1487721608000, "meta_enddate": 1487808008000, "wake_time": 1487727886217, "month": 2, "processed_at": 1487827815360, "year": 2017, "weekday_id": 21, "sleep_duration": 5.806233611111111, "customer_id": "LA67194852", "sleep_time": 1487706983776}, {"meta_startdate": 1487808007000, "meta_enddate": 1487894407000, "wake_time": 1487819206470, "month": 2, "processed_at": 1487914214803, "year": 2017, "weekday_id": 22, "sleep_duration": 8.988393055555555, "customer_id": "LA67194852", "sleep_time": 1487786848255}, {"meta_startdate": 1488067253000, "meta_enddate": 1488153653000, "wake_time": 1488071698744, "month": 2, "processed_at": 1488173460825, "year": 2017, "weekday_id": 25, "sleep_duration": 7.400444444444444, "customer_id": "LA67194852", "sleep_time": 1488045057144}];

var clockOptions = {};
clockOptions.clockRadius = 35;
clockOptions.textSize = clockOptions.clockRadius/5;
clockOptions.secondTickLabelSize = clockOptions.clockRadius/7;
clockOptions.hourTickLabelSize = clockOptions.clockRadius/5;
clockOptions.margin = clockOptions.clockRadius/4;
clockOptions.width = (clockOptions.clockRadius+clockOptions.margin)*2;
clockOptions.height = (clockOptions.clockRadius+clockOptions.margin)*2;
clockOptions.secondTickStart = clockOptions.clockRadius;
clockOptions.secondTickLength = - clockOptions.clockRadius/20;
clockOptions.hourTickStart = clockOptions.clockRadius;
clockOptions.hourTickLength = - clockOptions.clockRadius/10;
clockOptions.secondLabelRadius = clockOptions.clockRadius + Math.abs(clockOptions.hourTickLength) + 2;
clockOptions.secondLabelYOffset = clockOptions.clockRadius/10;
clockOptions.hourLabelRadius = clockOptions.clockRadius - Math.abs(clockOptions.hourTickLength)*2;
clockOptions.hourLabelYOffset = clockOptions.clockRadius/10;
clockOptions.startHourLabel = "Sleep";
clockOptions.endHourLabel = "Wake";
clockOptions.showStartEndHourLabels = true;
clockOptions.showHourLabels = true;
clockOptions.showSecondsLabels = false;
clockOptions.showTooltip = true;

previousWeekdayId = 0;
drawTitle(months[dataset[0].month-1] + " - " + dataset[0].year);

for(var i=0; i<dataset.length;i++){

    var weekdayId = dataset[i].weekday_id;
    if(Math.abs(weekdayId - previousWeekdayId) != 1){
        for(var j = previousWeekdayId+1; j < weekdayId;j++){
            clockOptions.startHourAngle = 0;
            clockOptions.endHourAngle = 0;
            clockOptions.clockTitle = j;
            drawClock(clockOptions,null);
            previousWeekdayId = j;
        }
    }

    var sleepTime = new Date(dataset[i].sleep_time);
    var wakeTime = new Date(dataset[i].wake_time);

    sleepTimeHours = sleepTime.getHours();
    sleepTimeMinutes = sleepTime.getMinutes();
    sleepTimeSeconds = sleepTime.getSeconds();

    wakeTimeHours = wakeTime.getHours();
    wakeTimeMinutes = wakeTime.getMinutes();
    wakeTimeSeconds = wakeTime.getSeconds();

    clockAngles = getClockAngle(sleepTimeHours,sleepTimeMinutes,sleepTimeSeconds,wakeTimeHours,wakeTimeMinutes,wakeTimeSeconds)
    clockOptions.startHourAngle = clockAngles[0];
    clockOptions.endHourAngle = clockAngles[1];
    clockOptions.clockTitle = weekdayId;

    drawClock(clockOptions,dataset[i]);

    previousWeekdayId = weekdayId;
    if(i == dataset.length-1){
        for(var j=previousWeekdayId+1;j<=getDaysInMonth(dataset[i].year,dataset[i].month);j++){
            clockOptions.startHourAngle = 0;
            clockOptions.endHourAngle = 0;
            clockOptions.clockTitle = j;

            drawClock(clockOptions,null);
        }
    }
}

// Ensure that startAngle is always less than endAngle otherwise anticlockwise rendering will happen
function getClockAngle(h1,m1,s1,h2,m2,s2){

    var h_12_hour = (h1 > 12 ? h1-12 : h1);
    fromHours =  (h_12_hour) * 30;
    fromMinutes = 0.5 * m1;
    fromSeconds = 0.5 * s1 / 60;
    var finalAngle1 = toRadians(fromHours + fromMinutes + fromSeconds);

    var h_12_hour = (h2 > 12 ? h2-12 : h2);
    fromHours =  (h_12_hour) * 30;
    fromMinutes = 0.5 * m2;
    fromSeconds = 0.5 * s2 / 60;
    var finalAngle2 = toRadians(fromHours + fromMinutes + fromSeconds);

    if(finalAngle1 > finalAngle2){
        finalAngle1 = finalAngle1 - Math.PI*2;
    }

    return [finalAngle1,finalAngle2];
}