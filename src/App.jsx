import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import TransactionsPieChart from './components/TransactionsPieChart';

const App = () => {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChart, setBarChart] = useState([]);
  const [pieChart, setPieChart] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/transactions`, {
        params: {
          month,
          search,
          page,
          per_page: 10
        }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/statistics`, {
        params: { month }
      });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchBarChart = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/barChart`, {
        params: { month }
      });
      setBarChart(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const fetchPieChart = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/pieChart`, {
        params: { month }
      });
      setPieChart(response.data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChart();
    fetchPieChart();
  }, [month, search, page]);

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <select onChange={(e) => setMonth(e.target.value)} value={month}>
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <TransactionsTable transactions={transactions} />
      <TransactionsStatistics statistics={statistics} />
      <TransactionsBarChart data={barChart} />
      <TransactionsPieChart data={pieChart} />
    </div>
  );
};

export default App;
