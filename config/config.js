require("dotenv").config();

module.exports = development = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: "postgres",
  host: process.env.DATABASE_HOST,
  dialectOptions: {
    ssl: {
      require: "true",
    },
  },
};
module.exports = test = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: "postgres",
  host: process.env.DATABASE_HOST,
  dialectOptions: {
    ssl: {
      require: "true",
    },
  },
};
module.exports = production = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialect: "postgres",
  host: process.env.DATABASE_HOST,
  dialectOptions: {
    ssl: {
      require: "true",
    },
  },
};
