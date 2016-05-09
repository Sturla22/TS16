var ws = new WebSocket('ws://localhost:5000');
ws.onopen = function(e){
  ws.onmessage = function(e){
    sensors(e.data,"ax")
  }
}
