'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Entregas", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
				type: Sequelize.STRING,
				allowNull: false,
			},
      motoboyId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Motoboys", key: "id" },
				onUpdate: "RESTRICT",
				onDelete: "RESTRICT",
			},
      clienteId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: { model: "Clientes", key: "id" },
				onUpdate: "RESTRICT",
				onDelete: "RESTRICT",
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
    await queryInterface.dropTable("Entregas");
  }
};
