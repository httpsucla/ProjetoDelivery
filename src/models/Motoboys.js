const Sequelize = require("sequelize");
class Motoboys extends Sequelize.Model {
    static init(sequelize) {
        super.init (
            {
                name: Sequelize.STRING,
                cpf: Sequelize.STRING,
                password: Sequelize.STRING,
                phone: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Motoboys, { foreignKey: "motoboyId" });
    }
}

module.exports = Motoboys;