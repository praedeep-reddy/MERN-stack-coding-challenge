const express = require('express');
const router = express.Router();
const axios = require('axios');
const Transaction = require('../models/Transaction');

// Initialize Database
router.get('/init', async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    await Transaction.deleteMany({});
    await Transaction.insertMany(data);

    res.status(200).json({ message: 'Database initialized with seed data' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List Transactions with Search and Pagination
router.get('/', async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  const query = {};

  if (month) {
    const monthNumber = new Date(Date.parse(month +" 1, 2021")).getMonth();
    query.dateOfSale = { $month: new Date(monthNumber + 1).getMonth() + 1 };
  }

  if (search) {
    query.$or = [
      { title: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
      { price: parseFloat(search) }
    ];
  }

  try {
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
