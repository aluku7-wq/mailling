import { useState } from "react";
import axios from "axios";
const Forgotpassword = () => {
  const [formdata, setformdata] = useState({
    email: null,
  });
  const [style, setstyle] = useState({ backgroundColor: "aqua" });
  const [message, setmessage] = useState(
    "Please enter your email address. You will receive an email message with instructions on how to reset your password."
  );
  const submitFunction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
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
      console.log(error);
      setmessage(error.response.data.message);
    }
  };
  return (
    <form action="" onSubmit={submitFunction}>
      <div className="form_header" style={style}>
        {message && <p>{message}</p>}
      </div>
      <h2>Forgot Password</h2>{" "}
      <div className="form_group">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Add email address"
          required
          onChange={(e) => {
            setformdata({ ...formdata, email: e.target.value });
          }}
        />
      </div>
      <input type="submit" value="submit" className="submit" />
      <h3>
        Don't need a password?
        <a href="/login">login</a>
      </h3>
    </form>
  );
};

export default Forgotpassword;
