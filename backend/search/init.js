const { initClient,createIndex } = require("./elastic");

function init() {
  initClient();
  // createIndex().catch((e) => console.error("Creating index:", e.message));
}


module.exports = init;
