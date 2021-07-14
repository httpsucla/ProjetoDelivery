const Sequelize = require("sequelize");
class Associados extends Sequelize.Model {
    static init(sequelize) {
        super.init (
            {
                name: Sequelize.STRING,
                cnpj: Sequelize.STRING,
                password: Sequelize.STRING,
                address: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Associados, { foreignKey: "associadoId" });
    }
}

module.exports = Associados;