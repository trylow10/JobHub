const { MongoClient } = require("mongodb");

async function updateRoleSchema() {
  const uri = "mongodb://localhost:27017/linkedin";
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db();
    const collection = database.collection("users");

    // Update the role schema for all documents in the collection
    await collection.updateMany({}, { $set: { roles: ["jobSeeker"] } });

    console.log("Role schema updated successfully");
  } catch (error) {
    console.error("Error updating role schema:", error);
  } finally {
    client.close();
  }
}

// updateRoleSchema();
