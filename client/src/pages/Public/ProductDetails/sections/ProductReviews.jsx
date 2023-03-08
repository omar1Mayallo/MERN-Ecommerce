import React from "react";
import {useEffect} from "react";
import ReactStars from "react-rating-stars-component";
import {useDispatch, useSelector} from "react-redux";
import {Alert, Button, Input, Form, Spinner} from "reactstrap";
import ReviewCard from "../../../../common/components/Cards/ReviewCard";
import UseMutateReviews from "../../../../common/hooks/reviews/useMutateReviews";
import {getProductReviews} from "../../../../features/reviews/reviewsServices";
import {resetMutationResult} from "../../../../features/reviews/reviewsSlice";
import {MdStar, MdStarBorder, MdStarHalf} from "react-icons/md";
import BlockLoader from "../../../../common/components/Loaders/BlockLoader";
import {Link} from "react-router-dom";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const {productReviews, isMutation} = useSelector((state) => state.reviews);
  const {productDetails} = useSelector((state) => state.products);
  const {isLoggedIn} = useSelector((state) => state.user);
  const {
    reviewText,
    reviewRating,
    handleReviewTextChange,
    handleReviewRatingChange,
    handleSubmit,
  } = UseMutateReviews(productDetails?.product?._id);

  useEffect(() => {
    if (productDetails?.product?._id || isMutation.success) {
      dispatch(resetMutationResult());
      dispatch(getProductReviews(productDetails?.product?._id));
    }
  }, [dispatch, productDetails?.product?._id, isMutation.success]);

  return (
    <section className="products-reviews-section">
      {!isLoggedIn ? (
        <Alert color="info">
          Login to add your review,{" "}
          <Link
            to={"/login"}
            state={{path: `/products/${productDetails?.product?._id}`}}
          >
            Login Now
          </Link>
        </Alert>
      ) : (
        <>
          {/* REVIEWS_ITEMS */}
          {productReviews.loading ? (
            <BlockLoader minHeight={300} />
          ) : productReviews.reviews.length > 0 ? (
            productReviews.reviews?.map((rev, idx) => (
              <ReviewCard rev={rev} key={idx} />
            ))
          ) : (
            <Alert color="info">No reviews added yet</Alert>
          )}

          {/* REVIEWS_FORM */}
          <div className="add-review-form my-3">
            <h3>Add Your Review</h3>
            <Form className="my-3" onSubmit={handleSubmit}>
              <ReactStars
                count={5}
                onChange={(val) => handleReviewRatingChange(val)}
                size={35}
                isHalf={true}
                emptyIcon={<MdStarBorder />}
                halfIcon={<MdStarHalf />}
                filledIcon={<MdStar />}
                activeColor="#ffd700"
                value={reviewRating * 1}
              />
              <Input
                type="textarea"
                rows="3"
                cols="50"
                placeholder="Add your review"
                className="my-2"
                value={reviewText}
                onChange={handleReviewTextChange}
              />
              {isMutation?.loading ? (
                <Button color="primary" disabled>
                  <Spinner size={"sm"} />
                </Button>
              ) : (
                <Button color="primary" type="submit">
                  Submit
                </Button>
              )}
            </Form>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductReviews;
