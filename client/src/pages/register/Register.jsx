import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formdata, setformdata] = useState({
    name: null,
    email: null,
    password: null,
    repeatpassword: null,
  });
  const [style, setstyle] = useState(null);
  const [message, setmessage] = useState(null);
  const submitFunction = async (e) => {
    e.preventDefault();
    if (formdata.repeatpassword !== formdata.password) {
      setstyle({
        backgroundColor: "pink",
      });
      setmessage("passwords do not match");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/register",
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
    }
  };
  return (
    <form action="" onSubmit={submitFunction}>
      <div className="form_header" style={style}>
        {message && <p>{message}</p>}
      </div>

      <input
        type="text"
        placeholder="Full Name"
        required
        onChange={(e) => {
          setformdata({ ...formdata, name: e.target.value });
        }}
      />
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
      <input
        type="password"
        placeholder="repeat password"
        required
        onChange={(e) => {
          setformdata({ ...formdata, repeatpassword: e.target.value });
        }}
      />
      <input type="submit" value="register" className="submit" />
    </form>
  );
};

export default Register;
