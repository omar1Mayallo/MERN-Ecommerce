import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ProductsCarousel from "../../../../common/components/Carousel/ProductsCarousel";
import {getCategoryProducts} from "../../../../features/products/productsServices";

const ProductsInSameCategorySection = ({categoryId = ""}) => {
  const dispatch = useDispatch();
  const {categoryProducts} = useSelector((state) => state.products);
  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryProducts({categoryId, limit: 7}));
    }
  }, [categoryId, dispatch]);
  return (
    <>
      <hr />
      <section className="products-in-same-category-section">
        <ProductsCarousel item={categoryProducts} secHead="In Same Category" />
      </section>
    </>
  );
};

export default ProductsInSameCategorySection;
