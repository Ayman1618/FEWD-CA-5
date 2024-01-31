import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";
import axios from 'axios';
import "./MainPage.css";
import logo from '../assets/downloadd.png'
import { Link } from 'react-router-dom';

// Functional component for the main page
export default function MainPage() {
    // State variables for managing the registration form, book data, and search query
  const [registerationForm, setShowRegisterForm] = useState(false);
  const [myData, setMyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

   // Fetch book data from the API on component mount
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

 // Filter books based on the search query
  const filteredBooks = myData.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // JSX rendering for the main pag
  return (
    <div className='main'>

      {/* Navigation bar */}
      <nav className='nav'>
        <img className="logo" src={logo} alt="logo" />
        <span id='kalvium-books'>Kalvium Books</span>
        <span>
          {/* Search bar */}
          <input
            id='search-bar'
            type="text"
            placeholder='Search Books'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </span>
        {/* Registration link */}
        <Link to="/Register" className="register">Register</Link>
      </nav>
      {/* Displaying filtered books and registration form if needed */}
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
        {/* Display registration form conditionally */}
        {registerationForm && <RegisterForm />}
      </div>
    </div>
  );
}
