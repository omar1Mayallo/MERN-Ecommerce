import mongoose from "mongoose";
import {USER_ROLES} from "../constants/index.js";
import bcrypt from "bcrypt";
import Review from "./reviewModel.js";

const {ADMIN, USER} = USER_ROLES;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Username is required"],
      minlength: [3, "Username minimum length 3 characters"],
      maxlength: [30, "Username maximum length 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password is too short"],
      maxlength: [25, "Password is too long"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      //only work in create ,save not update
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords don't match",
      },
      select: false,
    },
    passwordChangedAt: Date,
    role: {
      type: String,
      default: USER,
      enum: {
        values: [ADMIN, USER],
        message: `Role must be ${ADMIN} or ${USER}`,
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    image: {
      type: String,
      default: "default-user.jpg",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// _GET_ALL_USERS_EXCEPT_INACTIVE_USERS_[Query-Middleware]_//
userSchema.pre(/^find/, async function (next) {
  this.find({active: {$ne: false}});
  next();
});

// _PASSWORD_HASHING_[Document-Middleware]_//
userSchema.pre("save", async function (next) {
  // Only Run if password is modified
  if (!this.isModified("password")) return next();
  // HashingPassword
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field from database
  this.confirmPassword = undefined;
  next();
});

// _PASSWORD_CHANGED_AT_[Document-Middleware]_//
userSchema.pre("save", function (next) {
  // Only Run if password is modified or is new document
  if (!this.isModified("password") || this.isNew) return next();
  // passwordChangedAt field
  this.passwordChangedAt = Date.now();
  next();
});

// @NOTE Model middleware is supported for the following model functions. Don't confuse model middleware and document middleware: model middleware hooks into static functions on a Model class (used by model itself not the instances of the model), document middleware hooks into methods on a Model class (used by the instance or documents from the model). In model middleware functions, this refers to the model.
//_CHECK_IS_CORRECT_PASSWORD_[Instance-method]_//
userSchema.methods.isCorrectPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

//_CHECK_IS_PASSWORD_CHANGED_AFTER_JWT_CREATED_[Instance-method]_//
userSchema.methods.isPasswordChangedAfterJwtIat = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    // console.log(passwordChangedTimestamp + " - " + jwtTimestamp);

    // password changed
    return passwordChangedTimestamp > jwtTimestamp;
  }
  // password not changed
  return false;
};

/*(VIP)_DOCUMENT_MIDDLEWARES_STACK_IN_MONGOOSE_[https://stackoverflow.com/questions/49768723/when-exactly-does-mongooses-preinit-get-called]*/

//SET_FULL_IMAGE_URL ex: http://127.0.0.1:5000/users/user-(1).jpg
// @desc We save just name of image in the database (user-(1).jpg), we need to get full link url to the image to access it in the frontend, so here we need to put the base url (http://127.0.0.1:5000) of the server before we do read, update and create
const setFullImageUrl = (doc) => {
  //check if image is already has a url
  if (doc.image && doc.image.startsWith("http")) return;
  //check if image is a default-user-image
  if (doc.image && doc.image === "default-user.jpg") {
    const fullImgUrl = `${process.env.BASE_URL}/users/default-user.jpg`;
    doc.image = fullImgUrl;
  } else {
    const fullImgUrl = `${process.env.BASE_URL}/users/${doc.image}`;
    doc.image = fullImgUrl;
  }
};
//1)FOR_create_save
userSchema.post("save", function (doc) {
  setFullImageUrl(doc);
});
//2)FOR_findOne_findAll-findByIdAndUpdate
userSchema.post("init", function (doc) {
  setFullImageUrl(doc);
});

// _DELETE_USER_REVIEWS_WHEN_THIS_USER_DELETED__[Document-Middleware]_//
userSchema.post("remove", async function (doc, next) {
  await Review.deleteMany({user: doc._id});
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
