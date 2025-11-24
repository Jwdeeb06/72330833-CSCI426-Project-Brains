import React, { useState } from "react";
import "../styles/AddCourse.css";

const AddCourse = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Programming");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddCourse = () => {
    if (name && price && category && description && image) {
      const newCourse = {
        id: Date.now(),
        name,
        price,
        category,
        description,
        image,
      };
      setCourses([...courses, newCourse]);
      setName("");
      setPrice("");
      setCategory("Programming");
      setDescription("");
      setImage(null);
    } else {
      alert("⚠️ Please fill in all fields.");
    }
  };

  const handleRemove = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div className="add-course-page">
      <h1>Add Course</h1>

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
          <option value="Programming">Programming</option>
          <option value="AI">AI</option>
          <option value="Security">Security</option>
          <option value="Design">Design</option>
          <option value="Mobile">Mobile</option>
        </select>

        <textarea
          placeholder="Course Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {image && (
          <div className="preview">
            <img src={image} alt="Preview" />
          </div>
        )}

        <button onClick={handleAddCourse}>Add Course</button>
      </div>

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
                <img src={course.image} alt={course.name} className="table-img" />
              </td>
              <td>{course.name}</td>
              <td>${course.price}</td>
              <td>{course.category}</td>
              <td>{course.description}</td>
              <td>
                <button className="remove-btn" onClick={() => handleRemove(course.id)}>
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
