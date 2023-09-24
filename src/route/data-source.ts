import {DataSource} from "typeorm";
import { Users } from "../models/users-entity";
import { SavedCard } from "../models/saved-card-entity";
import { GuestCart } from "../models/guest-entity";
import { Category } from "../models/category-entity";
import { CartItem } from "../models/cart-item-entity";
import { BookingOffer } from "../models/booking-offer-entitiy";
import { Transaction } from "../models/transaction.entity";
import path from "path";



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
        path.join(__dirname, "./users-entity/Users.js"),
        "./users-entity/Users.js",
        "src/modules/**/*.js",
        Users,
        Transaction,
        SavedCard,
        GuestCart,
        Category,
        CartItem,
        BookingOffer,

    ],
    synchronize:true,
    logging:true
})