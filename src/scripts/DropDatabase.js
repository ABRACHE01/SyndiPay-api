const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "syndiPay";

// Create a new MongoClient
const client = new MongoClient(url);

async function deleteDatabase() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Get the database
    const db = client.db(dbName);

    // Drop the database
    await db.dropDatabase();

    console.log(`Database "${dbName}" deleted successfully.`);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// Call the deleteDatabase function
deleteDatabase();