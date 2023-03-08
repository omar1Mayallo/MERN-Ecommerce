import React from "react";

const SocialIcon = ({Icon, bgColor}) => {
  return (
    <a
      href="https://www.google.com"
      className="social-icon d-flex flex-column justify-content-center
                align-items-center mx-2 "
      style={{
        background: `${bgColor}`,
        width: "33px",
        height: "33px",
        borderRadius: "100%",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Icon size={18} color="#fff" />
    </a>
  );
};

export default SocialIcon;
