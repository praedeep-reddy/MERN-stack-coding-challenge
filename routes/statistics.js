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

    const totalSaleAmount = transactions.reduce((sum, txn) => sum + txn.price, 0);
    const totalSoldItems = transactions.filter(txn => txn.sold).length;
    const totalNotSoldItems = transactions.filter(txn => !txn.sold).length;

    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
