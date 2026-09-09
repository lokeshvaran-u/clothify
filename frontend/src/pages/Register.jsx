import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    try {

      setLoading(true);

      const response = await api.post("/users/register", {
  name: formData.name,
  email: formData.email,
  password: formData.password,
  adminCode: formData.adminCode || undefined
});

localStorage.setItem(
  "token",
  response.data.token
);

navigate("/dashboard", {
  replace: true
});

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <div className="register-page">

      <div className="register-card">

        <h1>
          Clothify
        </h1>

        <p className="register-subtitle">
          Create your account
        </p>


        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          <div className="form-group">

            <label>
              Admin Registration Code
              <span className="optional">
                Optional
              </span>
            </label>

            <input
              type="password"
              name="adminCode"
              placeholder="Enter only if you are a StoreAdmin"
              value={formData.adminCode}
              onChange={handleChange}
            />

          </div>


          <p className="role-info">
            Without an admin code, your account will be
            registered as a SalesAssistant.
          </p>


          {error && (

            <p className="form-error">
              {error}
            </p>

          )}


          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        <p className="login-link">

          Already have an account?

          {" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;