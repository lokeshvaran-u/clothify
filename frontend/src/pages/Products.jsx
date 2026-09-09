import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { getUserRole } from "../utils/auth";
import "./Products.css";

function Products() {

  const navigate = useNavigate();

  const userRole = getUserRole();

  const isStoreAdmin = userRole === "StoreAdmin";


  const [products, setProducts] = useState([]);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await api.get("/products", {
          params: {
            search,
            category,
            sort,
            page: currentPage,
            limit: 6
          }
        });

        setProducts(response.data.products);

        setTotalPages(response.data.totalPages);

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Failed to load products"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, [search, category, sort, currentPage]);


  const handleSearchChange = (event) => {

    setSearch(event.target.value);

    setCurrentPage(1);

  };


  const handleCategoryChange = (event) => {

    setCategory(event.target.value);

    setCurrentPage(1);

  };


  const handleSortChange = (event) => {

    setSort(event.target.value);

    setCurrentPage(1);

  };


  const handleDelete = async (productId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      await api.delete(
        `/products/${productId}`
      );

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== productId
        )
      );

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to delete product"
      );

    }

  };


  const handlePreviousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(
        currentPage - 1
      );

    }

  };


  const handleNextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(
        currentPage + 1
      );

    }

  };


  if (error) {

    return (
      <div className="products-page">

        <main className="products-content">

          <p className="form-error">
            {error}
          </p>

        </main>

      </div>
    );

  }


  return (
    <div className="products-page">

      <main className="products-content">


        {/* Header */}

        <div className="products-header">

          <div>

            <h1>
              Products
            </h1>

            <p className="products-subtitle">
              Manage your clothing inventory
            </p>

          </div>


          {isStoreAdmin && (

            <button
              className="add-product-page-button"
              onClick={() =>
                navigate("/add-product")
              }
            >
              + Add Product
            </button>

          )}

        </div>


        {/* Search and Filters */}

        <div className="products-filters">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />


          <select
            value={category}
            onChange={handleCategoryChange}
            className="filter-select"
          >

            <option value="">
              All Categories
            </option>

            <option value="T-Shirt">
              T-Shirt
            </option>

            <option value="Hoodie">
              Hoodie
            </option>

            <option value="Shirt">
              Shirt
            </option>

            <option value="Jeans">
              Jeans
            </option>

            <option value="Men">
              Men
            </option>

            <option value="Women">
              Women
            </option>

          </select>


          <select
            value={sort}
            onChange={handleSortChange}
            className="filter-select"
          >

            <option value="">
              Sort By
            </option>

            <option value="price_asc">
              Price: Low to High
            </option>

            <option value="price_desc">
              Price: High to Low
            </option>

            <option value="name_asc">
              Name: A to Z
            </option>

            <option value="name_desc">
              Name: Z to A
            </option>

            <option value="newest">
              Newest
            </option>

          </select>

        </div>


        {/* Loading */}

        {loading && (

          <p className="products-loading">
            Loading products...
          </p>

        )}


        {/* No Products */}

        {!loading &&
          products.length === 0 && (

          <div className="no-products">

            <h2>
              No products found
            </h2>

            <p>
              Try changing your search or filters.
            </p>

          </div>

        )}


        {/* Product Grid */}

        {!loading &&
          products.length > 0 && (

          <div className="products-grid">

            {products.map((product) => (

              <div
                className="product-card"
                key={product._id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />


                <div className="product-info">

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

                  <p>
                    <strong>Quantity:</strong>{" "}
                    {product.quantity}
                  </p>


                  {/* Admin actions */}

                  {isStoreAdmin && (

                    <div className="product-actions">

                      <button
                        className="edit-button"
                        onClick={() =>
                          navigate(
                            `/edit-product/${product._id}`
                          )
                        }
                      >
                        Edit
                      </button>


                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(product._id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}


        {/* Pagination */}

        {!loading &&
          totalPages > 1 && (

          <div className="pagination">

            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>


            <span>
              Page {currentPage} of {totalPages}
            </span>


            <button
              onClick={handleNextPage}
              disabled={
                currentPage === totalPages
              }
            >
              Next →
            </button>

          </div>

        )}

      </main>

    </div>
  );
}

export default Products;