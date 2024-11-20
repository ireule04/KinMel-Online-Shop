import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddCardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const priceToPay = location.state.priceToPay;

  const [card, setCard] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardType: "",
  });

  const handleCardInput = (e) => {
    const { name, value } = e.target;

    // Automatically set card type based on the card number
    if (name === "cardNumber") {
      if (/^4/.test(value)) {
        setCard({ ...card, cardType: "Visa", cardNumber: value });
      } else if (/^5[1-5]/.test(value)) {
        setCard({ ...card, cardType: "MasterCard", cardNumber: value });
      } else if (/^3[47]/.test(value)) {
        setCard({ ...card, cardType: "American Express", cardNumber: value });
      } else if (/^6/.test(value)) {
        setCard({ ...card, cardType: "Discover", cardNumber: value });
      } else {
        setCard({ ...card, cardType: "Unknown", cardNumber: value });
      }
    } else if (name === "expiryDate") {
      // Format expiry date as MM/YYYY
      let formattedValue = value.replace(/[^0-9]/g, ""); // remove non-numeric characters
      if (formattedValue.length <= 2) {
        formattedValue = formattedValue.replace(/(\d{2})/, "$1"); // Ensure MM format
      } else if (formattedValue.length <= 4) {
        formattedValue = formattedValue.replace(/(\d{2})(\d{2})/, "$1/$2"); // Add / separator after MM
      }
      setCard({ ...card, expiryDate: formattedValue });
    } else {
      setCard({ ...card, [name]: value });
    }
  };

  const validateCardNumber = (number) => {
    // Simple validation for multiple card types
    const visaRegex = /^4\d{12}(\d{3})?$/; // Visa: 13 or 16 digits
    const masterCardRegex = /^5[1-5]\d{14}$/; // MasterCard: 16 digits
    const amexRegex = /^3[47]\d{13}$/; // American Express: 15 digits
    const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/; // Discover: 16 digits
    return visaRegex.test(number) || masterCardRegex.test(number) || amexRegex.test(number) || discoverRegex.test(number);
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv); // 3 digits for Visa, MasterCard, Discover; 4 digits for American Express
  };

  const validateExpiryDate = (expiryDate) => {
    const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/; // MM/YY format
    if (!regex.test(expiryDate)) return false; // Check if the format is valid
  
    // Parse month and year
    const [month, year] = expiryDate.split("/").map((item) => parseInt(item, 10));
  
    // Get the current date and extract current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
    const currentYear = currentDate.getFullYear() % 100; // Extract last two digits of the year (e.g., 2024 becomes 24)
  
    // Compare year and month
    if (year < currentYear) return false; // Expiry year must be after current year
    if (year === currentYear && month < currentMonth) return false; // If same year, expiry month must be >= current month
  
    return true; // Valid expiry date
  };
  
  const payAndOrder = () => {
    fetch(`http://localhost:8080/api/user/order?userId=${user.id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((res) => {
        console.log(res);
      });
    });
  };

  const payForOrder = (e) => {
    e.preventDefault();
    if (!validateCardNumber(card.cardNumber)) {
      toast.error("Invalid card number!");
      return;
    }
    if (!validateCVV(card.cvv)) {
      toast.error("Invalid CVV!");
      return;
    }
    if (!validateExpiryDate(card.expiryDate)) {
      toast.error("Invalid expiry date format or expired!");
      return;
    }
    payAndOrder();
    toast.success("Products Ordered Successfully!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/home");
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="card form-card border-color" style={{ width: "25rem" }}>
          <div className="card-header bg-color custom-bg-text">
            <h5 className="card-title text-center">Payment Details</h5>
          </div>
          <div className="card-body text-color custom-bg">
            <form onSubmit={payForOrder}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Name on Card</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="cardName"
                  onChange={handleCardInput}
                  value={card.cardName}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  <b>Card Number</b> ({card.cardType || "Unknown"})
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  name="cardNumber"
                  onChange={handleCardInput}
                  value={card.cardNumber}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="expiryDate" className="form-label">
                  <b>Expiry Date (MM/YYYY)</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  name="expiryDate"
                  onChange={handleCardInput}
                  value={card.expiryDate}
                  placeholder="MM/YYYY"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                  <b>CVV</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  name="cvv"
                  onChange={handleCardInput}
                  value={card.cvv}
                  required
                />
              </div>
              <input
                type="submit"
                className="btn custom-bg-text bg-color"
                value={`Pay Rs${priceToPay}`}
              />
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCardDetails;
