// /products?sort=+price&limit=30&keyword=mist&page=1&price[lte]=100&price[gt]=0&ratingAverage[lte]=1&ratingAverage[gte]=0&category=63292e769de7cef23355a197&category=63292e769de7cef23355a195
import {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getAllProducts} from "../../../features/products/productsServices";
import {resetMutationResult} from "../../../features/products/productsSlice";

const useGetProducts = (limit = 8) => {
  const dispatch = useDispatch();
  const {allProducts, isMutation} = useSelector((state) => state.products);
  // console.log(allProducts);

  // LIMIT
  // let limit = 8;

  // SORT
  const [sortQueryParams, setSortQueryParams] = useState("");
  const handleSort = (sortType) => {
    if (sortType) {
      setSortQueryParams(`sort=${sortType}`);
    } else {
      setSortQueryParams("");
    }
  };

  // RATING
  const [ratingQueryParams, setRatingQueryParams] = useState("");
  const handleRate = (ratingVal) => {
    setPageQueryParams("&page=1");
    if (ratingVal === "all") {
      setRatingQueryParams(`&ratingAverage[gte]=0&ratingAverage[lte]=5`);
    } else {
      setRatingQueryParams(
        `&ratingAverage[gte]=${ratingVal - 1}&ratingAverage[lte]=${ratingVal}`
      );
    }
  };

  // PRICE
  const [priceQueryParams, setPriceQueryParams] = useState("");
  const handlePrice = (price) => {
    setPageQueryParams("&page=1");
    if (price === "0") {
      return setPriceQueryParams("");
    }
    setPriceQueryParams(`&price[gte]=0&price[lte]=${price}`);
  };

  // SEARCH
  const [searchQueryParams, setSearchQueryParams] = useState("");
  const handleSearch = (keyword) => {
    setPageQueryParams("&page=1");
    setSearchQueryParams(`&keyword=${keyword}`);
  };

  // CATEGORY
  const [categoryQueryParams, setCategoryQueryParams] = useState("");
  const [checkedCategories, setCheckedCategories] = useState([]);
  const handleCategory = (e) => {
    setPageQueryParams("&page=1");
    if (e.target.checked) {
      setCheckedCategories([...checkedCategories, e.target.value]);
    } else {
      setCheckedCategories(
        checkedCategories.filter((item) => item !== e.target.value)
      );
    }
  };

  // PAGINATION
  const [pageQueryParams, setPageQueryParams] = useState("");
  const handlePagination = (pageNum) => {
    setPageQueryParams(`&page=${pageNum}`);
  };

  useEffect(() => {
    if (checkedCategories.length > 0) {
      const buildQueryParams = checkedCategories
        .map((value) => "category=" + value)
        .join("&");
      setCategoryQueryParams("&" + buildQueryParams);
      console.log("&" + buildQueryParams);
    } else {
      setCategoryQueryParams("");
    }
    if (isMutation.success) {
      dispatch(
        getAllProducts(
          `${sortQueryParams}&limit=${limit}${pageQueryParams}${ratingQueryParams}${priceQueryParams}${searchQueryParams}${categoryQueryParams}`
        )
      );
      dispatch(resetMutationResult());
    } else {
      dispatch(
        getAllProducts(
          `${sortQueryParams}&limit=${limit}${pageQueryParams}${ratingQueryParams}${priceQueryParams}${searchQueryParams}${categoryQueryParams}`
        )
      );
    }
  }, [
    dispatch,
    limit,
    sortQueryParams,
    ratingQueryParams,
    priceQueryParams,
    searchQueryParams,
    categoryQueryParams,
    checkedCategories,
    pageQueryParams,
    isMutation.success,
  ]);

  return {
    allProducts,
    handleSort,
    handleRate,
    handlePrice,
    handleSearch,
    handleCategory,
    handlePagination,
    limit,
    isMutation,
  };
};

export default useGetProducts;
