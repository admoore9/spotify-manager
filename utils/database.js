let mysql = require('mysql');

let pool = mysql.createPool({
    host            : process.env.MYSQL_HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE,
    connectionLimit : 10
});

module.exports = {
    testConnection: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return handleError(err, reject);
                resolve();
                return;
            });
        });
    },

    addUser: (user) => {
        return new Promise((resolve, reject) => {

            pool.getConnection((err, connection) => {
                if (err) return handleError(err, reject);

                let sql = 'INSERT INTO users SET ? ON DUPLICATE KEY UPDATE ?';

                connection.query(sql, [user, user], (err, rows) => {
                    if (err) return handleError(err, reject);
                    connection.release();
                    resolve();
                });
            });
        });
    },

    getUserById: (id) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return handleError(err, reject);

                let sql = 'SELECT * FROM users WHERE id = ? LIMIT 1';

                connection.query(sql, [id], (err, rows) => {
                    if (err) return handleError(err, reject);
                    connection.release();
                    resolve(rows);
                });
            });
        });
    },

    updateUserAccessToken: (id, accessToken, expireTime) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return handleError(err, reject);

                let user = {accessToken, expireTime};
                let sql = 'UPDATE users SET ? WHERE id = ?';

                connection.query(sql, [user, id], (err, rows) => {
                    if (err) return handleError(err, reject);
                    connection.release();
                    resolve(accessToken);
                });
            });
        });
    }
};

let handleError = (err, reject) => {
    console.log(err);
    reject();
    return;
};
