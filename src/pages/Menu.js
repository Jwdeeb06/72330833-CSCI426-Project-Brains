import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CourseItem from "../components/CourseItem";
import RegisterCourse from "../components/RegisterCourse";
import "../styles/Menu.css";
import axios from "axios";

const Menu = () => {
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
// use effect for the home and menu cat btn
  // 1️⃣ get category from Home page
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  // 2️⃣ fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 3️⃣ fetch courses (all or by category)
  useEffect(() => {
    if (!selectedCategory) return;

    // find category id
    const category = categories.find((c) => c.name === selectedCategory);

    const url = category
      ? `http://localhost:5000/api/courses/by-category/${category.id}`
      : "http://localhost:5000/api/courses";

    axios
      .get(url)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, [selectedCategory, categories]);


  return (
    <div className="menu">
      <h1 className="menuTitle">Our Courses</h1>

      {/* category filter */}
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${
              selectedCategory === cat.name ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* courses */}
      <div className="menuList">
        {courses.map((course) => (
          <div key={course.id} onClick={() => setSelectedCourse(course)}>
            <CourseItem
              image={`http://localhost:5000/assets/${course.image}`}
              name={course.name}
              price={course.price}
            />
          </div>
        ))}
      </div>

      {/* registration popup */}
      {selectedCourse && (
        <RegisterCourse
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default Menu;
