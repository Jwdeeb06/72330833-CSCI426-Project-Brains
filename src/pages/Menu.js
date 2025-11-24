import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CourseList } from "../data/CourseList";
import CourseItem from "../components/CourseItem";
import "../styles/Menu.css";

const Menu = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("AI");

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  const filteredCourses =
    selectedCategory === "All"
      ? CourseList
      : CourseList.filter((c) => c.category === selectedCategory);

  const categories = ["All", "Programming", "AI", "Security", "Design"];

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Courses</h1>

      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="menuList">
        {filteredCourses.map((course, i) => (
          <CourseItem
            key={i}
            image={course.image}
            name={course.name}
            price={course.price}
            category={course.category}
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
