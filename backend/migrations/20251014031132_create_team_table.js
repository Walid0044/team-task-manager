export function up(knex) {
  return knex.schema.createTable('teams', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.text('description');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable('teams');
}
