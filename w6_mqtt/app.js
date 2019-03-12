// required when running on node.js
var mqtt = require('mqtt');

var client = mqtt.connect('mqtt://try:try@broker.shiftr.io', {
  clientId: 'VINCEVINCEVINCEVINCEVINCE'
});

client.on('connect', function(){
  console.log('client has connected!');

	client.subscribe('/sensorReading/CO2');
	client.subscribe('/ITPSecretClubhouse/VINCE');
  // client.unsubscribe('/example');

  setInterval(function(){
    client.publish('/ADELE', 'hello from the other side~~~~');
    client.publish('/ITPSecretClubhouse/VINCE', '─=≡Σ((( つ•̀ω•́)つ');
  }, 5000);
});

client.on('message', function(topic, message) {
  console.log('new message:', topic, message.toString());
});