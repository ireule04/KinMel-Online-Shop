import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (
    
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li className="nav-item">
        <Link
          to="/user/customer/register"
          className="btn btn-primary mx-2"
          aria-current="page"
        >
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/user/login"
          className="btn btn-secondary mx-2"
          aria-current="page"
        >
          Login
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;
