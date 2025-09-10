import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function Cake() {
  return (
    <div className="cake-full">
      {/* Cake + candle */}
      <svg
        className="cake-svg"
        viewBox="0 0 360 380"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Birthday cake"
      >
        {/* Candle + flame */}
        <g transform="translate(170,70)">
          {/* flame */}
          <ellipse className="flame" cx="10" cy="0" rx="8" ry="18" />
          <ellipse className="flame-inner" cx="10" cy="0" rx="4" ry="9" />
          {/* wick */}
          <rect x="7" y="10" width="6" height="58" rx="3" fill="#ffffff" />
          {/* stripes */}
          <rect x="7" y="18" width="6" height="6" rx="3" fill="#ffd166" />
          <rect x="7" y="32" width="6" height="6" rx="3" fill="#ffd166" />
          <rect x="7" y="46" width="6" height="6" rx="3" fill="#ffd166" />
        </g>

        {/* Plate line (thin) */}
        <rect x="60" y="325" width="240" height="6" rx="3" fill="#f4e6e6" />

        {/* Cake body (rounded chocolate layers) */}
        {/* Bottom shadow for slight depth */}
        <ellipse cx="180" cy="314" rx="90" ry="12" fill="#000" opacity=".06" />

        {/* Chocolate layers */}
        <rect x="80" y="270" width="200" height="36" rx="18" fill="#a88679" />
        <rect x="80" y="238" width="200" height="36" rx="18" fill="#9f7a6c" />
        <rect x="80" y="206" width="200" height="36" rx="18" fill="#957064" />

        {/* Top rounded cap (for smooth top) */}
        <rect x="80" y="186" width="200" height="30" rx="15" fill="#8b695d" />

        {/* White icing with drips (no “jar” rim) */}
        <path
          fill="#fff8f5"
          d="
            M 80 186
            L 280 186
            L 280 205
            C 270 202, 266 213, 258 210
            C 250 207, 248 196, 238 200
            C 228 204, 226 213, 216 209
            C 208 206, 206 197, 196 201
            C 186 205, 184 215, 172 210
            C 162 206, 160 197, 150 201
            C 142 204, 140 214, 130 210
            C 122 207, 120 197, 112 201
            C 106 204, 102 208, 96 206
            C 90 204, 86 199, 80 200
            Z
          "
        />

        {/* little “drip tails” to sell the icing */}
        <path
          d="M 118 200
             C 118 228, 130 226, 132 214
             C 134 205, 127 202, 118 200 Z"
          fill="#fff8f5"
        />
        <path
          d="M 206 202
             C 206 222, 214 224, 218 214
             C 220 208, 214 204, 206 202 Z"
          fill="#fff8f5"
        />
      </svg>

      {/* Text */}
      <div className="cake-text">
        <h1>happy birthday!</h1>
        <p>Parina</p>
      </div>

      {/* Button */}
      <Link to="/home" className="cake-btn">Back to Home</Link>

      {/* Scoped styles */}
      <style>{`
        /* Full screen layout */
        .cake-full {
          width: 100vw;
          height: 100vh;
          display: grid;
          place-items: center;
          background: #e999ab; /* soft pink like the reference */
          overflow: hidden;
          position: relative;
          padding: 24px;
        }
        .cake-svg {
          width: clamp(260px, 50vw, 420px);
          height: auto;
          display: block;
          filter: drop-shadow(0 16px 30px rgba(0,0,0,.15));
        }

        /* Flame look + flicker */
        .flame {
          fill: url(#grad-flame);
          animation: flicker 1.1s ease-in-out infinite;
          transform-origin: 10px 0px;
          filter: drop-shadow(0 0 14px rgba(255,190,0,.6));
        }
        .flame-inner {
          fill: #ffd166;
          opacity: .8;
          animation: flickerInner .95s ease-in-out infinite .2s;
          transform-origin: 10px 0px;
        }
        @keyframes flicker {
          0%,100% { transform: translateY(0) scaleY(1); opacity: .95; }
          50%     { transform: translateY(-6px) scaleY(.9); opacity: .75; }
        }
        @keyframes flickerInner {
          0%,100% { transform: translateY(0) scaleY(1); opacity: .8; }
          50%     { transform: translateY(-4px) scaleY(.9); opacity: .6; }
        }

        /* Title */
        .cake-text {
          text-align: center;
          margin-top: 8px;
          color: #5b4c49;
        }
        .cake-text h1 {
          font-style: italic;
          font-size: clamp(22px, 3.6vw, 34px);
          font-weight: 600;
          margin-bottom: 6px;
        }
        .cake-text p {
          opacity: .85;
          font-style: italic;
        }

        /* Button */
        .cake-btn {
          display: inline-block;
          margin-top: 14px;
          background: #ff6ec7;
          color: #fff;
          text-decoration: none;
          font-weight: 800;
          padding: 12px 22px;
          border-radius: 999px;
          box-shadow: 0 14px 30px rgba(255,110,199,.35);
          transition: transform .12s ease;
        }
        .cake-btn:hover { transform: translateY(-2px); }

      `}</style>

      {/* SVG defs for flame gradient */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="grad-flame" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#ffe27a"/>
            <stop offset="45%" stopColor="#ffc043"/>
            <stop offset="100%" stopColor="rgba(255,192,67,0)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}