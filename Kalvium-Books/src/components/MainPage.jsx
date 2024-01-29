import React, { useState } from "react";
import RegisterForm from "./RegisterForm";

export default function MainPage() {
  const [RegisterationForm, setShowRegisterForm] = useState(false);

  const handleClick = () => {
    setShowRegisterForm(true);
  }

  return (
    <div className='main'>
      <nav className='nav'>
        <img className="logo" src="./assets/download.png" alt="logo" />
        <span id='kalvium-books'>Kalvium Books</span>
        <span><input id='search-bar' type="text" placeholder='Search Books' /></span>
        <button className="register" onClick={handleClick}>Register</button>
      </nav>

      {RegisterationForm && <RegisterForm />}
    </div>
  );
}
