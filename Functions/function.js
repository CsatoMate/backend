let Sequelize = require('sequelize');
let dbModel = require('../dbModel/dbModel');
let passwordHash = require('password-hash');
let c = require('ansi-colors');


let User = dbModel.User;
let Device = dbModel.Device;
let MQTTmessage = dbModel.MQTT_Message;
let MQTTtype = dbModel.MQTT_type;

//#region User's functions
/**
 * Create User to database
 * @param name - user name
 * @param pwd - password
 * @param isAdmin - true or false
 */
function createUser(name, pwd, isAdmin) {
    User.create({
        username: name,
        password: passwordHash.generate(pwd),
        role: isAdmin
    })
        .catch(function (error) {
            console.log(c.red('Create User error: '), c.red(error));
        })
}

/**
 * Return user by name
 * @param name
 * @returns {Promise<Array<Model>>}
 */
function findUser(name) {
    return User.findOne({
        where: {
            username: name
        }
    })
}

/**
 * Find All user, what contains name param
 * @param name
 * @returns {*}
 */
function findUserContainsName(name) {
    var OP = Sequelize.Op;
    return User.findAll({
        where: {
            username: {
                [OP.like]: '%' + name + '%'
            }
        }
    });
}

/**
 * Find All User
 * @returns {Promise<Array<Model>>}
 */
function findAllUser() {
    return User.findAll({});
}

/**
 * Update User Table by id
 * @param name
 * @param newPwd
 */
function updateUserById(name, newPwd) {
    User.findOne({where: {username: name}})
        .then(function (result) {
            if (result) {
                result.updateAttributes({
                    password: newPwd,
                });
            }
        });
}

/**
 * Check two password verify or not
 * @param loginPwd
 * @param dbPwd
 * @returns {boolean}
 */
function verifyPwd(loginPwd, dbPwd) {
    return passwordHash.verify(loginPwd,dbPwd);
}

//#endregion

//#region MQTTmessage's functions
/**
 * Create MQTT messages to database
 * @param topic
 * @param message
 * @param createdDate
 * @param mqttTypeID
 * @param deviceID
 */
function createMQTTmessage(topic, message, createdDate, mqttTypeID, deviceID) {
    MQTTmessage.create({
        topic: topic,
        message: message,
        createdDate: createdDate,
        mqttTypeID: mqttTypeID,
        deviceID: deviceID
    })
        .catch(function (error) {
            console.log(c.red('Create MQTTmessage error: '), c.red(error));
        })

}

function findAllMQTTmessage() {
    return MQTTmessage.findAll();
}

/**
 * Find all messages by device ID
 * @param deviceID
 * @returns {Promise<Array<Model>>}
 */
function findMessagebyDeviceID(deviceID) {
    return MQTTmessage.findAll({
        where: {
            deviceID: deviceID
        }
    })
}

/**
 * Find all messages by type ID
 * @param typeID
 * @returns {Promise<Array<Model>>}
 */
function findMessagebyTypeID(typeID) {
    return MQTTmessage.findAll({
        where: {
            deviceID: typeID
        }
    })
}

//#endregion

//#region MQTTtype's functions
/**
 * Create MQTT type to database
 * @param unit
 * @param command
 */
function createMQTTtype(unit, command) {
    MQTTtype.create({
        unit: unit,
        command: command
    })
        .catch(function (error) {
            console.log(c.red('Create MQTTtype error: '), c.red(error));
        })
}

/**
 * Return all MQTT type from database
 * @returns {*}
 */
function findAllMQTTtype() {
    return MQTTtype.findAll();
}

//#endregion

//#region Device's functions
/**
 * Create Devices to database
 * @param deviceID
 * @param topicAddress
 */
function createDevice(deviceID, topicAddress) {
    Device.create({
        deviceID: deviceID,
        topicAddress: topicAddress
    })
}

/**
 * Return all devices
 * @returns {Promise<Array<Model>>}
 */
function findAllDevice() {
    return Device.findAll();
}

/**
 * Find device by ID
 * @param deviceID
 * @returns {Promise<Array<Model>>}
 */
function findDeviceByDeviceID(deviceID) {
    return Device.findAll({
        where: {deviceID: deviceID}
    })
}

//#endregion


module.exports = {
    createUser: createUser,
    createDevice: createDevice,
    createMQTTmessage: createMQTTmessage,
    createMQTTtype: createMQTTtype,

    updateUserById:updateUserById,
    verifyPwd:verifyPwd,

    findAllUser: findAllUser,
    findAllDevice: findAllDevice,
    findAllMQTTtype: findAllMQTTtype,
    findAllMQTTmessage: findAllMQTTmessage,

    findUser: findUser,
    findUserContainsName: findUserContainsName,
    findMessagebyTypeID: findMessagebyTypeID,
    findMessagebyDeviceID: findMessagebyDeviceID,
    findDeviceByDeviceID: findDeviceByDeviceID,


};