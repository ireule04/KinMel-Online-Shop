import { Link } from "react-router-dom";
import CategoryNavigator from "./CategoryNavigator";

const ProductCard = ({ item }) => {
  return (
    <div className="col">
      <div className="card border-color rounded-card card-hover product-card custom-bg h-100">
        <img
          src={`http://localhost:8080/api/product/${item.imageName}`}  // Fixed image URL
          className="card-img-top rounded mx-auto d-block m-2"
          alt={item.title}  // Descriptive alt text for image
          style={{
            maxHeight: "270px",
            maxWidth: "100%",
            width: "auto",
          }}
        />

        <div className="card-body text-color">
          <h5 className="card-title d-flex justify-content-between">
            <div>
              <b>{item.title}</b>
            </div>
            <CategoryNavigator
              item={{
                id: item.category.id,
                title: item.category.title,
              }}
            />
          </h5>
          <p className="card-text">
            <b>{item.description}</b>
          </p>
        </div>
        <div className="card-footer">
          <div className="text-center text-color">
            <p>
              <span>
                <h4>Price : NPR {item.price}</h4>
              </span>
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <Link
              to={`/product/${item.id}/category/${item.category.id}`}
              className="btn bg-color custom-bg-text"
            >
              Add to Cart
            </Link>

            <p className="text-color">
              <b>
                <i>Stock :</i> {item.quantity}
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
