import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function Landing() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Auto-focus the input when the page loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().toLowerCase() === 'parina') {
      navigate('/welcome'); // Redirect to welcome page
    } else {
      setError("This is not the magical name, Try again 🙂");
    }
  };

  return (
    <div className="screen">
      <main className="card">
        <h1>A Special Invitation 💌</h1>
        <p className="subtitle">Please enter your name to unlock the surprise.</p>

        <form onSubmit={handleSubmit} className="gate-form">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(''); // Clear error when typing
            }}
            placeholder="Your name here"
            className="input"
            autoComplete="off"
          />
          <button type="submit" className="btn">Enter</button>
        </form>

        {error && <p className="error">{error}</p>}
      </main>
    </div>
  );
}