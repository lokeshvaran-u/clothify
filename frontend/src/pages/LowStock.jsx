import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getUserRole } from "../utils/auth";
import "./LowStock.css";

function LowStock() {

  const navigate = useNavigate();

  const userRole = getUserRole();

  const isStoreAdmin = userRole === "StoreAdmin";


  const [products, setProducts] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchLowStockProducts = async () => {

      try {

        const response = await api.get(
          "/products/low-stock"
        );

        setProducts(response.data);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to load low stock products"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchLowStockProducts();

  }, []);


  return (
    <div className="low-stock-page">

      <main className="low-stock-content">

        <div className="low-stock-header">

          <div>

            <h1>
              Low Stock
            </h1>

            <p className="low-stock-subtitle">
              Products that need restocking
            </p>

          </div>


          <div className="low-stock-count">
            {products.length} Products
          </div>

        </div>


        {loading && (

          <p className="low-stock-loading">
            Loading low stock products...
          </p>

        )}


        {error && (

          <p className="low-stock-error">
            {error}
          </p>

        )}


        {!loading &&
          !error &&
          products.length === 0 && (

          <div className="no-low-stock">

            <h2>
              All products are sufficiently stocked
            </h2>

            <p>
              There are currently no products with stock below 10.
            </p>

          </div>

        )}


        {!loading &&
          !error &&
          products.length > 0 && (

          <div className="low-stock-grid">

            {products.map((product) => (

              <div
                className="low-stock-card"
                key={product._id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="low-stock-image"
                />


                <div className="low-stock-info">

                  <h2>
                    {product.name}
                  </h2>

                  <p>
                    <strong>Brand:</strong>{" "}
                    {product.brand}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {product.category}
                  </p>

                  <p>
                    <strong>Price:</strong>{" "}
                    ₹{product.price}
                  </p>


                  <div className="stock-warning">

                    <span>
                      Current Stock
                    </span>

                    <strong>
                      {product.quantity}
                    </strong>

                  </div>


                  {isStoreAdmin && (

                    <button
                      className="restock-button"
                      onClick={() =>
                        navigate(
                          `/edit-product/${product._id}`
                        )
                      }
                    >
                      Update Stock
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default LowStock;