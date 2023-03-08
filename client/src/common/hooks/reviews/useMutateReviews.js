import {useState} from "react";
import {useDispatch} from "react-redux";
import {
  addNewReview,
  deleteReview,
  updateReview,
} from "../../../features/reviews/reviewsServices";
import pushNotification from "../../components/Shared/Notification";

const UseMutateReviews = (productId) => {
  const dispatch = useDispatch();

  //__ADD_REVIEW__//
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleReviewRatingChange = (val) => {
    setReviewRating(val);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewText || !reviewRating) {
      pushNotification("Please enter a review text and rating", "error");
      return;
    }
    dispatch(addNewReview({productId, body: {reviewText, reviewRating}}));
    setReviewText("");
    setReviewRating(0);
  };

  //__DELETE_REVIEW__//
  //DELETE_MODAL
  const [deleteReviewModal, setDeleteReviewModal] = useState(false);
  const toggleDeleteReviewModal = () =>
    setDeleteReviewModal(!deleteReviewModal);

  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview(reviewId));
  };

  //__UPDATE_REVIEW__//
  //UPDATE_MODAL
  const [updateReviewModal, setUpdateReviewModal] = useState(false);
  const toggleUpdateReviewModal = () =>
    setUpdateReviewModal(!updateReviewModal);

  const handleSubmitUpdateReview = (reviewId) => {
    dispatch(
      updateReview({
        reviewId,
        body: {reviewText, reviewRating},
      })
    );
  };
  return {
    reviewText,
    reviewRating,
    handleReviewTextChange,
    handleReviewRatingChange,
    handleSubmit,
    deleteReviewModal,
    toggleDeleteReviewModal,
    handleDeleteReview,
    updateReviewModal,
    toggleUpdateReviewModal,
    handleSubmitUpdateReview,
  };
};

export default UseMutateReviews;
