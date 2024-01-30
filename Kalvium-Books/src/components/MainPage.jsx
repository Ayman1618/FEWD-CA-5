import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";
import axios from 'axios';
import "./MainPage.css";
import logo from '../assets/downloadd.png'
import { Link } from 'react-router-dom';

export default function MainPage() {
  const [registerationForm, setShowRegisterForm] = useState(false);
  const [myData, setMyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: {
        'Authorization': 'authorization'
      }
    })
      .then(res => {
        const bookData = res.data;
        console.log(bookData);
        setMyData(bookData.books);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    setShowRegisterForm(true);
  };

  const filteredBooks = myData.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='main'>
      <nav className='nav'>
        <img className="logo" src={logo} alt="logo" />
        <span id='kalvium-books'>Kalvium Books</span>
        <span>
          <input
            id='search-bar'
            type="text"
            placeholder='Search Books'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </span>
        <Link to="/Register" className="register">Register</Link>
      </nav>
      <div className="books">
        {filteredBooks.map((book) => (
          <div key={book.id} className='onebook'>
            <img id="book-image" src={book.imageLinks.smallThumbnail} alt="" />
            <h3 className='booktit'>{book.title}</h3>
            <div className='bottom'>
              <p>{book.averageRating || 4}⭐</p>
              <p>Free</p>
            </div>
          </div>
        ))}
        {registerationForm && <RegisterForm />}
      </div>
    </div>
  );
}
