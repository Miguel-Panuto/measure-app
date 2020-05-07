import * as Knex from "knex";


export const up = async (knex: Knex): Promise<any> => 
    knex.schema.createTable('cpu', table => {
        table.string('model').notNullable();
        table.float('speed').notNullable();    
        table.integer('user_id').unsigned()
            .references('id').inTable('users')
            .onDelete('CASCADE');
    });


export const down = async (knex: Knex): Promise<any> => 
    knex.schema.dropTable('cpu');