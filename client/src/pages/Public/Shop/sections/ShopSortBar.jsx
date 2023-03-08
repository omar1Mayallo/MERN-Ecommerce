import React from "react";
import {Input} from "reactstrap";

const ShopSortBar = ({results = 0, handleSort}) => {
  return (
    <section className="sort-bar-section my-3 d-flex align-items-center justify-content-between">
      <span>Results: {results}</span>

      <div>
        <Input
          id="sort by select"
          name="select"
          type="select"
          bsSize="sm"
          onChange={(e) => {
            handleSort(e.target.value);
          }}
        >
          <option value="">Default Sort</option>
          <option value="-price">Price high to low</option>
          <option value="+price">Price low to high</option>
          <option value="+ratingAverage">Rating Low to high</option>
          <option value="-ratingAverage">Rating high to low</option>
          <option value="name">Alphabetical</option>
        </Input>
      </div>
    </section>
  );
};

export default ShopSortBar;
