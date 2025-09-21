import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";


const User = sequelize.define(
    "User",
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail: true},
        },
        address:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        ph: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        gender: {
            type: DataTypes.ENUM("male","female","other"),
            allowNull: false
        }
    },
    {
        tableName: "user",
    }
);

export default User;