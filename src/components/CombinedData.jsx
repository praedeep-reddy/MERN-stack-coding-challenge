import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CombinedData = ({ month }) => {
  const [combinedData, setCombinedData] = useState({});

  useEffect(() => {
    const fetchCombinedData = async () => {
      const response = await axios.get(`http://localhost:3000/api/combined?month=${month}`);
      setCombinedData(response.data);
    };
    fetchCombinedData();
  }, [month]);

  return (
    <div>
      <h2>Combined Data</h2>
      <h3>Statistics</h3>
      <p>Total Sale Amount: ${combinedData.statistics?.totalSalesAmount}</p>
      <p>Total Sold Items: {combinedData.statistics?.totalSoldItems}</p>
      <p>Total Not Sold Items: {combinedData.statistics?.totalNotSoldItems}</p>

      <h3>Bar Chart</h3>
      <ul>
        {combinedData.barChart && Object.entries(combinedData.barChart).map(([range, count]) => (
          <li key={range}>{range}: {count} items</li>
        ))}
      </ul>

      <h3>Pie Chart</h3>
      <ul>
        {combinedData.pieChart && Object.entries(combinedData.pieChart).map(([category, count]) => (
          <li key={category}>{category}: {count} items</li>
        ))}
      </ul>
    </div>
  );
};

export default CombinedData;
