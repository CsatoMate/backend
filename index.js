let express = require('express');
let app = express();
let config = require('./config');
let c = require('ansi-colors');
let func = require('./Functions/function');
let mqttBroker = require('./MQTT/mqttBroker');

let server = app.listen(config.port, function () {
    let host = server.address().address;
    let port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);
});

app.get(('/api/valami'), function(req, res){
    console.log("valami");
});


function main() {
    //func.createUser("Mate", "alma", true);
    let sumi = func.findUser("Mate");
    let sum = func.findAllUser();
    sum.then((res) => {
        res.forEach((item) => {
            console.log(c.cyan(item.dataValues.username));
        });

    });

    sumi.then(res => {
        let veri = func.verifyPwd("ama", res.dataValues.password);
            console.log(c.yellow(veri));

        console.log(c.magenta(res.dataValues.username));
    })



}

//main();