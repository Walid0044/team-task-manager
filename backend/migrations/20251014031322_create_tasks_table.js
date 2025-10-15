export function up(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('title', 200).notNullable();
    table.text('description');
    table.string('status', 20).defaultTo('pending');
    table.string('priority', 20).defaultTo('medium');
    table.timestamp('due_date');
    table.integer('team_id').unsigned().references('id').inTable('teams');
    table.integer('assigned_to').unsigned().references('id').inTable('users');
    table.integer('created_by').unsigned().references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTable('tasks');
}
