const { createIndex, deleteIndex, INDEX, indexData } = require("./elastic");
const { getUsersFromDatabase, getJobsFromDatabase } = require("./queries");

async function reIndex() {
  try {
    const users = await getUsersFromDatabase();
    const jobs = await getJobsFromDatabase();

    const allData = [...users, ...jobs];

    await deleteIndex();

    // Create new index
    await createIndex();

    console.info(`Indexing ${INDEX} with ${allData.length} items.`);
    return indexData(allData);
  } catch (error) {
    console.error("An error occurred while reindexing:", error);
    throw error;
  }
}

async function indexAllItems() {
  try {
    // Get all data for indexing
    const users = await getUsersFromDatabase();
    const jobs = await getJobsFromDatabase();

    // Combine all data
    const allData = [...users, ...jobs];

    console.info(`Indexing ${INDEX} with ${allData.length} items.`);

    // Remove certain fields and convert object IDs to strings
    const trimData = allData.map((item) => {
      // Exclude unwanted fields from item
      const { _id, pass, salt,profileImg,bgImg,jobPoster, __v, ...trimmedItem } = item;

      // Remove all array fields except for 'skills'
      for (const key in trimmedItem) {
        if (Array.isArray(trimmedItem[key]) && key !== 'skills') {
          delete trimmedItem[key];
        }
      }

      // Convert skills array to string
      if (Array.isArray(trimmedItem.skills)) {
        trimmedItem.skills = trimmedItem.skills.join(', ');
      }

      // Convert object ID to string if found
      if (trimmedItem._id) {
        trimmedItem._id = trimmedItem._id.toString();
      }
      return trimmedItem;
    });
    return indexData(trimData);
  } catch (error) {
    console.error("An error occurred while indexing all items:", error);
    throw error;
  }
}

module.exports = {
  reIndex,
  indexAllItems,
};
