module.exports = {
    "development": {
      "username": process.env.DB_USER,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DATABASE,
      "host": process.env.DB_HOST,
      "dialect": "mysql",
      "port":process.env.DB_PORT
    }
  }
  