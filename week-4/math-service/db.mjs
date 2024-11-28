import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const database = client.db("math");
const results = database.collection("results");

const logMathOperation = async (number, operationType) => {
  try {
    await client.connect();
    const doc = {
      operationType,
      number,
      timestamp: new Date(),
    };

    const result = await results.insertOne(doc);
    return result;
  } finally {
    await client.close();
  }
};

const getMathOperations = async () => {
  try {
    await client.connect();
    const documents = await results.find().toArray();

    return documents;
  } finally {
    await client.close();
  }
};

export { logMathOperation, getMathOperations };
