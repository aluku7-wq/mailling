import { useState } from "react";
import axios from "axios";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    related: "",
    message: "",
  });
  const [style, setstyle] = useState(null);
  const [message, setmessage] = useState(null);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/support",
        formData
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
    <div className="support">
      <h2>Email support</h2>
      <div className="form_header" style={style}>
        {message && <p>{message}</p>}
      </div>
      <form className="support_form" onSubmit={onSubmit}>
        <div className="cridentials">
          <div className="form_group">
            <label htmlFor="name">Name *</label>
            <input type="text" name="name" required onChange={onChange} />
          </div>
          <div className="form_group">
            <label htmlFor="email">Email *</label>
            <input type="email" name="email" required onChange={onChange} />
          </div>
        </div>
        <div className="subject">
          <div className="form_group">
            <label htmlFor="subject">subject *</label>
            <input type="text" name="subject" required onChange={onChange} />
          </div>
          <div className="form_group">
            <label htmlFor="related">Related to</label>
            <select name="related" onChange={onChange}>
              <option value=""> --select one --</option>
              <option value="support"> support </option>
              <option value="subscription"> subscription </option>
              <option value="billing"> billing </option>
              <option value="other"> other</option>
            </select>
          </div>
        </div>
        <div className="message">
          <div className="form_group">
            <label htmlFor="message">Message *</label>
            <textarea name="message" required onChange={onChange} />
          </div>
        </div>
        <input type="submit" value="Send Message" className="submit" />
      </form>
    </div>
  );
};

export default Support;
