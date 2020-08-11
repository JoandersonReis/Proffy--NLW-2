import Knex from "knex"

export async function up(knex: Knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary()
    table.string("subject").notNullable()
    table.decimal("cost").notNullable()

    table.integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      // Autoupdate no id caso seja alterado no banco de dados users
      .onUpdate("CASCADE")
      // Deleta todos os campos caso o proprietário do id seja deletado do banco
      .onDelete("CASCADE")
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("classes")
}
