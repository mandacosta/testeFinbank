import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";

const setDataSourceConfig = (): DataSourceOptions => {
  const nodeEnv = process.env.NODE_ENV;
  const migrationsPath = path.join(__dirname, "./migrations/**.{js,ts}");
  const entitiesPath = path.join(__dirname, "./entities/**.{js,ts}");

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: ["src/entities/*.ts"],
    };
  }

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      migrations: [migrationsPath],
      entities: [entitiesPath],
    };
  }

  return {
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT!),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: false,
    synchronize: false,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const AppDataSource = new DataSource(setDataSourceConfig());

export default AppDataSource;
