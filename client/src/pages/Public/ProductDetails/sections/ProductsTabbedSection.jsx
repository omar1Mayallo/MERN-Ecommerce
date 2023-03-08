import React, {useState} from "react";
import {Nav, NavLink, TabContent, TabPane} from "reactstrap";
import ProductReviews from "./ProductReviews";

const ProductsTabbedSection = ({description}) => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <section className="product-desc-revs-section my-4">
      <Nav tabs>
        <NavLink
          className={activeTab === "1" ? "active" : ""}
          onClick={() => setActiveTab("1")}
          style={{cursor: "pointer", fontWeight: 600}}
        >
          Description
        </NavLink>
        <NavLink
          className={activeTab === "2" ? "active" : ""}
          onClick={() => setActiveTab("2")}
          style={{cursor: "pointer", fontWeight: 600}}
        >
          Reviews
        </NavLink>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className="p-3">
          <p>{description}</p>
        </TabPane>
        <TabPane tabId="2" className="p-2">
          <ProductReviews />
        </TabPane>
      </TabContent>
    </section>
  );
};

export default ProductsTabbedSection;
