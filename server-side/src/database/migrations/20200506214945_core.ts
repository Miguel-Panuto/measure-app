import * as Knex from "knex";

export const up = async (knex: Knex): Promise<any> =>
  knex.schema.createTable('core', table => {
    table.integer('core_id').notNullable();
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.float('usage').notNullable();
    
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

export const down = (knex: Knex): Promise<any> =>
  knex.schema.dropTable('core')
