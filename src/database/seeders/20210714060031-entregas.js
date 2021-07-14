'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
			"Entregas",
			[
				{
					description: "Entrega 1",
          value: 20.68,
          status: "Entregue",
					motoboyId: 1,
          clienteId: 2,
				},
				{
					description: "Entrega 2",
          value: 59.80,
          status: "Pendente",
					motoboyId: 3,
          clienteId: 3,
				},
				{
					description: "Entrega 3",
          value: 29.90,
          status: "Pendente",
					motoboyId: 2,
          clienteId: 1,
				},
			],
			{}
		);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Entregas", null, {});
  }
};
