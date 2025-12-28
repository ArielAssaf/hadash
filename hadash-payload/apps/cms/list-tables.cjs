const pg = require('pg');
const fs = require('fs');

async function check() {
    const env = fs.readFileSync('.env', 'utf8');
    const match = env.match(/POSTGRES_URL=(.+)/);
    if (!match) {
        console.error('No POSTGRES_URL found');
        process.exit(1);
    }
    const connectionString = match[1].trim();

    const client = new pg.Client({ connectionString });
    await client.connect();

    const res = await client.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
    console.log(res.rows.map(r => r.tablename).join('\n'));

    await client.end();
}

check();
