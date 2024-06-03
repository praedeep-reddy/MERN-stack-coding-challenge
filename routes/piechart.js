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

    const categories = {};

    transactions.forEach(txn => {
      categories[txn.category] = (categories[txn.category] || 0) + 1;
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
