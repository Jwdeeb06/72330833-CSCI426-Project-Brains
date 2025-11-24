import React from "react";
import { useNavigate } from "react-router-dom";
import poster from "../assets/poster.png";
import logo from "../assets/logo.png";
import "../styles/Home.css";

const Home =()=> {
  const navigate = useNavigate();

  const categories = [
    { name: "Programming", color: "#ffcc00" },
    { name: "AI", color: "#00bcd4" },
    { name: "Security", color: "#ff4444" },
    { name: "Design", color: "#8e44ad" },
  ];

  const handleCategoryClick = (category) => {
    navigate("/menu", { state: { category } });
  };

  return (
    <div className="homepage-container">
      {/* Hero */}
      <div className="hero-section">
        <img src={poster} alt="poster" className="hero-poster" />
        <div className="hero-overlay">
          <img src={logo} alt="logo" className="hero-logo" />
        </div>
      </div>

      {/* Content */}
      <div className="home-content">
        <section className="home-section intro">
          <h2>Explore Our Courses by Category</h2>
          <p>
            Choose a category to explore the available courses directly in that
            field. Each category will take you to our course catalog filtered
            automatically.
          </p>
        </section>

        {/* 🔹 Categories Section */}
        <section className="categories-section">
          <div className="category-grid">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="category-card"
                style={{ borderColor: cat.color }}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <h3 style={{ color: cat.color }}>{cat.name}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
