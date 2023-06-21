const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

const INDEX = process.env.SEARCH_INDEX;
const ELASTIC_SEARCH_BACKEND = process.env.ELASTIC_SEARCH_BACKEND || "";
const ELASTIC_USERNAME = process.env.ELASTIC_USERNAME || "";
const ELASTIC_PASSWORD = process.env.ELASTIC_PASSWORD || "";
const { v4: uuidv4 } = require("uuid");
let client;

const auth = {
  username: ELASTIC_USERNAME,
  password: ELASTIC_PASSWORD,
};

function initClient() {
  client = new Client({
    node: ELASTIC_SEARCH_BACKEND,
    auth,
    requestTimeout: 3000,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

const indexSettings = {
  number_of_shards: 1,
  number_of_replicas: 1,
  settings: {
    analysis: {
      analyzer: {
        my_analyzer: {
          filter: ["lowercase", "my_filter"],
          tokenizer: "my_tokenizer",
        },
        autocomplete_search: {
          tokenizer: "lowercase",
        },
        autocomplete_edgegram: {
          tokenizer: "autocomplete_tokenizer",
          filter: ["lowercase"],
        },
      },
      filter: {
        my_filter: {
          type: "stop",
          stopwords: "_english_",
        },
      },
      tokenizer: {
        my_tokenizer: {
          type: "edge_ngram",
          min_gram: 1,
          max_gram: 60,
          token_chars: ["letter"],
        },
        autocomplete_tokenizer: {
          type: "edge_ngram",
          min_gram: 1,
          max_gram: 20,
          token_chars: ["letter", "digit"],
        },
      },
    },
  },
};

async function createIndex() {
  console.info("Creating search index:", INDEX);
  return client.indices.create({ index: INDEX, body: indexSettings });
}

async function deleteIndex() {
  console.info("Deleting search index:", INDEX);
  return client.indices.delete({ index: INDEX });
}

async function indexData(data) {
  try {
    const items = data.flatMap((item) => [
      { index: { _index: INDEX, _id: uuidv4() } },
      item,
    ]);
    return await client.bulk({ refresh: true, body: items });
  } catch (error) {
    console.error("An error occurred while indexing data:", error);
    throw error;
  }
}

async function unindex(items) {
  const body = items.flatMap((doc) => [
    { delete: { _index: INDEX, _id: doc.id } },
  ]);

  return client.bulk({ refresh: true, body });
}

async function searchDoc(query) {
  try {
    const body = await client.search({
      index: INDEX,
      body: query,
    });
    return body;
  } catch (error) {
    console.error("An error occurred while searching:", error);
    throw error;
  }
}

async function suggestQuery(query, limit, from) {
  const fields = ["uname", "title", "skills", "company", "jobLocation"];
  try {
    const searchQuery = {
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: query,
                type: "phrase_prefix",
                fields: fields,
              },
            },
          ],
        },
      },
      from,
      size: limit,
      aggs: {
        agg_uname: {
          terms: {
            field: "uname.keyword",
            size: 10,
          },
        },
        agg_title: {
          terms: {
            field: "title.keyword",
            size: 10,
          },
        },

        agg_company: {
          terms: {
            field: "company.keyword",
            size: 10,
          },
        },
      },
    };

    const searchResult = await searchDoc(searchQuery);
    return searchResult;
  } catch (error) {
    console.error("An error occurred while suggesting:", error);
    throw error;
  }
}

module.exports = {
  searchDoc,
  unindex,
  INDEX,
  indexSettings,
  indexData,
  deleteIndex,
  createIndex,
  initClient,
  suggestQuery,
};
