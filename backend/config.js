module.exports = {
  port: process.env.PORT || 8081,
  pool: {
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "passcodepasswd",
    database: "njp",
    debug: false,
  },
};
