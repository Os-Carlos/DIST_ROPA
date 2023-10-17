module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "db_dist_ropa",
    PORT: "5432",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};