import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file
import BanList from './BanList'; // Adjust the path if necessary

const App = () => {
  const [currentItem, setCurrentItem] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchNewItem = async () => {
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
        headers: {
          'x-api-key': 'live_7KdsOYF5kXMFtrpc63Vg0VXi4PibEYNJkvvF7QVokoRpp3SNs9M2pS1LSQ8baqqe',
        },
      });
      const item = response.data[0];
      setCurrentItem(item);
      setHistory((prev) => [...prev, item]);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const addToBanList = (breed) => {
    setBanList((prev) => [...prev, breed]);
    setCurrentItem(null);
  };

  const isBanned = (item) => {
    const breed = item.breeds.length > 0 ? item.breeds[0].name : 'unknown';
    return banList.includes(breed);
  };

  return (
    <div>
      <h1>Veni Vici - Discover New Dogs!</h1>
      <button onClick={fetchNewItem}>Discover Something New!</button>
      {currentItem && !isBanned(currentItem) && (
        <div className="item-container">
          <DisplayItem item={currentItem} addToBanList={addToBanList} />
        </div>
      )}
      <BanList banList={banList} />
      <History history={history} />
    </div>
  );
};

const DisplayItem = ({ item, addToBanList }) => {
  const breed = item.breeds.length > 0 ? item.breeds[0].name : 'Unknown Breed';

  return (
    <div>
      <h2>Dog Breed: {breed}</h2>
      <img src={item.url} alt="Random Dog" />
      <button onClick={() => addToBanList(breed)}>Ban this Breed</button>
    </div>
  );
};

const History = ({ history }) => (
  <div className="history">
    <h2>History</h2>
    <ul>
      {history.map((item, index) => (
        <li key={index}>
          <img src={item.url} alt={`Dog ${index}`} style={{ width: '50px', height: 'auto' }} />
        </li>
      ))}
    </ul>
  </div>
);

export default App;
