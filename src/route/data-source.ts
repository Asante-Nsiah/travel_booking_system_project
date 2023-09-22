import {DataSource} from "typeorm";



export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    ssl: true,
    extra:{
        ssl : {
            rejectUnauthorized: false
        }
    },
    entities: [
        // path.join(__dirname, "./user-entity/Users.js"),
        "./user-entity/Users.js",
        "src/modules/**/*.js",
    
    ],
    synchronize:true,
    logging:true
})