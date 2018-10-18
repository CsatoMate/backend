let config = require('../config');
let Sequelize = require('sequelize');

let sequelize = new Sequelize(config.dbName, config.dbUserName, config.dbPWD, {
    dialect: config.dialect,
    storage: config.storage
});

/**
 * User Model in Database
 * role: Admin or NOT
 */
let User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    role: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});

let MQTT_Message = sequelize.define('MQTTmessage', {
    topic: {
        type: Sequelize.STRING,
    },
    message: {
        type: Sequelize.STRING,
    },
/*    createdDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },*/
/*    mqttTypeID: {
        type: Sequelize.STRING,
    },*/
/*    deviceID: {
        type: Sequelize.STRING,
    }*/
});

/**
 * command: command or data
 * @type {Model}
 */
/*let MQTT_type = sequelize.define('MQTTtype', {
    unit: {
        type: Sequelize.STRING,
    },
    command: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});*/

let Device = sequelize.define('Device', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING,
    },
    Type: {
        type: Sequelize.STRING,
    },
    UserID: {
        type: Sequelize.STRING,
    },
    Auth: {
        type: Sequelize.BOOLEAN,
    }
});

let Sensor = sequelize.define('Sensor', {
   sensortype: {
       type: Sequelize.STRING,
   },

});

/**
 * Set foreign key
 */
/*MQTT_Message.belongsTo(MQTT_type, {foreignKey: 'mqttTypeID'});
MQTT_Message.belongsTo(Device, {foreignKey: 'deviceID'});*/
/**
 * Create schema if necessary
 */
sequelize.sync();

module.exports = {
    User: User,
    MQTT_Message: MQTT_Message,
    //MQTT_type: MQTT_type,
    Device: Device,
    Sensor: Sensor
};

