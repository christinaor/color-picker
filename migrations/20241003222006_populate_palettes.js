/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex("palettes").insert([
    {
      palette: '{"1":{"r":1,"g":2,"b":3},"2":{"r":1,"g":2,"b":3},"3":{"r":1,"g":2,"b":3},"4":{"r":1,"g":2,"b":3},"5":{"r":1,"g":2,"b":3}}',
      title: "First Default Palette",
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex("palettes").delete();
};


