import mongoose from "mongoose";

const connectToDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI, {dbName: process.env.DB_NAME})
    .then(() => console.log(`Database Connected ✔`.yellow.bold));
};

export default connectToDB;
