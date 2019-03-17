const config = require('../config');

const { Client } = require('pg');

const client = new Client({
    user: config.dbConfig.username,
    host: config.dbConfig.conf.host,
    database: config.dbConfig.database,
    password: config.dbConfig.password,
    port: 5432,
});

const tables = ['users'];

const createTable = async() => {
    await client.connect();

    // await client.query(
    //     `CREATE TABLE users(id serial primary key unique,
    //       username varchar(255) not null,
    //       firstName varchar(40) not null,
    //       surName varchar(255) not null,
    //       middleName varchar(255) not null,
    //       password varchar(255) not null,
    //       img varchar(255) not null);`
    // );

    await client.query(
        `CREATE TABLE news(id serial primary key unique,
          text text not null,
          userId int references users(id),
          createdAt TIMESTAMP not null DEFAULT NOW(),
          updatedAt TIMESTAMP not null DEFAULT NOW(),
          date TIMESTAMP not null DEFAULT NOW(),
          theme varchar(255) not null);`
    );
    await client.end();
}

// createTable();