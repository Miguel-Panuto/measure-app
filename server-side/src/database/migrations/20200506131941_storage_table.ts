import * as Knex from "knex";


export const up = async (knex: Knex): Promise<any> => 
    knex.schema.createTable('storage', table => {
        table.integer('user_id').unsigned()
            .references('id').inTable('users')
            .onDelete('CASCADE');
        table.float('usage').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    })


export const down = async (knex: Knex): Promise<any> => 
    knex.schema.dropTable('storage');