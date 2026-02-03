import mongoose from "mongoose"; 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.log("Deu erro ao conectar com o mongoDB", error);
        process.exit(1);
    }
};

module.exports = connectDB;