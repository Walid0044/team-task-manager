export function up(knex) {
  return knex.schema.createTable('team_memberships', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users');
    table.integer('team_id').unsigned().references('id').inTable('teams');
    table.string('role', 20).defaultTo('member');
    table.timestamp('joined_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'team_id']);
  });
}

export function down(knex) {
  return knex.schema.dropTable('team_memberships');
}
