"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Motoboys",
      [
        {
          name: "Paula Sucla",
          cpf: "89042706007",
          password: "Ps123!@",
          phone: "(41) 99245-9494",
        },
        {
          name: "Amanda Zepechouka",
          cpf: "52963279000",
          password: "Az456$%",
          phone: "(41) 99122-7878",
        },
        {
          name: "Larissa Neves",
          cpf: "31285752074",
          password: "Ln789&*",
          phone: "(41) 98815-5166",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Motoboys", null, {});
  },
};
