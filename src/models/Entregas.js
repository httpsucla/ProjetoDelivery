const Sequelize = require("sequelize");

class Entregas extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                entregaDate: Sequelize.DATE,
                description: Sequelize.STRING,
                value: Sequelize.FLOAT,
                status: Sequelize.STRING,
            },
            {
                sequelize,
            });
    }

    static associate(models) {
        this.belongsTo(models.Associados, { foreignKey: "associadoId"});
        this.belongsTo(models.Motoboys, { foreignKey: "motoboyId"});
        this.belongsTo(models.Clientes, { foreignKey: "clienteId"});
    }
}

module.exports = Entregas;