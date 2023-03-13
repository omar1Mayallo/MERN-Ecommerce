import React, {useEffect} from "react";
import {getProductDetails} from "../../../../features/products/productsServices";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  Alert,
  Badge,
  Button,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Spinner,
  UncontrolledTooltip,
} from "reactstrap";
import BlockLoader from "../../../../common/components/Loaders/BlockLoader";
import ProductDetailsCarousel from "../../../../common/components/Carousel/ProductDetailsCarousel";
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import useWishlist from "../../../../common/hooks/wishlist/useWishlist";
import RatingStars from "../../../../common/components/Shared/RatingStars";
import ProductsTabbedSection from "./ProductsTabbedSection";
import ProductsInSameCategorySection from "./ProductsInSameCategorySection";
import useAddToCart from "../../../../common/hooks/cart/useAddToCart";

const ProductInfoSection = () => {
  const dispatch = useDispatch();
  const {productId} = useParams();

  //PRODUCT_DETAILS
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [productId, dispatch]);
  const {productDetails} = useSelector((state) => state.products);
  //WISHLIST
  const {
    userWishList,
    isMutation,
    isLoggedIn,
    handleRemoveFromWishlist,
    handleAddToWishlist,
  } = useWishlist();
  //ADD_TO_CART
  const {
    colorIdx,
    sizeIdx,
    handleSelectColor,
    handleSelectSize,
    handleQtyClick,
    handleAddToCart,
    cartState,
  } = useAddToCart(productDetails.product);

  return (
    <section className="products-info-section">
      {/* LOADING_ERROR_HANDLING */}
      {productDetails?.loading ? (
        <BlockLoader minHeight={300} />
      ) : productDetails?.error ? (
        typeof productDetails?.error === "string" ? (
          <Alert color="danger">{productDetails?.error}</Alert>
        ) : (
          productDetails?.error?.map((err, idx) => (
            <Alert color="danger" key={idx}>
              {err.msg}
            </Alert>
          ))
        )
      ) : (
        <>
          <Row>
            {/* SLIDER_IMAGES */}
            <Col md={5}>
              <ProductDetailsCarousel
                sliderImages={productDetails?.product?.sliderImages}
                image={productDetails?.product?.image}
              />
            </Col>
            {/* INFO */}
            <Col md={7}>
              <ListGroup flush>
                {/* Name - WishIcon */}
                <ListGroupItem>
                  <div className="name-wish-container d-flex align-items-center justify-content-between">
                    <h3 className="m-0">{productDetails?.product?.name}</h3>
                    {!isLoggedIn ? (
                      <>
                        <AiOutlineHeart size={30} id="ScheduleUpdateTooltip" />
                        <UncontrolledTooltip
                          placement="top"
                          target="ScheduleUpdateTooltip"
                          trigger="click"
                        >
                          Login to get access
                        </UncontrolledTooltip>
                      </>
                    ) : isMutation?.loading || userWishList?.loading ? (
                      <Spinner size={"sm"} />
                    ) : userWishList?.wishlist?.findIndex(
                        (item) => item._id === productDetails?.product?._id
                      ) === -1 ? (
                      <AiOutlineHeart
                        size={30}
                        onClick={() =>
                          handleAddToWishlist(productDetails?.product?._id)
                        }
                      />
                    ) : (
                      <AiFillHeart
                        size={30}
                        color={"red"}
                        onClick={() =>
                          handleRemoveFromWishlist(productDetails?.product?._id)
                        }
                      />
                    )}
                  </div>
                </ListGroupItem>
                {/* Id */}
                <ListGroupItem>
                  <p className="id-container m-0">
                    Id -{" "}
                    <span className="text-muted">
                      {productDetails?.product?._id}
                    </span>
                  </p>
                </ListGroupItem>
                {/* Category - SubCategories */}
                <ListGroupItem>
                  <div className="cat-subCat-container d-flex flex-column">
                    <span>
                      CATEGORY -{" "}
                      <Badge color="info" className="p-1 rounded">
                        {productDetails?.product?.category?.name}
                      </Badge>
                    </span>

                    {productDetails?.product &&
                      productDetails?.product?.subcategories?.length > 0 && (
                        <span className="mt-2">
                          SUBCATEGORIES -{" "}
                          {productDetails?.product?.subcategories.map(
                            (item) => (
                              <Badge
                                color="danger"
                                className="p-1 rounded me-2"
                                key={item._id}
                              >
                                {item.name}
                              </Badge>
                            )
                          )}
                        </span>
                      )}
                  </div>
                </ListGroupItem>
                {/* Price - Discount */}
                <ListGroupItem>
                  <span style={{color: "#ff6262"}}>
                    $
                    {productDetails?.product?.price -
                      productDetails?.product?.discount}
                  </span>{" "}
                  {productDetails?.product?.discount > 0 && (
                    <span className="text-muted text-decoration-line-through">
                      ${productDetails?.product?.price}
                    </span>
                  )}
                </ListGroupItem>
                {/* Stars - Reviews */}
                <ListGroupItem>
                  <div className="d-flex align-items-center">
                    <RatingStars
                      size={24}
                      ratingAverage={productDetails?.product?.ratingAverage}
                    />
                    <span className="pt-1 text-muted">
                      ({productDetails?.product?.reviewsNumber})
                    </span>
                  </div>
                </ListGroupItem>
                {/* Sold */}
                <ListGroupItem>
                  <div>
                    SOLD -{" "}
                    <span className="pt-1 text-muted">
                      ({productDetails?.product?.sold})
                    </span>
                  </div>
                </ListGroupItem>

                {/* Colors  */}
                {productDetails?.product &&
                  productDetails?.product?.colors.length > 0 && (
                    <ListGroupItem>
                      <div className="color-list-container">
                        <h5>Color</h5>
                        <ul className="list-block d-flex flex-wrap">
                          {productDetails?.product?.colors.map((item, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={() => handleSelectColor(idx, item)}
                                className="color me-2 mb-2"
                                style={{
                                  cursor: "pointer",
                                  height: "35px",
                                  width: "35px",
                                  borderRadius: "100%",
                                  backgroundColor: item,
                                  boxShadow:
                                    colorIdx === idx
                                      ? "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
                                      : "none",
                                  border:
                                    colorIdx === idx
                                      ? "1px solid whitesmoke"
                                      : "none",
                                }}
                              />
                            );
                          })}
                        </ul>
                      </div>
                    </ListGroupItem>
                  )}

                {/* Sizes  */}
                {productDetails?.product &&
                  productDetails?.product?.size.length > 0 && (
                    <ListGroupItem>
                      <div className="size-list-container">
                        <h5>Size</h5>
                        <ul className="list-block d-flex flex-wrap">
                          {productDetails?.product?.size.map((item, idx) => {
                            return (
                              <li
                                key={idx}
                                onClick={() => handleSelectSize(idx, item)}
                                className="color me-2 mb-2"
                                style={{
                                  cursor: "pointer",
                                  border: "1px solid black",
                                  padding: "8px",
                                  backgroundColor:
                                    sizeIdx === idx ? "black" : "white",
                                  color: sizeIdx === idx ? "white" : "black",
                                }}
                              >
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </ListGroupItem>
                  )}

                {/* Qty - Add To Cart  */}
                <ListGroupItem>
                  {productDetails?.product &&
                    (productDetails?.product?.quantityInStock <= 0 ? (
                      <div>
                        <Button disabled color="dark" className="w-100">
                          Add To Cart
                        </Button>
                      </div>
                    ) : (
                      <Row>
                        <Col md={2} xs={3}>
                          <select
                            id="qtySelect"
                            name="select"
                            type="select"
                            style={{padding: "10px 10px", width: "100%"}}
                            onChange={(e) => handleQtyClick(e.target.value)}
                          >
                            {[
                              ...Array(
                                productDetails?.product?.quantityInStock
                              ).keys(),
                            ].map((i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </Col>
                        <Col md={10} xs={9}>
                          {cartState?.isMutation?.loading ? (
                            <Button color="dark" className="w-100" disabled>
                              <Spinner size={"sm"} />
                            </Button>
                          ) : (
                            <Button
                              color="dark"
                              className="w-100"
                              onClick={handleAddToCart}
                            >
                              Add To Cart
                            </Button>
                          )}
                        </Col>
                      </Row>
                    ))}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>

          {/* DESCRIPTION & REVIEWS */}
          <ProductsTabbedSection
            description={productDetails?.product?.description}
            productId={productDetails?.product?._id}
          />

          {/* PRODUCTS_IN_SAME_CATEGORY */}
          <ProductsInSameCategorySection
            categoryId={productDetails?.product?.category?._id}
          />
        </>
      )}
    </section>
  );
};

export default ProductInfoSection;
