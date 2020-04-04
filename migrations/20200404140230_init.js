/* eslint-disable func-names */
exports.up = function (knex) {
  return knex.schema
    .createTable('feedbacks', (table) => {
      table.increments();
      table.string('text', 600).notNullable();
      table.boolean('new').defaultTo(true).notNullable();
      table.timestamps(true, true);
    })
    .createTable('twitch_users', (table) => {
      table.increments();
      table.integer('user_id').notNullable();
      table.string('username', 200).notNullable();
      table.boolean('is_online').defaultTo(false).notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('feedbacks').dropTable('twitch_users');
};
