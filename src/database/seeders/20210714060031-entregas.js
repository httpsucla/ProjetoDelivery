"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Entregas",
      [
        {
		  entregaDate: "2021-06-07",
          description: "Entrega 1",
          value: 20.68,
          status: "Entregue",
		  associadoId: 1,
          motoboyId: 1,
          clienteId: 2,
        },
        {
		  entregaDate: "2021-07-14",	
          description: "Entrega 2",
          value: 59.8,
          status: "Pendente",
		  associadoId: 2,
          motoboyId: 3,
          clienteId: 3,
        },
        {
		  entregaDate: "2021-07-03",
          description: "Entrega 3",
          value: 29.9,
          status: "Pendente",
		  associadoId: 3,
          motoboyId: 2,
          clienteId: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Entregas", null, {});
  },
};
