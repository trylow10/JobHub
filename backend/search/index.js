const express = require("express");
const { searchDoc, suggestQuery } = require("./elastic");
const { indexAllItems, reIndex } = require("./utils");

const router = express.Router();

const fields = ["title", "skills", "workPlace", "jobLocation", "company"];

router.get("/indexAll", async (req, res) => {
  try {
    await indexAllItems();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.get("/reindex", async (req, res) => {
  try {
    await reIndex();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.get("/", async (req, res) => {
  let { q, from = 0, limit = 10 } = req.query;
  q = q.toLowerCase();

  const query = {
    query: {
      bool: {
        should: [
          {
            multi_match: {
              query: q,
              type: "phrase_prefix",
              fields: ["uname"],
            },
          },
          {
            multi_match: {
              query: q,
              type: "phrase_prefix",
              fields: fields,
            },
          },
        ],
      },
    },
    from,
    size: limit,
  };

  try {
    const json = await searchDoc(query);
    const hits = json?.hits?.hits?.map((hit) => hit?._source);
    const searchResults = hits.map((hit) => {
      if (hit.uname) {
        // User result
        return {
          type: "user",
          uname: hit.uname,
          headline: hit.headline,
          email: hit.email,
          roles: hit.roles,
        };
      } else {
        // Job result
        return {
          type: "job",
          title: hit.title,
          description: hit.description,
          company: hit.company,
          workPlace: hit.workPlace,
          jobLocation: hit.jobLocation,
          jobType: hit.jobType,
          skills: hit.skills,
        };
      }
    });

    res.json({
      q,
      hits: searchResults,
      from,
      limit,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
});

router.get("/suggest", async (req, res) => {
  const { q, limit = 10, from = 0 } = req.query;
  const query = typeof q === "string" ? q.toLowerCase() : String(q?.[0]?.toLowerCase());

  try {
    const searchResult = await suggestQuery(query, limit, from);

    const suggestions = [];

    const userSuggestions = searchResult.aggregations?.agg_uname?.buckets.map(
      (bucket) => ({
        text: bucket.key,
        type: "user",
      })
    );
    suggestions.push(...userSuggestions);

    const titleSuggestions = searchResult.aggregations?.agg_title?.buckets.map(
      (bucket) => ({
        text: bucket.key,
        type: "title",
      })
    );
    suggestions.push(...titleSuggestions);

    const companySuggestions =
      searchResult.aggregations?.agg_company?.buckets.map((bucket) => ({
        text: bucket.key,
        type: "company",
      }));
      
    suggestions.push(...companySuggestions);
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.text.toLowerCase().startsWith(query));
    // suggestions.push(...filteredSuggestions);
    
    res.json({
      filteredSuggestions,
      q: query,
      from: Number(from),
      limit: String(limit),
    });

  } catch (error) {
    console.error("An error occurred while suggesting:", error);
    res.status(500).send("An error occurred while suggesting");
  }
});

module.exports = router;
