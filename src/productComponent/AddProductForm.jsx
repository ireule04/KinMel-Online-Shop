import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  const retrieveAllCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/category/all");
      return response.data;
    } catch (error) {
      console.error("Error retrieving categories:", error);
    }
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const allCategories = await retrieveAllCategories();
      if (allCategories) {
        setCategories(allCategories.categories);
      }
    };
    getAllCategories();
  }, []);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
  });

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (product.categoryId === "" || product.categoryId === "0") {
      toast.error("Select Product Category", {
        position: "top-center",
        autoClose: 1000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedPhoto);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("categoryId", product.categoryId);

    try {
      const resp = await axios.post("http://localhost:8080/api/product/add", formData);
      let response = resp.data;

      if (response.success) {
        toast.success(response.responseMessage, {
          position: "top-center",
          autoClose: 1000,
        });
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(response.responseMessage || "Server Error", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("It seems server is down", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedPhoto(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Create a preview URL
      setImagePreview(previewUrl); // Set the preview URL in state
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="card form-card border-color custom-bg" style={{ width: "50rem" }}>
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Add Product</h5>
          </div>
          <div className="card-body text-color">
            <form className="row g-3" onSubmit={saveProduct}>
              <div className=" col-md-6 mb-3">
                <label htmlFor="title" className="form-label">
                  <b>Product Title</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={handleInput}
                  value={product.title}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Product Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  onChange={handleInput}
                  value={product.description}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <b>Category</b>
                </label>
                <select
                  name="categoryId"
                  onChange={handleInput}
                  className="form-control"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  <b>Product Quantity</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  onChange={handleInput}
                  value={product.quantity}
                  required
                />
              </div>



              <div className="col-md-6 mb-3">
  <label htmlFor="price" className="form-label">
    <b>Product Price</b>
  </label>
  <input
    type="number"
    className="form-control"
    id="price"
    name="price"
    onChange={handleInput}
    value={product.price}
    min="0" // Ensures only positive numbers can be entered
    required
  />
</div>

              <div className="col-md-6 mb-3">
                <label htmlFor="formFile" className="form-label">
                  <b>Select Product Image</b>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="photo"
                  onChange={handleImageChange} // Update to use the new handler
                  required
                />
              </div>
              {imagePreview && ( // Conditionally render the image preview
                <div className="col-md-6 mb-3">
                  <img src={imagePreview} alt="Product Preview" className="img-fluid" />
                </div>
              )}
              <div className="d-flex aligns-items-center justify-content-center">
                <button type="submit" className="btn bg-color custom-bg-text">
                  Add Product
                </button>
                <ToastContainer />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;