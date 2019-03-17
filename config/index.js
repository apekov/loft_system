module.exports = {
    dbConfig: {
        database: "loft_system",
        username: "alanapekov",
        password: "",
        conf: {
            host: "127.0.0.1",
            dialect: "postgres",
            protocol: "postgres",
            pool: {
                max: 20,
                min: 0,
                acquire: 30000,
                idle: 10000
            }

        }
    },
    rootDirectory: process.cwd()
};