# d3-clockmatrix

**d3-clockmatrix** is an open-source JavaScript library for rendering calendar with clocks using the D3.js library.

# Example
Check out an [Example](https://arpitnarechania.github.io/d3-clockmatrix/) where you can test various configuration options.

# Installation

Download d3-clockmatrix using bower.

```
bower install d3-clockmatrix --save
```

To use this library then, simply include d3.js, ClockMatrix.js and ClockMatrix.css:

``` html
<script src="/path/to/d3.min.js"></script>
<script src="/path/to/dist/ClockMatrix.css"></script>
<script src="/path/to/dist/ClockMatrix.js"></script>
```

# Usage

To use this library, you must create a container element and instantiate a new clock:

```html
<div id="clockMatrix"></div>
```

```data
var dataset = {"wake_time": 1486781408143, "month": 2, "year": 2017, "weekday_id": 10, "sleep_duration": 7.314540833333333, "sleep_time": 1486755075796}
```

Setting chart parameters
``` javascript

var clockOptions = {};
clockOptions.clockRadius = 50;
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


drawClock(clockOptions,dataset); // This will draw a simple clock.

```

## Options

| Option                     | Description                                                               | Type     | Options
| -------------------------- | ------------------------------------------------------------------------- | -------- | ------------------------- |
| `width`                    | The width of the clock in pixels                                          | number   | `200`                     |
| `height`                   | The height of the clock in pixels                                         | number   | `300`                     |
| `margin`                   | The margin                                                                | number   | `10`                      |
| `hourTickLabelSize`        | The hour tick label size                                                  | number   | `50`                      |
| `secondTickLabelSize`      | The second tick label size                                                | number   | `50`                      |
| `clockRadius`              | The clock radius                                                          | number   | `100`                     |
| `textSize`                 | The text size in the center of the clock                                  | number   | `0`                       |
| `secondTickStart`          | The position to start seconds tick                                        | number   | `0`                       |
| `secondTickLength`         | The length of second tick                                                 | number   | `0`                       |
| `hourTickStart`            | The position to start hours tick                                          | number   | `0`                       |
| `hourTickLength`           | The length of hour tick                                                   | number   | `0`                       |
| `secondLabelRadius`        | The radius of the second label                                            | number   | `0`                       |
| `secondLabelYOffset`       | The offset of the second label                                            | number   | `0`                       |
| `hourLabelRadius`          | The radius of the hour label                                              | number   | `0`                       |
| `hourLabelYOffset`         | The offset of the hour label                                              | number   | `0`                       |
| `startHourLabel`           | Start Hour Label Text                                                     | string   | `Sleep`                   |
| `endHourLabel`             | End Hour Label Text                                                       | string   | `Wake`                    |
| `showStartEndHourLabels`   | Whether to show start and end hour labels                                 | bool     | `true`                    |
| `showHourLabels`           | Whether to show hour labels                                               | bool     | `true`                    |
| `showSecondsLabels`        | Whether to show seconds labels                                            | bool     | `true`                    |
| `showTooltip`              | Whether to show tooltip on hover                                          | bool     | `true`                    |

# Author

Arpit Narechania
arpitnarechania@gmail.com

# License

MIT license.