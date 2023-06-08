import mongoose from 'mongoose';

/** 2023/06/08 - mongoose  - by leekoby */
const uri = process.env.MONGODB_URI as string;
const dbConnect = async () => {
  try {
    const cennection = await mongoose.connect(uri);
    console.log(cennection);
    return cennection;
  } catch (error) {
    console.log('DB fail :', error);
  }
};

export default dbConnect;
