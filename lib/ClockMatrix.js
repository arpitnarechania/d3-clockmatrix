/*

@author: Arpit Narechania
@email: arpitnarechania@gmail.com
@project: d3-clockmatrix

Copyright 2017 Arpit Narechania

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.

*/


function formatAMPM(date) {
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


function toRadians(degs){
    return Math.PI*degs/180;
}

var months = new Array(12);
months[0] =  "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";


var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

function getDaysInMonth(year,month){

    var is_leap_year = false;
    if(year%4==0 && year%400==0 && year%100!=0){
        is_leap_year = true;
    }

    var months = new Array(12);
    months[0] =  31;
    months[1] = is_leap_year ? 29 : 28;
    months[2] = 31;
    months[3] = 30;
    months[4] = 31;
    months[5] = 30;
    months[6] = 31;
    months[7] = 31;
    months[8] = 30;
    months[9] = 31;
    months[10] = 30;
    months[11] = 31;

    return months[month-1];
}

function toRadians(degs){
    return Math.PI*degs/180;
}

function toDegrees(radians){
    return 180*radians/Math.PI;
}

function drawTitle(title){
    var titleSvg = d3.select("#title").append("svg")
        .attr("width", "100%")
        .attr("height", "40")

        titleSvg.append("text")
        .attr("x","50%")
        .attr("y","20")
        .style("text-anchor","middle")
        .text(title)
}

function drawClock(clockOptions,data){ //create all the clock elements

    var radians = 0.0174532925;
    var clockRadius = clockOptions.clockRadius,
        margin = clockOptions.margin,
        width = clockOptions.width,
        height = clockOptions.height,
        secondTickStart = clockOptions.secondTickStart;
        secondTickLength = clockOptions.secondTickLength,
        hourTickStart = clockOptions.hourTickStart,
        hourTickLength = clockOptions.hourTickLength,
        secondLabelRadius = clockOptions.secondLabelRadius,
        secondLabelYOffset = clockOptions.secondLabelYOffset,
        hourLabelRadius = clockOptions.hourLabelRadius,
        hourLabelYOffset = clockOptions.hourLabelYOffset,
        textSize = clockOptions.textSize,
        secondTickLabelSize = clockOptions.secondTickLabelSize;
        hourTickLabelSize = clockOptions.hourTickLabelSize;
        startHourAngle = clockOptions.startHourAngle;
        endHourAngle = clockOptions.endHourAngle;
        startHourLabel = clockOptions.startHourLabel;
        endHourLabel = clockOptions.endHourLabel;
        clockTitle = clockOptions.clockTitle;
        showStartEndHourLabels = clockOptions.showStartEndHourLabels;
        showSecondsLabels = clockOptions.showSecondsLabels;
        showHourLabels = clockOptions.showHourLabels;
        showTooltip = clockOptions.showTooltip;

    var hourScale = d3.scale.linear()
        .range([0,330])
        .domain([0,11]);

    var minuteScale = secondScale = d3.scale.linear()
        .range([0,354])
        .domain([0,59]);

	var svg = d3.select("#clockMatrix").append("svg")
	    .attr("width", width)
	    .attr("height", height)

    var borderPath = svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", height)
      .attr("width", width)
      .style("stroke", "black")
      .style("fill", "none")
      .style("stroke-width", "1");

  	var face = svg.append('g')
		.attr('id','clock-face')
		.attr('transform','translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

    var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(clockRadius)
            .startAngle(startHourAngle)
            .endAngle(endHourAngle);

    if(data != null){
    face.append("path")
        .attr("class", "arc")
        .attr("d", arc)
        .style("fill","#3498db")
        .style("stroke","black")
        .style("stroke-width",1)
    }
    if(showTooltip){
        add_tooltips();
    }
    function add_tooltips(){

        // Adding a tooltip which on mouseover shows the date range and the last_close points range.
        var tooltip = d3.select("body")
            .append('div')
            .attr('class', 'tooltip');

        tooltip.append('div')
        .attr('class', 'value');

        svg.selectAll(".arc")
        .on('mouseover', function(d) {

            if(data == null){
                return;
            }
            var html = "<table><tr><th>Date</th><th>" + data.weekday_id + "/" + data.month + "/" + data.year + "</th></tr>"
                        + "<tr><th>Day</th><th>" + weekday[new Date(data.year + "/" + data.month + "/" + data.weekday_id).getDay()] + "</th></tr>"
                        + "<tr><th>Sleep Time</th><th>" + formatAMPM(data.sleep_time) + "</th></tr>"
                        + "<tr><th>Wake Time</th><th>" + formatAMPM(data.wake_time) + "</th></tr>"
                        + "<tr><th>Duration (hours)</th><th>" + (data.sleep_duration).toFixed(2) + "</th></tr><table>"


            tooltip.select('.value').html(html);

            tooltip.style('display', 'block');
            tooltip.style('opacity',2);

            d3.select(this).style("opacity",0.5)

        })
        .on('mousemove', function(d) {
            tooltip.style('top', (d3.event.layerY + 10) + 'px')
            .style('left', (d3.event.layerX - 25) + 'px');
        })
        .on('mouseout', function(d) {
            d3.select(this).style("opacity",1)
            tooltip.style('display', 'none');
            tooltip.style('opacity',0);
        });
    }

    if(showStartEndHourLabels && data!=null){
        face.append("text")
            .attr("x",clockRadius/2)
            .attr("y",-clockRadius/10)
            .style("fill","black")
            .style("stroke","black")
            .attr("transform", "rotate(" + (toDegrees(startHourAngle)-90) + ")")
            .style("font-size",textSize)
            .attr('text-anchor','middle')
            .text(startHourLabel)

        face.append("text")
            .attr("x",clockRadius/2)
            .attr("y",-clockRadius/10)
            .style("fill","black")
            .style("stroke","black")
            .attr("transform", "rotate(" + (toDegrees(endHourAngle)-90) + ")")
            .style("font-size",textSize)
            .attr('text-anchor','middle')
            .text(endHourLabel)
    }

    face.append("circle")
        .style("fill","white")
        .attr("r",clockRadius/4)

    face.append("text")
        .attr("text-anchor","middle")
        .attr("dy","0.27em")
        .style("font-size",textSize)
        .text(clockTitle);


    //add marks for seconds
	face.selectAll('.second-tick')
		.data(d3.range(0,60)).enter()
			.append('line')
			.attr('class', 'second-tick')
			.attr('x1',0)
			.attr('x2',0)
			.attr('y1',secondTickStart)
			.attr('y2',secondTickStart + secondTickLength)
			.attr('transform',function(d){
				return 'rotate(' + secondScale(d) + ')';
			});

    if(showSecondsLabels){
        //and labels
        face.selectAll('.second-label')
            .data(d3.range(5,61,5))
                .enter()
                .append('text')
                .attr('class', 'second-label')
                .attr('text-anchor','middle')
                .attr('x',function(d){
                    return secondLabelRadius*Math.sin(secondScale(d)*radians);
                })
                .attr('y',function(d){
                    return -secondLabelRadius*Math.cos(secondScale(d)*radians) + secondLabelYOffset;
                })
                .style("font-size",secondTickLabelSize)
                .text(function(d){
                    return d;
                });
    }
    if(showHourLabels){
        //... and hours
        face.selectAll('.hour-tick')
            .data(d3.range(0,12)).enter()
                .append('line')
                .attr('class', 'hour-tick')
                .attr('x1',0)
                .attr('x2',0)
                .attr('y1',hourTickStart)
                .attr('y2',hourTickStart + hourTickLength)
                .attr('transform',function(d){
                    return 'rotate(' + hourScale(d) + ')';
                });
    }
	face.selectAll('.hour-label')
		.data(d3.range(3,13,3))
			.enter()
			.append('text')
			.attr('class', 'hour-label')
			.attr('text-anchor','middle')
			.attr('x',function(d){
				return hourLabelRadius*Math.sin(hourScale(d)*radians);
			})
			.attr('y',function(d){
				return -hourLabelRadius*Math.cos(hourScale(d)*radians) + hourLabelYOffset;
			})
			.style("font-size",hourTickLabelSize)
			.text(function(d){
				return d;
			});
    }