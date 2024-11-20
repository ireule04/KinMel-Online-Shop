import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderUser  = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    // Show a success toast notification
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    // Remove the active user from session storage
    sessionStorage.removeItem("active-user");
    
    // Redirect to the home page immediately after logging out
    navigate('/');
  };

  return (
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link to="/user/mycart" className="nav-link active" aria-current="page">
          <b className="text-color">My Cart</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/user/myorder" className="nav-link active" aria-current="page">
          <b className="text-color">My Order</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/user/forget-password" className="nav-link active" aria-current="page">
          <b className="text-color">Change Password</b>
        </Link>
      </li>

      
      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={userLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default HeaderUser ;