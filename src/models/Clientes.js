const Sequelize = require("sequelize");
class Clientes extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                cnpj: Sequelize.STRING,
                address: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Entregas, { foreignKey: "clienteId" });
    }
}

module.exports = Clientes;