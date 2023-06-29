import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Resetpassword = () => {
  const { token } = useParams();
  const [formdata, setformdata] = useState({
    email: null,
    token,
  });
  const [style, setstyle] = useState(null);
  const [message, setmessage] = useState(null);
  const submitFunction = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/reset-password",
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
      <h2>Reset Password</h2>{" "}
      <div className="form_group">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Choose new password"
          required
          onChange={(e) => {
            setformdata({ ...formdata, password: e.target.value });
          }}
        />
      </div>
      <input type="submit" value="submit" className="submit" />
      <h3>
        <a href="/login">login</a>
      </h3>
    </form>
  );
};

export default Resetpassword;
