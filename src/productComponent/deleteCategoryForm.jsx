import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const DeleteCategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/category/all")  // Adjust the endpoint if necessary
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      fetch(`http://localhost:8080/api/category/delete/${selectedCategory}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            toast.success("Category deleted successfully!", {
              position: "top-center",
              autoClose: 1000,
            });
            setCategories(categories.filter(category => category.id !== selectedCategory));
          } else {
            toast.error("Failed to delete category", {
              position: "top-center",
              autoClose: 1000,
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
          toast.error("Error deleting category", {
            position: "top-center",
            autoClose: 1000,
          });
        });
    }
  };

  return (
    <div>
      <h3>Delete Category</h3>
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteCategory}>Delete Category</button>
    </div>
  );
};

export default DeleteCategoryForm;
