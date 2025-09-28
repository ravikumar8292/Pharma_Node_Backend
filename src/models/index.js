import sequelize  from "../../config/db.js";



const syncDb = async ()=>{
    await sequelize.sync({alter:true});
}




export {syncDb};