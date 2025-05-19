import { json } from '@sveltejs/kit';
import { Pool } from 'pg';

// NB: this part could technically stay inside +page.js as well. However, since it's server side execution, it's better practice to keep it here

// Database connection
const pool = new Pool({
    user: 'myUser', // put the port number here. Next versions: get the user from an INI + encryption algo file
    host: 'localhost',
    database: 'myDB',
    password: 'myPassword', // put the password here. Next versions: get the password from an INI + encryption algo file
    port: 0000 // put the port number here. Next versions: get the port number from an INI file
});

export async function GET() {
    const client = await pool.connect();
    try {
        const result = await client.query(
            "SELECT * FROM myTable" // put the table name here. Next versions: get the table name from an INI file
        );

        return json(result.rows);
    } 
    catch (error) {
        console.error('Database error:', error.message, error.stack);
        return json({ error: error.message }, { status: 500 });
    }
    finally {
        client.release();
    }
}
