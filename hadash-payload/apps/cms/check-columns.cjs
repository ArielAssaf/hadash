const pg = require('pg');
const fs = require('fs');

async function check() {
    const env = fs.readFileSync('.env', 'utf8');
    const match = env.match(/POSTGRES_URL=(.+)/);
    if (!match) return;
    const connectionString = match[1].trim();
    const client = new pg.Client({ connectionString });
    await client.connect();

    const res = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'pages_blocks_values_columns'");
    console.log('Columns in pages_blocks_values_columns:');
    console.log(res.rows.map(r => `${r.column_name}: ${r.data_type}`).join('\n'));

    await client.end();
}

check();
