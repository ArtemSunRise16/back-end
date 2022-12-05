module.exports = function config(env) {
  switch (env) {
    case "development":
      return {
        username: "postgres",
        password: "Artyom",
        database: "todo_list",
        host: "localhost",
        dialect: "postgres",
      };
    case "test":
      return {
        username: "postgres",
        password: "Artyom",
        database: "todo_list",
        host: "127.0.0.1",
        dialect: "postgres",
      };
    case "production":
      return {
        username: "postgres",
        password: "Artyom",
        database: "todo_list",
        host: "127.0.0.1",
        dialect: "postgres",
      };
    default:
      break;
  }
};
