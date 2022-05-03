import { Sequelize , DataTypes} from "sequelize";
// import mysql from 'mysql2/promise'

const sequelize = new Sequelize('nodejs', 'root',null, {
    host: 'localhost',
    dialect: 'mysql'
})

// console.log(sequelize);
const Testing = sequelize.define('Test',{
    firstname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,

    },
    status:{
        type:DataTypes.INTEGER
        
    }
},
{
    tableName:'Testings',
    timestamps: false
})
await Testing.sync({ alter: true })
// console.log(sequelize.models);
