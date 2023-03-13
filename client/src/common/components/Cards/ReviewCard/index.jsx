import React from "react";
import {useSelector} from "react-redux";
import ReactTimeAgo from "react-time-ago";
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledDropdown,
  Form,
  Spinner,
} from "reactstrap";
import RatingStars from "../../Shared/RatingStars";
import {
  MdDelete,
  MdModeEditOutline,
  MdStar,
  MdStarBorder,
  MdStarHalf,
} from "react-icons/md";
import {BsThreeDotsVertical} from "react-icons/bs";
import UseMutateReviews from "../../../hooks/reviews/useMutateReviews";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({rev}) => {
  const {userProfile} = useSelector((state) => state.user);
  const {isMutation} = useSelector((state) => state.reviews);

  const {
    reviewText,
    reviewRating,
    handleReviewTextChange,
    handleReviewRatingChange,
    deleteReviewModal,
    toggleDeleteReviewModal,
    handleDeleteReview,
    updateReviewModal,
    toggleUpdateReviewModal,
    handleSubmitUpdateReview,
  } = UseMutateReviews();
  // console.log(userProfile);
  return (
    <div className="d-flex p-2 rounded mb-2">
      {/* user_image */}
      <div className="text-center me-3" style={{width: "70px"}}>
        <img
          src={rev.user.image}
          alt="user-img"
          className="rounded-circle"
          width={50}
          height={50}
        />
      </div>
      {/* review_info */}
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          borderRadius: "15px",
          padding: "10px 20px",
          position: "relative",
        }}
        className="w-100"
      >
        {/* ICONS */}
        {userProfile?.user?._id === rev.user._id && (
          <div
            className="d-flex"
            style={{position: "absolute", top: "10px", right: "15px"}}
          >
            <UncontrolledDropdown>
              <DropdownToggle className="p-0" color="light">
                <BsThreeDotsVertical size={25} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  style={{cursor: "pointer"}}
                  onClick={toggleUpdateReviewModal}
                  className="d-flex align-items-center gap-2"
                >
                  <MdModeEditOutline size={20} />
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  style={{cursor: "pointer"}}
                  onClick={toggleDeleteReviewModal}
                  className="d-flex align-items-center gap-2"
                >
                  <MdDelete size={20} />
                  <span>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
        {/* MODALS */}
        {/* Delete Modal  */}
        <Modal
          isOpen={deleteReviewModal}
          toggle={toggleDeleteReviewModal}
          centered
        >
          <ModalHeader toggle={toggleDeleteReviewModal}>
            Delete Review
          </ModalHeader>
          <ModalBody>Are You Sure To Delete Your Review ?</ModalBody>
          <ModalFooter>
            {isMutation.loading ? (
              <Button color="primary" disabled>
                <Spinner size={"sm"} />
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => {
                  handleDeleteReview(rev._id);
                  if (isMutation.loading === "false") {
                    toggleDeleteReviewModal();
                  }
                }}
              >
                Delete
              </Button>
            )}

            <Button color="secondary" onClick={toggleDeleteReviewModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* Update Modal  */}
        <Modal
          isOpen={updateReviewModal}
          toggle={toggleUpdateReviewModal}
          centered
        >
          <ModalHeader toggle={toggleUpdateReviewModal}>
            Update Review
          </ModalHeader>
          <ModalBody>
            <Form>
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
                placeholder="Update Your Review"
                className="my-2"
                value={reviewText}
                onChange={handleReviewTextChange}
              />
            </Form>
          </ModalBody>
          <ModalFooter>
            {isMutation.loading ? (
              <Button color="primary" disabled>
                <Spinner size={"sm"} />
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => {
                  handleSubmitUpdateReview(rev._id);
                  if (isMutation.loading === "false") {
                    toggleUpdateReviewModal();
                  }
                }}
              >
                Update
              </Button>
            )}

            <Button color="secondary" onClick={toggleUpdateReviewModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* REVIEW_ITEM */}
        <h5 className="mb-1 w-75">{rev.user.username}</h5>
        <div>
          <RatingStars size={17} ratingAverage={rev.reviewRating} />
        </div>
        <p className="my-2" style={{wordBreak: "break-all"}}>
          {rev.reviewText}
        </p>
        <p className="created-at text-muted m-0" style={{fontSize: "13px"}}>
          Created:{" "}
          <ReactTimeAgo
            date={new Date(rev.createdAt).getTime()}
            locale="en-US"
            timeStyle="round-minute"
          />
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
