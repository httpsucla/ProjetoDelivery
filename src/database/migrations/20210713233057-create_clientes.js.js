'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Clientes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nameCompany: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal(
					"CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
				),
			},
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Clientes");
  }
};
