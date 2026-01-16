import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ ƏLAVƏ ET

const Login = () => {
  const navigate = useNavigate(); // ⬅️ ƏLAVƏ ET
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState({
    loginName: '',
    loginPass: '',
    name: '',
    email: '',
    pass: ''
  });

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          pass: formData.pass
        }),
      });

      if (!res.ok) throw new Error("POST failed");

      alert("Registration successful! Please login.");
      setIsActive(false);
      setFormData({ ...formData, name: '', email: '', pass: '' });
    } catch (error) {
      console.error(error);
      alert("Server error!");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!formData.loginName.trim() || !formData.loginPass.trim()) {
      alert("Please enter your credentials!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/users");
      const users = await res.json();

      const userFound = users.find(
        (u) => u.name === formData.loginName && u.pass === formData.loginPass
      );

      if (userFound) {
        localStorage.setItem("spotifyUser", JSON.stringify(userFound));
        navigate('/'); // ⬅️ window.location.href əvəzinə navigate() istifadə et
      } else {
        alert("User not found!");
      }
    } catch (error) {
      alert("Cannot connect to server!");
    }
  };

  return (
    <div className="login-page">
      <div className={`wrapper ${isActive ? 'active' : ''}`}>
        <span className="bg-animate"></span>
        <span className="bg-animate2"></span>

        {/* LOGIN FORM */}
        <div className="form-box login">
          <h2 className="animation" style={{'--i': 0, '--j': 21}}>Login to Spotify</h2>

          <form onSubmit={handleLoginSubmit}>
            <div className="input-box animation" style={{'--i': 1, '--j': 22}}>
              <input
                type="text"
                name="loginName"
                value={formData.loginName}
                onChange={handleInputChange}
                required
              />
              <label>Username</label>
              <i className='bx bxs-user'></i>
            </div>

            <div className="input-box animation" style={{'--i': 2, '--j': 23}}>
              <input
                type="password"
                name="loginPass"
                value={formData.loginPass}
                onChange={handleInputChange}
                required
              />
              <label>Password</label>
              <i className='bx bxs-lock'></i>
            </div>

            <button type="submit" className="btn animation" style={{'--i': 3, '--j': 24}}>
              Login
            </button>

            <div className="logreg-link animation" style={{'--i': 4, '--j': 25}}>
              <p>Don't have an account? 
                <a href="#" onClick={(e) => { e.preventDefault(); handleRegisterClick(); }}>Sign Up</a>
              </p>
            </div>
          </form>
        </div>

        <div className="info-text login">
          <h2 className="animation" style={{'--i': 0, '--j': 20}}>Welcome to Spotify!</h2>
          <p className="animation" style={{'--i': 1, '--j': 21}}>Listen to millions of songs for free.</p>
        </div>

        {/* REGISTER FORM */}
        <div className="form-box register">
          <h2 className="animation" style={{'--i': 17, '--j': 0}}>Sign Up for Spotify</h2>

          <form onSubmit={handleRegisterSubmit}>
            <div className="input-box animation" style={{'--i': 18, '--j': 1}}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label>Username</label>
              <i className='bx bxs-user'></i>
            </div>

            <div className="input-box animation" style={{'--i': 19, '--j': 2}}>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <label>Email</label>
              <i className='bx bxs-envelope'></i>
            </div>

            <div className="input-box animation" style={{'--i': 20, '--j': 3}}>
              <input
                type="password"
                name="pass"
                value={formData.pass}
                onChange={handleInputChange}
                required
              />
              <label>Password</label>
              <i className='bx bxs-lock'></i>
            </div>

            <button type="submit" className="btn animation" style={{'--i': 21, '--j': 4}}>
              Sign Up
            </button>

            <div className="logreg-link animation" style={{'--i': 22, '--j': 5}}>
              <p>Already have an account?
                <a href="#" onClick={(e) => { e.preventDefault(); handleLoginClick(); }}>Login</a>
              </p>
            </div>
          </form>
        </div>

        <div className="info-text register">
          <h2 className="animation" style={{'--i': 17, '--j': 0}}>Join Spotify!</h2>
          <p className="animation" style={{'--i': 18, '--j': 1}}>Create your account and start listening.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;