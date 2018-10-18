let mosca = require('mosca');
let config = require('../config');
let func = require('../Functions/function');
let c = require('ansi-colors');

//Current DateTime
let datetime = require('node-datetime');
let dt = datetime.create(Date.now(),'Y-m-d H:M:S');
let currentDateTime = dt.format();


//#region configure the server
let pubsubsettings = {
    type: 'mqtt',
    json: false,
    mqtt: require('mqtt'),
    host: config.mqttHost,
    port: config.mqttPort
};

let server = new mosca.Server(pubsubsettings);          //Here start mosca
server.on('ready', setup);                              //on init it fires up setup()

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}
//#endregion

// fired when a client connects
server.on('clientConnected', function (client) {
    console.log('Client Connected:', client.id);
});

//#region Sending data
/*let message = {
    topic: '/hello/world',
    payload: 'abcde',
    qos: 0,
    retain: false
};*/
/*server.publish(message, function () {
    console.log('done!');

});*/
//#endregion

//#region Receiving data
// fired when a message is published
/*server.on('published', function (packet,client) {
    console.log('Published', packet.payload.toString('utf8'), packet.topic, currentDateTime, packet, client);
    //func.createMQTTmessage(packet.topic, packet.payload.toString('utf8'), currentDateTime, "nem tudom még", "passz");
});*/


server.on('published', function (packet, client) {
    if(client){
        console.log('Published ('+client.id+'): ', packet.payload.toString());
        let topic = packet.topic.split('/');
        console.log(c.cyan("TOPIC: "), topic, client.id);
        try {
            let json = JSON.parse(packet.payload.toString());

            if(client.id) {
                console.log(c.green(client.id), c.magentaBright(packet.payload.toString()));
                //topic, message, createdDate, mqttTypeID, deviceID
                func.createMQTTmessage(packet.topic, packet.payload.toString());
            }
        }
        catch(error) {
        }
    }

});





// fired when a client disconnects
server.on('ClientDisconnected', function (client) {
    console.log('Client Dosconnected:', client.id);
});
//#endregion


module.exports = {
    server: server,
//    message: message,
};



/**
 Mosquitto options:

 clientId, the id of the MQTT client (max 23 chars)
 keepalive, the keepalive timeout in seconds (see the MQTT spec), the default is 3000;
 port, the port to connect to;
 host, the host to connect to;
 mqtt, the mqtt module (it will automatically be required if not present).
 */
