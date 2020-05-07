import * as Knex from "knex";

export const up = async (knex: Knex): Promise<any> =>
  knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

export const down = async (knex: Knex): Promise<any> =>
  knex.schema.dropTable('users'); 