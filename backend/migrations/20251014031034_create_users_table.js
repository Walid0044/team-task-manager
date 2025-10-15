export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username', 50).unique().notNullable();
    table.string('email', 100).unique().notNullable();
    table.string('password', 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable('users');
}
