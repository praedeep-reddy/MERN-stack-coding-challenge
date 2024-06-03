import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TransactionsBarChart = ({ data }) => {
  const chartData = Object.keys(data).map(key => ({
    name: key,
    items: data[key]
  }));

  return (
    <BarChart
      width={500}
      height={300}
      data={chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="items" fill="#8884d8" />
    </BarChart>
  );
};

export default TransactionsBarChart;
