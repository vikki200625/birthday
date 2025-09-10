import { Link } from 'react-router-dom';
import '../App.css'; // The styles will be in here

// Helper to create multiple balloons easily
const balloonCount = 15;
const balloons = Array.from({ length: balloonCount });

export default function Welcome() {
  return (
    // Add 'welcome-screen' class to enable the animations
    <div className="screen welcome-screen">
      {/* This is the twinkling sprinkle overlay from your code */}
      <div className="sprinkles"></div>

      {/* This container will hold the falling balloons */}
      <div className="balloons-container">
        {balloons.map((_, index) => (
          <div
            key={index}
            className="balloon"
            style={{
              // Random horizontal starting position
              left: `${Math.random() * 95}vw`,
              // Random falling speed (8-14 seconds)
              animationDuration: `${Math.random() * 6 + 8}s`,
              // Random start time
              animationDelay: `${Math.random() * 5}s`,
              // Random pretty color
              backgroundColor: `hsl(${Math.random() * 360}, 80%, 70%)`,
            }}
          />
        ))}
      </div>

      {/* The main content card, which will stay on top of the animations */}
      <main className="card">
        <h1>🎉 Happy Birthday, Parina! 🎂</h1>
        <p className="subtitle">
          This special day is all about celebrating you! Wishing you all the
          joy, laughter, and love in the world. ✨
        </p>
        <Link to="/home">
          <button className="btn">See Your Memories →</button>
        </Link>
      </main>
    </div>
  );
}