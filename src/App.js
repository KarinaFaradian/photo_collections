import React, {useState, useEffect} from 'react';
import {Collection} from './Collection';
import './index.scss';

const cats = [
  { "name": "All" },
  { "name": "Nature" },
  { "name": "Mountines" },
  { "name": "Architecture" },
  { "name": "Cities" }
]

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  
useEffect (() => {
  setIsLoading(true);

  const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://63becd8ee348cb076218f6a1.mockapi.io/photo_collections?page=${page}&limit=4&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch(err => {
        console.warn(err);
        alert('Error with Data');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);



  return (
    <div className="App">
      <h1>My photo collections</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => 
          <li 
            onClick={() => setCategoryId(i)}
            className={categoryId === i ? 'active' : ''} 
            key={obj.name}>
            {obj.name}
          </li>
          )}
        </ul>
        <input 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input" 
          placeholder="Search..." 
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Wait a minute...</h2>
        ) : (
          collections
          .filter(obj =>  {
            return obj.name.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((obj, index) => (
            <Collection
              key={index}
              name={obj.name}
              images={obj.photos}
            />
          ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, i) => (
            <li onClick={() => setPage(i + 1)} className={page === i + 1 ? 'active' : ''}>
              {i + 1}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;