import React, { useState } from 'react';
import './App.css';

function App() {
  // Part 1: Manage State with useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Track which fields have been touched by the user
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });

  // Part 2: Form Functionalities (Validation Variables)
  // Check if email format is valid using Regex
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  // Check if password is at least 8 characters
  const isPasswordValid = password.length >= 8;
  
  // Check if confirm password matches and is not empty
  const isConfirmPasswordValid = confirmPassword === password && confirmPassword.length > 0;

  // Handle blur event to mark field as touched
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Part 4: Submit Action
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing on submit

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      alert("Form submitted successfully");
    } else {
      alert("Can't submit the form");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        
        {/* Email Field */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            // Part 3: Visual Feedback (red/green borders)
            className={touched.email ? (isEmailValid ? 'valid' : 'invalid') : ''}
          />
          {touched.email && !isEmailValid && <p className="error-text">Invalid email format</p>}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
            className={touched.password ? (isPasswordValid ? 'valid' : 'invalid') : ''}
          />
          {touched.password && !isPasswordValid && <p className="error-text">Password must be at least 8 characters</p>}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            className={touched.confirmPassword ? (isConfirmPasswordValid ? 'valid' : 'invalid') : ''}
          />
          {touched.confirmPassword && !isConfirmPasswordValid && <p className="error-text">Passwords do not match</p>}
        </div>

        <button type="submit" className="submit-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default App;