import React from 'react';

const BanList = ({ banList }) => (
  <div>
    <h2>Ban List</h2>
    <ul>
      {banList.map((attr, index) => (
        <li key={index}>{attr}</li>
      ))}
    </ul>
  </div>
);

export default BanList;
