import React from "react";

const PageHead = ({title, description}) => {
  return (
    <div className="page-head text-center mb-4">
      <h2
        style={{
          fontSize: "40px",
          fontWeight: 800,
        }}
      >
        {title}
      </h2>

      <p className="lead">{description}</p>
      <hr />
    </div>
  );
};

export default PageHead;
