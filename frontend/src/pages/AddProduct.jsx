import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ImageUpload from "../components/ImageUpload";
import "./AddProduct.css";

function AddProduct() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    brand: "",
    category: "",
    quantity: "",
    image: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

  };


  const handleImageUpload = useCallback((imageUrl) => {

    setFormData((previousData) => ({
      ...previousData,
      image: imageUrl
    }));

  }, []);


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");


    if (!formData.image) {

      setError("Please upload a product image");

      return;
    }


    try {

      setLoading(true);

      await api.post("/products", {

        name: formData.name,

        price: Number(formData.price),

        brand: formData.brand,

        category: formData.category,

        quantity: Number(formData.quantity),

        image: formData.image

      });


      setSuccess("Product added successfully");


      setFormData({
        name: "",
        price: "",
        brand: "",
        category: "",
        quantity: "",
        image: ""
      });


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Failed to add product"
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="add-product-page">

      <main className="add-product-content">

        <div className="add-product-card">

          <h1>
            Add Product
          </h1>

          <p className="add-product-subtitle">
            Add a new clothing product to your inventory
          </p>


          <form onSubmit={handleSubmit}>

            <div className="image-section">

              <label>
                Product Image
              </label>


              {formData.image && (

                <img
                  src={formData.image}
                  alt="Product preview"
                  className="image-preview"
                />

              )}


              <ImageUpload
                onUpload={handleImageUpload}
              />


              {formData.image && (

                <p className="upload-success">
                  Image uploaded successfully
                </p>

              )}

            </div>


            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                required
              />

            </div>


            <div className="form-group">

              <label>
                Brand
              </label>

              <input
                type="text"
                name="brand"
                placeholder="Enter brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Category
              </label>

              <input
                type="text"
                name="category"
                placeholder="Enter category"
                value={formData.category}
                onChange={handleChange}
                required
              />

            </div>


            <div className="form-group">

              <label>
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
              />

            </div>


            {error && (

              <p className="form-error">
                {error}
              </p>

            )}


            {success && (

              <p className="form-success">
                {success}
              </p>

            )}


            <button
              type="submit"
              className="add-product-button"
              disabled={loading}
            >
              {loading
                ? "Adding Product..."
                : "Add Product"}
            </button>


            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/products")}
            >
              Cancel
            </button>

          </form>

        </div>

      </main>

    </div>
  );
}

export default AddProduct;