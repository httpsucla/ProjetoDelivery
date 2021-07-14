'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
			"Clientes",
			[
				{
					name: "Calçadão",
					cnpj: "62350051000109",
          address: "Rua Joinville, 777",
				},
				{
					name: "Dois Corações",
					cnpj: "80489204000177",
          address: "Rua XV de Novembro, 1090",
				},
				{
					name: "Ostra Bebada",
					cnpj: "97093358000148",
          address: "Rua Comendador Araujo, 643",
				},
			],
			{}
		);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Clientes", null, {});
  }
};
