import { Knex } from "knex"

export async function up(knex: Knex) {
  return knex.schema.createTable("classes", (table) => {
    table.increments("id").primary()
    table.string("subject").notNullable()
    table.decimal("cost").notNullable()

    table.integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE") // Atualiza user_id caso id seja alterado
      .onDelete("CASCADE") // Deleta todas "classes" relacionadas a esse id
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("classes")
}
