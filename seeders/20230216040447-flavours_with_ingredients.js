"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PepperoniFlavour = await queryInterface.rawSelect(
      "flavour",
      { where: { name: "Pepperoni" } },
      ["id"]
    );

    const BrancoFlavour = await queryInterface.rawSelect(
      "flavour",
      { where: { name: "Branco" } },
      ["id"]
    );

    const AllDressedFlavour = await queryInterface.rawSelect(
      "flavour",
      { where: { name: "All Dressed" } },
      ["id"]
    );

    let ingredientMap = {};
    let ingredientList = [
      "Pepperoni",
      "Cheese",
      "Vedgetable",
      "Dough",
      "Sauce",
    ];

    for (let ingredient of ingredientList) {
      const ingredientFind = await queryInterface.rawSelect(
        "ingredient",
        { where: { name: ingredient } },
        ["id"]
      );
      if (!ingredientFind) {
        return null;
      }
      ingredientMap[ingredient] = ingredientFind;
    }

    if (PepperoniFlavour && BrancoFlavour && AllDressedFlavour) {
      queryInterface.bulkInsert(
        "flavour_ingredient",
        [
          {
            flavour_id: PepperoniFlavour,
            ingredient_id: ingredientMap["Pepperoni"],
            amount: 16,
          },
          {
            flavour_id: PepperoniFlavour,
            ingredient_id: ingredientMap["Cheese"],
            amount: 40,
          },
          {
            flavour_id: PepperoniFlavour,
            ingredient_id: ingredientMap["Dough"],
            amount: 1,
          },
          {
            flavour_id: PepperoniFlavour,
            ingredient_id: ingredientMap["Sauce"],
            amount: 1,
          },
          {
            flavour_id: BrancoFlavour,
            ingredient_id: ingredientMap["Cheese"],
            amount: 90,
          },
          {
            flavour_id: BrancoFlavour,
            ingredient_id: ingredientMap["Dough"],
            amount: 1,
          },
          {
            flavour_id: BrancoFlavour,
            ingredient_id: ingredientMap["Sauce"],
            amount: 1,
          },
          {
            flavour_id: AllDressedFlavour,
            ingredient_id: ingredientMap["Pepperoni"],
            amount: 8,
          },
          {
            flavour_id: AllDressedFlavour,
            ingredient_id: ingredientMap["Cheese"],
            amount: 30,
          },
          {
            flavour_id: AllDressedFlavour,
            ingredient_id: ingredientMap["Vedgetable"],
            amount: 30,
          },
          {
            flavour_id: AllDressedFlavour,
            ingredient_id: ingredientMap["Dough"],
            amount: 1,
          },
          {
            flavour_id: AllDressedFlavour,
            ingredient_id: ingredientMap["Sauce"],
            amount: 1,
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface) =>
    queryInterface.bulkDelete("flavour_ingredient", null, {}),
};
