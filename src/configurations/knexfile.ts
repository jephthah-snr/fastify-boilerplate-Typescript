import { EriConfig } from "./eri";

interface IKnexConfig {
  [key: string]: object;
}
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const config: IKnexConfig = {
  development: {
    client: "mysql",
    connection: EriConfig.database,
    pool: {
      min: 2,
      max: 10,
      afterCreate: function (connection: any, callback: any) {
        connection.query(`SET time_zone = '${timezone}'`, (err: any) => {
          callback(err, connection);
        });
      },
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../database/migrations",
    },
    seeds: {
      directory: "../database/seeds",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

export default config;
