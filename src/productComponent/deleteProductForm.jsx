import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./DeleteProductForm.css";

const DeleteProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/category/all")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories || []);
        } else {
          toast.error("Failed to fetch categories", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    fetch(`http://localhost:8080/api/product/category?categoryId=${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products || []);
        } else {
          toast.error("Failed to fetch products", {
            position: "top-center",
            autoClose: 1000,
          });
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      fetch(`http://localhost:8080/api/product/delete/${selectedProduct}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            toast.success("Product deleted successfully!", {
              position: "top-center",
              autoClose: 1000,
            });
            setProducts(products.filter((product) => product.id !== parseInt(selectedProduct)));
            setSelectedProduct("");
          } else {
            toast.error("Failed to delete product", {
              position: "top-center",
              autoClose: 1000,
            });
          }
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          toast.error("Error deleting product", {
            position: "top-center",
            autoClose: 1000,
          });
        });
    }
  };

  return (
    <div className="delete-product-form">
      <h3>Delete Product</h3>
      <select
  className="custom-select"
  onChange={handleCategoryChange}
  value={selectedCategory}
  style={{ color: 'black', backgroundColor: 'white', appearance: 'none' }}
>
  <option value="" disabled hidden style={{ color: 'black', backgroundColor: 'white' }}>
    Select Category
  </option>
  {categories.map((category) => (
    <option key={category.id} value={category.id} style={{ color: 'black', backgroundColor: 'white' }}>
      {category.name}
    </option>
  ))}
</select>

<select
  className="custom-select"
  onChange={(e) => setSelectedProduct(e.target.value)}
  value={selectedProduct}
  disabled={!selectedCategory}
  style={{ color: 'black', backgroundColor: 'white', appearance: 'none' }}
>
  <option value="" disabled hidden style={{ color: 'black', backgroundColor: 'white' }}>
    Select Product
  </option>
  {products.map((product) => (
    <option key={product.id} value={product.id} style={{ color: 'black', backgroundColor: 'white' }}>
      {product.name}
    </option>
  ))}
</select>


      <button
        className="delete-button"
        onClick={handleDeleteProduct}
        disabled={!selectedProduct}
      >
        Delete Product
      </button>
    </div>
  );
};

export default DeleteProductForm;
