import * as Knex from "knex";


export const up = async (knex: Knex): Promise<any> => 
    knex.schema.createTable('cpu', table => {
        table.integer('user_id').unsigned()
            .references('id').inTable('users')
            .onDelete('CASCADE');
        table.integer('core').notNullable();
        table.float('usage').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    })


export const down = async (knex: Knex): Promise<any> => 
    knex.schema.dropTable('cpu');