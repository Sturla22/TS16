var wss = new WebSocket('ws://localhost:5000');
var limit = 60 * 1
var groups = {
    ax: {
        value: 0,
        color: 'orange',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    ay: {
        value: 0,
        color: 'green',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    az: {
        value: 0,
        color: 'grey',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
    sp: {
        value: 0,
        color: 'red',
        data: d3.range(limit).map(function() {
            return 0
        })
    },
}
// Add new values
t = new Date().getTime();
oldval = 0;
wss.onmessage = function(message) {
    parseddata = JSON.parse(message.data)
    for (var name in parseddata){
      groups[name].data.push(parseddata[name])
      // console.log(parseddata);
    }
    if(oldval != parseddata.sp){
      $(".speed span").html(Math.round(parseddata.sp/10*3.6*1.4) + " km/h")
      t = new Date().getTime();
      oldval = parseddata.sp;
    }else{
      if(new Date().getTime() - t > 2000){
        $(".speed span").html(0 + " km/h")
      }
    }

    // console.log()
};

plotmyass(groups,"ax")
plotmyass(groups,"ay")
plotmyass(groups,"az")
plotspeed(groups,"sp")
