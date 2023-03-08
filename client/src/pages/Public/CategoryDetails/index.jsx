import React, {useEffect} from "react";
import {Container} from "reactstrap";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import {getCategoryDetails} from "../../../features/categories/categoriesServices";
import CategoryInfoSection from "./sections/CategoryInfoSection";
import CategoryProductsSection from "./sections/CategoryProductsSection";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {getCategoryProducts} from "../../../features/products/productsServices";
const CategoryDetails = () => {
  const {categoryId} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryProducts({categoryId}));
    dispatch(getCategoryDetails(categoryId));
  }, [categoryId, dispatch]);
  return (
    <>
      <PageHelmet title={"CategoryDetails"} />
      <Container className="py-4">
        <CategoryInfoSection />
        <CategoryProductsSection />
      </Container>
    </>
  );
};

export default CategoryDetails;
