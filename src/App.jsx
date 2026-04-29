import React, { useState } from 'react';
import './App.css';

function App() {
  // 1. Manage State with useState (Input Values)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2. Manage State for Validation (Tracking validity)
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  // 3. Manage 'Touched' State (So errors don't show before the user starts typing)
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  // --- Validation Logic ---

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailTouched(true);
    
    // Regex for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordTouched(true);
    
    // Password must be at least 8 characters
    setIsPasswordValid(value.length >= 8);
    
    // Re-check confirm password if password changes
    if (confirmPasswordTouched) {
      setIsConfirmPasswordValid(value === confirmPassword && confirmPassword.length > 0);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordTouched(true);
    
    // Confirm password must match password
    setIsConfirmPasswordValid(value === password && value.length > 0);
  };

  // --- Submit Action ---
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    
    // Check if all fields are valid
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      alert("Form submitted successfully");
    } else {
      alert("Can't submit the form");
    }
  };

  // --- Dynamic CSS Classes for Email Border ---
  const getEmailInputClass = () => {
    if (!emailTouched) return 'form-input';
    return isEmailValid ? 'form-input input-valid' : 'form-input input-invalid';
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h2>Create an Account</h2>
        
        <form onSubmit={handleSubmit} className="signup-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={getEmailInputClass()}
              placeholder="Enter your email"
            />
            {/* Display Error Message conditionally */}
            {!isEmailValid && emailTouched && (
              <p className="error-text">Invalid email format</p>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={passwordTouched ? (isPasswordValid ? 'form-input input-valid' : 'form-input input-invalid') : 'form-input'}
              placeholder="Enter your password"
            />
            {!isPasswordValid && passwordTouched && (
              <p className="error-text">Password must be at least 8 characters</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={confirmPasswordTouched ? (isConfirmPasswordValid ? 'form-input input-valid' : 'form-input input-invalid') : 'form-input'}
              placeholder="Confirm your password"
            />
            {!isConfirmPasswordValid && confirmPasswordTouched && (
              <p className="error-text">Passwords do not match</p>
            )}
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default App;