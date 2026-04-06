const express = require("express");
const router = express.Router();
const inventory = require("../data");

router.get("/", (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;

  // Validate price range
  if (minPrice && maxPrice) {
    if (parseFloat(minPrice) > parseFloat(maxPrice)) {
      return res.status(400).json({
        error: "minPrice cannot be greater than maxPrice"
      });
    }
  }

  let results = [...inventory];

  // Filter by product name (partial, case-insensitive)
  if (q && q.trim() !== "") {
    results = results.filter((item) =>
      item.name.toLowerCase().includes(q.trim().toLowerCase())
    );
  }

  // Filter by category (case-insensitive)
  if (category && category.trim() !== "") {
    results = results.filter((item) =>
      item.category.toLowerCase() === category.trim().toLowerCase()
    );
  }

  // Filter by minPrice
  if (minPrice) {
    results = results.filter((item) => item.price >= parseFloat(minPrice));
  }

  // Filter by maxPrice
  if (maxPrice) {
    results = results.filter((item) => item.price <= parseFloat(maxPrice));
  }

  // Return results
  return res.status(200).json({
    count: results.length,
    results: results
  });
});

module.exports = router;
