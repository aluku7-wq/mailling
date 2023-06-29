import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formdata, setformdata] = useState({
    email: null,
    password: null,
  });
  const [style, setstyle] = useState(null);
  const [message, setmessage] = useState(null);
  const submitFunction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formdata
      );
      // Handle successful response
      setstyle({
        backgroundColor: "rgb(126, 212, 212)",
      });
      setmessage(response.data);
    } catch (error) {
      // Handle error
      setstyle({
        backgroundColor: "pink",
      });
      setmessage(error.response.data.message);
    }
  };
  return (
    <form action="" onSubmit={submitFunction}>
      <div className="form_header" style={style}>
        {message && <p>{message}</p>}
      </div>
      <input
        type="email"
        placeholder="email"
        required
        onChange={(e) => {
          setformdata({ ...formdata, email: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="password"
        required
        onChange={(e) => {
          setformdata({ ...formdata, password: e.target.value });
        }}
      />
      <input type="submit" value="login" className="submit" />
      <h3>
        Forgot password?
        <a href="/forgot-password">Reset password</a>
      </h3>
    </form>
  );
};

export default Login;
