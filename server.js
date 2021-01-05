const express = require("express");
const asterikAmi = require("asterisk-ami");
const app = express();
const port = 3000

const ami = new asterikAmi({host:'192.168.30.71', username:'admin',password:'root'})

ami.on('ami_data', function(data){
	console.log('AMI DATA', data);
	//decide between Events and non events here and what to do with them, maybe run an event emitter for the ones you care about
});

ami.connect(function(){
	ami.send({action: 'Ping'});//run a callback event when we have connected to the socket
});//connect creates a socket connection and sends the login action

ami.send({action: 'Ping'});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})