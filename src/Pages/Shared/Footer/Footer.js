import React from "react";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className="text-center mt-3 bg-black text-white p-2">
      <p>
        <small>copyright &copy {year}</small>
      </p>
    </footer>
  );
};

export default Footer;
