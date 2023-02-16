"use strict";

const readXlsxFile = require("read-excel-file/node");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const flavours = [
      await queryInterface.rawSelect(
        "flavour",
        { where: { name: "Pepperoni" } },
        ["id"]
      ),
      await queryInterface.rawSelect("flavour", { where: { name: "Branco" } }, [
        "id",
      ]),
      await queryInterface.rawSelect(
        "flavour",
        { where: { name: "All Dressed" } },
        ["id"]
      ),
    ];
    await readXlsxFile("./data.xlsx").then(async (rows) => {
      let insertArray = [];
      const header = rows[0];
      for (let i = 1; i < rows.length; ++i) {
        let date = rows[i][0];
        for (let amountIndex = 1; amountIndex <= 3; ++amountIndex) {
          let amount = rows[i][amountIndex];
          for (let k = 0; k < amount; ++k) {
            insertArray.push({
              date: date,
              flavour_id: flavours[amountIndex - 1],
            });
            if (insertArray.length >= 1000) {
              await queryInterface.bulkInsert("order", insertArray, {});
              insertArray = [];
            }
          }
        }
      }
      await queryInterface.bulkInsert("order", insertArray, {});
    });
  },

  down: (queryInterface) => queryInterface.bulkDelete("order", null, {}),
};
