const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgres://72bf30566831c6c898c336ff3c5d39af4b9aa41990831584ecce1fb0742e64cc:sk_V1mbQOWEhIOtCIku75j5V@db.prisma.io:5432/postgres?sslmode=require'
});

async function main() {
  try {
    await client.connect();
    console.log('Connected to DB via pg client.');
    const res = await client.query('SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid();');
    console.log('Terminated connections:', res.rows);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
