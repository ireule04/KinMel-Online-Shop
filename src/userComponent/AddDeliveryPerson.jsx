import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDeliveryPerson = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;

    // Text-only validation for firstName and lastName
    if ((name === "firstName" || name === "lastName") && !/^[a-zA-Z\s]*$/.test(value)) {
      toast.error("Only letters and spaces are allowed for names.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setUser({ ...user, [name]: value });
  };

  // Password validation regex (8 characters, at least one uppercase, one lowercase, one number, one special character)
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(password);
  };

  const saveUser = (e) => {
    e.preventDefault();

    // Password validation
    if (!validatePassword(user.password)) {
      toast.error("Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    fetch("http://localhost:8080/api/user/deliveryperson/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      console.warn("result", result);
      result.json().then((res) => {
        console.log("response", res);
      });
    });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div className="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color">
            <h5 className="card-title">Add Delivery Person</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleUserInput}
                  value={user.firstName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleUserInput}
                  value={user.lastName}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Id</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailId"
                  name="emailId"
                  onChange={handleUserInput}
                  value={user.emailId}
                />
              </div>

              <div className="mb-3 mt-1">
                <label htmlFor="quantity" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleUserInput}
                  value={user.password}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Mobile No
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  onChange={handleUserInput}
                  value={user.phoneNo}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Street
                </label>
                <textarea
                  className="form-control"
                  id="street"
                  name="street"
                  rows="3"
                  onChange={handleUserInput}
                  value={user.street}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  onChange={handleUserInput}
                  value={user.city}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  onChange={handleUserInput}
                  value={user.pincode}
                />
              </div>

              <button
                type="submit"
                className="btn custom-bg text-color"
                onClick={saveUser}
              >
                Register
              </button>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryPerson;
