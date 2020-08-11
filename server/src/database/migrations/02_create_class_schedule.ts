import Knex from "knex"

export async function up(knex: Knex) {
  return knex.schema.createTable("class_schedule", (table) => {
    table.increments("id").primary()
    
    table.integer("week_day").notNullable()
    table.integer("from").notNullable()
    table.integer("to").notNullable()

    table.integer("class_id")
      .notNullable()
      .references("id")
      .inTable("classes")
      // Autoupdate no id caso seja alterado no banco de dados users
      .onUpdate("CASCADE")
      // Deleta todos os campos caso o proprietário do id seja deletado do banco
      .onDelete("CASCADE")
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("class_schedule")
}