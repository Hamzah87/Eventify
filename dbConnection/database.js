const mariadb = require('mariadb');

const pool = mariadb.createPool({    
    host: 'eventify.club',
    user: 'eventify',
    password: 'dev@ccny2030',    
    database: 'Eventify_DB',
    connectionLimit: 15
});

// Connect and check for errors
pool.getConnection((err, connection) => {
    
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    if(connection) connection.release();

    return;
});

module.exports = pool;