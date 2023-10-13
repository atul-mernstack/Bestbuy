import React from "react";
import "./ContactUs.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <p className="contactContainertext">CONTACT US</p>
      <a className="mailBtn" href="mailto:Ecommercewev707@gmail.com">
        <Button>Ecommercewev707@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;