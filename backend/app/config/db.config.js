module.exports = {
    HOST: "dpg-ckgajgi12bvs73e54uqg-a.oregon-postgres.render.com",
    USER: "dw2023",
    PASSWORD: "Gi6GaiaMdT6Q5LbtCEuwHJR4yU92qHsU",
    DB: "bd_dist_ropa",
    PORT: "5432",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "root",
//     DB: "db_dist_ropa",
//     PORT: "5432",
//     dialect: "postgres",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };