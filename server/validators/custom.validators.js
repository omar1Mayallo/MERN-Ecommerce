import {USER_ROLES} from "../constants/index.js";

//__CHECK(By FieldName)_Field_isUnique__//
export const isUnique = async (val, Model, fieldName) => {
  const fieldExist = await Model.findOne({[fieldName]: val});
  if (fieldExist) {
    throw new Error(`${fieldName} is already exist`);
  }
};

//__CHECK(By ID)_Field_ExistInDatabase__//
export const isExistInDB = async (val, Model) => {
  const fieldExist = await Model.findById(val);
  if (!fieldExist) {
    throw new Error(`No item matching this value ${val} in database`);
  }
};

//__CHECK_(By Val)_DISCOUNT < PRICE__//
export const isLower = (val, req) => {
  // console.log(val * 1 >= req.body.price * 1);
  if (val * 1 >= req.body.price * 1) {
    throw new Error(
      `discount (${val}) must be lower than the original price (${req.body.price})`
    );
  }
  // Indicates the success of this synchronous custom validator
  return true;
};

//__CHECK_PASSWORDS_MATCHING__//
export const isPasswordsMatches = (val, req) => {
  if (val !== req.body.password) {
    throw new Error(`Password confirmation does not match password`);
  }
  // Indicates the success of this synchronous custom validator
  return true;
};

//_CHECK_USER_REVIEWED_BEFORE_//
export const isReviewedBefore = async (val, Model, req) => {
  const reviewedBefore = await Model.findOne({
    user: req.user._id,
    product: val,
  });
  if (reviewedBefore) {
    throw new Error(`You can't add multiple reviews to the same product`);
  }
};

//_CHECK_OWNER_BEFORE_UPDATING_//
export const didYouOwner = async (val, Model, req) => {
  const reviewSelected = await Model.findById(val);
  if (!reviewSelected) {
    throw new Error(`No Reviews matches with this id: ${val}`);
  }
  if (reviewSelected.user._id.toString() !== req.user._id.toString()) {
    throw new Error("You are only allowed to update your reviews");
  }
};

//_CHECK_OWNER_OR_ADMIN_BEFORE_UPDATING_//
export const didYouOwnerOrAdmin = async (val, Model, req) => {
  // user can only delete his or her reviews, but admin can delete any review

  if (req.user.role === USER_ROLES.USER) {
    const reviewSelected = await Model.findById(val);
    console.log(req.user._id.toString());
    console.log(reviewSelected.user._id.toString());
    if (!reviewSelected) {
      throw new Error(`No Reviews matches with this id: ${val}`);
    }
    if (req.user._id.toString() !== reviewSelected.user._id.toString()) {
      throw new Error(`You are only allowed to delete your reviews`);
    }
  }
};
