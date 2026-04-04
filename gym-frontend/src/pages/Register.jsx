import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password }
      );

      alert(res.data);
      navigate("/"); // go back to login
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Register</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleRegister}>Register</button>

      <br /><br />

      <button onClick={() => navigate("/")}>
        Go to Login
      </button>
    </div>
  );
}

export default Register;