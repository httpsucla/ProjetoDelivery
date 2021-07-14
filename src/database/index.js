const Sequelize = require("sequelize");
const dbConfig = require("./config/dbconfig");

const Associados = require("../models/Associados");
const Motoboys = require("../models/Motoboys");
const Clientes = require("../models/Clientes");
const Entregas = require("../models/Entregas");

const connection = new Sequelize(dbConfig);

Associados.init(connection);
Motoboys.init(connection);
Clientes.init(connection);
Entregas.init(connection);

Associados.associate(connection.models);
Motoboys.associate(connection.models);
Clientes.associate(connection.models);
Entregas.associate(connection.models);

module.exports = connection;