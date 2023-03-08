import React, {useEffect} from "react";
import {
  getTopRatedProducts,
  getTopSalesProducts,
  getTopSoldProducts,
  getNewArrivalsProducts,
} from "../../../../features/products/productsServices";
import {useDispatch, useSelector} from "react-redux";
import ProductsCarousel from "../../../../common/components/Carousel/ProductsCarousel";
const HomeCarouselSection = () => {
  const dispatch = useDispatch();
  const {homeProducts} = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getTopRatedProducts());
    dispatch(getTopSalesProducts());
    dispatch(getTopSoldProducts());
    dispatch(getNewArrivalsProducts());
  }, [dispatch]);

  return (
    <section className="products-carousel-section">
      {homeProducts.map((item, idx) => (
        <ProductsCarousel key={idx} item={item} />
      ))}
    </section>
  );
};

export default HomeCarouselSection;
