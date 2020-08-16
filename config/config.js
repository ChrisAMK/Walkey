
module.exports = {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "walke",
      host: "127.0.0.1",
      port: 3306,
      dialect: "mysql"
    },
    test: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "walke",
      host: "127.0.0.1",
      port: 3306,
      dialect: "mysql"
    },
    production: {
      // eslint-disable-next-line camelcase
      // eslint-disable-next-line camelcase
      use_env_variable: "JAWSDB_URL",
      dialect: "mysql"
    }
  };