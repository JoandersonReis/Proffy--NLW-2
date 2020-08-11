import Knex from "knex"

export async function up(knex: Knex) {
  return knex.schema.createTable("connections", (table) => {
    table.increments("id").primary()

    table.integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      // Autoupdate no id caso seja alterado no banco de dados users
      .onUpdate("CASCADE")
      // Deleta todos os campos caso o proprietário do id seja deletado do banco
      .onDelete("CASCADE")

    table.timestamp("created_at")
      // Adiciona um valor default para o horário atual
      .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
      .notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("connections")
}