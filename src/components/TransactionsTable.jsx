import React from 'react';

const TransactionsTable = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Date of Sale</th>
          <th>Sold</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((txn) => (
          <tr key={txn._id}>
            <td>{txn.title}</td>
            <td>{txn.description}</td>
            <td>{txn.price}</td>
            <td>{new Date(txn.dateOfSale).toLocaleDateString()}</td>
            <td>{txn.sold ? 'Yes' : 'No'}</td>
            <td>{txn.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
