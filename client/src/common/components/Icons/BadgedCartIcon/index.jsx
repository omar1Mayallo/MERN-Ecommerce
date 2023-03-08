import React from "react";
import {FaShoppingCart} from "react-icons/fa";
import {Badge} from "reactstrap";
import {CartIcon} from "./styles";

const BadgedCartIcon = ({numOfItems}) => {
  return (
    <CartIcon>
      <Badge color="danger" className="badge-num">
        {numOfItems > 0 ? (numOfItems < 100 ? numOfItems : "+99") : 0}
      </Badge>
      <FaShoppingCart />
    </CartIcon>
  );
};

export default BadgedCartIcon;
