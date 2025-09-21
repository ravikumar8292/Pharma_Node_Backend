import sequelize  from "../../config/db.js";



const syncDb = async ()=>{
    await sequelize.sync({alter:false});
}




export {syncDb};