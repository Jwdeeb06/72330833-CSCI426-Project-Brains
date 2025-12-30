import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddCourse.css";

const AddCourse = () => {
  // store all added courses
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  // form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Programming");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const API_BASE = "http://localhost:5000/api";

  // fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API_BASE}/categories`);
        setCategories(res.data);
        if (res.data.length) setCategory(res.data[0].name); // default selected
      } catch (err) {
        console.error(err);
        alert("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // fetch existing courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/courses`);
        setCourses(
          res.data.map((c) => ({
            ...c,
            image: `http://localhost:5000/assets/${c.image}`,
            categoryName: categories.find((cat) => cat.id === c.category_id)?.name || "",
          }))
        );
      } catch (err) {
        console.error(err);
        alert("Failed to load courses");
      }
    };
    fetchCourses();
  }, [categories]);

  // handle uploaded image and show preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }else setPreview(null);
  };

  // add new course to list
  const handleAddCourse = async () => {
    if (!name || !price || !category || !description || !image) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    try {
      const selectedCategory = categories.find((cat) => cat.name === category);
      if (!selectedCategory) {
        alert("Invalid category");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category_id", selectedCategory.id);
      formData.append("description", description);
      formData.append("image", image);

      const res = await axios.post(`${API_BASE}/courses/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);

      // add newly created course to the table
      setCourses([
        ...courses,
        {
          id: Date.now(),
          name,
          price,
          categoryName: category,
          description,
          image: preview,
        },
      ]);

      // reset form
      setName("");
      setPrice("");
      setCategory(categories[0].name);
      setDescription("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add course");
    }
  };

  // remove a course by id
  const handleRemove = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div className="add-course-page">
      <h1>Add Course</h1>

      {/* input form */}
      <div className="add-course-form">
        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Course Price (e.g. 300)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Course Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="preview" />}

        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      {/* table of added courses */}
      <table className="course-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>
                <img
                  src={course.image}
                  alt={course.name}
                  className="table-img"
                />
              </td>
              <td>{course.name}</td>
              <td>${course.price}</td>
              <td>{course.category}</td>
              <td>{course.description}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => handleRemove(course.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddCourse;
