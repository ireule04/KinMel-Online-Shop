import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));

  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState({
    id: "",
    title: "",
    description: "",
    quantity: "",
    price: "",
    imageName: "",
    category: { id: "", title: "" },
  });

  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/id?productId=${productId}`);
        const fetchedProduct = response.data.products[0];
        setProduct(fetchedProduct);

        // Fetch similar products based on category ID
        const similarResponse = await axios.get(
          `http://localhost:8080/api/product/similar?categoryId=${fetchedProduct.category.id}`
        );
        setSimilarProducts(similarResponse.data.products);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const saveProductToCart = async (userId) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/cart/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantity,
          userId,
          productId,
        }),
      });
      const res = await response.json();
      if (res.success) {
        toast.success(res.responseMessage, { autoClose: 1000, position: "top-center" });
        setTimeout(() => navigate("/user/mycart"), 2000);
      } else {
        toast.error(res.responseMessage || "Server is down!", { autoClose: 1000, position: "top-center" });
        setTimeout(() => window.location.reload(true), 2000);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("It seems server is down", { autoClose: 1000, position: "top-center" });
      setTimeout(() => window.location.reload(true), 1000);
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login as Customer to buy the products!!!");
    } else {
      saveProductToCart(user.id);
      setQuantity("");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 mt-2 admin">
          <div className="card form-card border-color custom-bg">
            <img
              src={`http://localhost:8080/api/product/${product.imageName}`}
              alt={product.title}
              className="card-img-top rounded mx-auto d-block m-2"
              style={{ maxHeight: "500px", maxWidth: "100%", width: "auto" }}
            />
          </div>
        </div>
        <div className="col-sm-7 mt-2">
          <div className="card form-card border-color custom-bg">
            <div className="card-header bg-color d-flex justify-content-between">
              <h1 className="custom-bg-text">{product.title}</h1>
            </div>
            <div className="card-body text-left text-color">
              <h3>Description :</h3>
              <h4 className="card-text">{product.description}</h4>
            </div>
            <div className="card-footer custom-bg">
              <h4 className="text-center text-color">Price : NPR {product.price}</h4>
              <div className="d-flex justify-content-between">
                <form className="row g-3" onSubmit={addToCart}>
                  <div className="col-auto">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Quantity..."
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
                      required
                    />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn bg-color custom-bg-text mb-3">
                      Add to Cart
                    </button>
                    <ToastContainer />
                  </div>
                </form>
                <p className="ml-2 text-color">
                  <b>Stock : {product.quantity}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <h3 className="text-center text-color">Similar Products</h3>
        {similarProducts.length === 0 ? (
          <p className="text-center">No similar products found.</p>
        ) : (
          similarProducts.map((similarProduct) => (
            <div className="col-sm-3" key={similarProduct.id}>
              <div className="card form-card border-color custom-bg">
                <img
                  src={`http://localhost:8080/api/product/${similarProduct.imageName}`}
                  alt={similarProduct.title}
                  className="card-img-top rounded mx-auto d-block m-2"
                  style={{ maxHeight: "200px", maxWidth: "100%", width: "auto" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{similarProduct.title}</h5>
                  <p className="card-text">Price: NPR {similarProduct.price}</p>
                  <button
                    className="btn bg-color custom-bg-text"
                    onClick={() => navigate(`/product/${similarProduct.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
