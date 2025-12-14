const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres", 
    password: "fuckwad",
    database: "WAD_database", 
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // gets connection
        await pool.query(query); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "posttable" (
	    "id" SERIAL PRIMARY KEY,         
	    "post_time" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	    "author_name" VARCHAR(200) NOT NULL,
        "profile_image" VARCHAR(200),
	    "post_content" TEXT NOT NULL 
        /* REMOVED: title, body, urllink */
    );`;

execute(createTblQuery).then(result => {
    if (result) {
        console.log('If does not exists, create the "posttable" table');
    }
});

module.exports = pool;