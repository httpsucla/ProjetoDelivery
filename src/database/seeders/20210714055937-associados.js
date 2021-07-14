'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
			"Associados",
			[
				{
					name: "Rappi",
					cnpj: "42974837000181",
					password: "Rappi123!@",
          			address: "Rua Marechal Deodoro, 123",
				},
				{
					name: "Loggi",
					cnpj: "92436881000106",
					password: "Loggi456$%",
          			address: "Avenida Sete de Setembro, 5290",
				},
				{
					name: "Shipp",
					cnpj: "39779799000100",
					password: "Shipp789&*",
          			address: "",
				},
			],
			{}
		);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Associados", null, {});
  }
};
