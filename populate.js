import "dotenv/config";
import mockData from "./MOCK_DATA.js";
import Job from "./models/Job.js";
import connectDB from "./db/connect.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.create(mockData);
    console.log("data successfully uploaded");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
