const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: 'Month is required' });
  }

  const monthNumber = new Date(Date.parse(month +" 1, 2021")).getMonth();

  try {
    const transactions = await Transaction.find({
      dateOfSale: { $month: monthNumber + 1 }
    });

    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0
    };

    transactions.forEach(txn => {
      if (txn.price <= 100) priceRanges['0-100']++;
      else if (txn.price <= 200) priceRanges['101-200']++;
      else if (txn.price <= 300) priceRanges['201-300']++;
      else if (txn.price <= 400) priceRanges['301-400']++;
      else if (txn.price <= 500) priceRanges['401-500']++;
      else if (txn.price <= 600) priceRanges['501-600']++;
      else if (txn.price <= 700) priceRanges['601-700']++;
      else if (txn.price <= 800) priceRanges['701-800']++;
      else if (txn.price <= 900) priceRanges['801-900']++;
      else priceRanges['901-above']++;
    });

    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
