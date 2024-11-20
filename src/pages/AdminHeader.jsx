import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const deleteCategory = () => {
    const categoryId = prompt("Enter the ID of the category to delete:");
    if (categoryId) {
      fetch(`http://localhost:8080/api/category/delete/${categoryId}`, {
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

  const deleteProduct = () => {
    const productId = prompt("Enter the ID of the product to delete:");
    if (productId) {
      if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
        fetch(`http://localhost:8080/api/product/delete/${productId}`, {
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
    }
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="/user/delivery/register"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Delivery</b>
        </Link>
      </li>

      {/* Dropdown for Category */}
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle active"
          to="#"
          id="categoryDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b className="text-color">Category</b>
        </Link>
        <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
          <li>
            <Link to="/addcategory" className="dropdown-item">
              Add Category
            </Link>
          </li>
          <li>
  <Link to="/deletecategory" className="dropdown-item">
    Delete Category
  </Link>
</li>
        </ul>
      </li>

      {/* Dropdown for Product */}
      <li className="nav-item dropdown">
        <Link
          className="nav-link dropdown-toggle active"
          to="#"
          id="productDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b className="text-color">Product</b>
        </Link>
        <ul className="dropdown-menu" aria-labelledby="productDropdown">
          <li>
            <Link to="/addproduct" className="dropdown-item">
              Add Product
            </Link>
          </li>
          <li>
  <Link to="/deleteproduct" className="dropdown-item">
    Delete Product
  </Link>
</li>
        </ul>
      </li>

      <li className="nav-item">
        <Link
          to="/user/admin/allorder"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">All Orders</b>
        </Link>
      </li>

      <li className="nav-item">
        <Link
          to="/user/admin/assigndelivery"
          className="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Assign Order Delivery</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={adminLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
