import Cart from "../model/cartModel.js";
import Coupon from "../model/couponModel.js";
import Product from "../model/productModel.js";
import APIError from "../utils/apiError.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

//_CALCULATE_TOTAL_CART_PRICE_//
export const calcCartTotalPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterCouponDiscount = undefined;
};

// @desc    Get Logged User Cart
// @route   GET /api/cart
// @access  Protected
export const getMyCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({user: req.user._id}).populate({
    path: "cartItems.product",
    select: "name image quantityInStock -category -subcategories",
  });
  if (!cart) {
    return next(new APIError("There is no cart match this user", 404));
  }
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Add Product To Cart
// @route   PATCH /api/cart
// @access  Protected
export const addToCart = asyncHandler(async (req, res, next) => {
  const {productId, size, color, quantity} = req.body;
  // 1) Check if product is existing
  const product = await Product.findById(productId);
  if (!product) {
    return next(
      new APIError(`There is no product match this id : ${productId} `, 404)
    );
  }

  // CHECK the req.body.color is exist product.colors array
  if (color && !product.colors.includes(color)) {
    return next(
      new APIError(`Product colors don't include this color entered`, 400)
    );
  }
  // CHECK the req.body.size is exist product.size array
  if (size && !product.size.includes(size)) {
    return next(
      new APIError(`Product sizes don't include this size entered`, 400)
    );
  }
  // CHECK the req.body.quantity is lower than product.quantityInStock
  if (quantity && quantity > product.quantityInStock) {
    return next(
      new APIError(
        `Quantity entered is more than this product quantity in stock`,
        400
      )
    );
  }
  // Calc Price With Discount
  const priceWithDiscount = product.discount
    ? product.price - product.discount
    : product.price;
  // 2) Select the user cart
  let cart = await Cart.findOne({user: req.user._id});
  // console.log(cart);
  // 3) There us 2 scenario

  // a) If cart is not exist, create a new one
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        {product: productId, price: priceWithDiscount, size, color, quantity},
      ],
    });
  } // b) If cart is already exist, there is 2 scenario
  else {
    // b)[1] product is not exist in cartItems, push to cartItems
    const productIdxInCart = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.color === color &&
        item.size === size
    );
    // console.log(productIdxInCart);
    // findIndex -1 result mean product is not exist in cartItems
    if (productIdxInCart === -1) {
      cart.cartItems.push({
        product: productId,
        price: priceWithDiscount,
        size,
        color,
        quantity,
      });
    } // b)[2] product is already exist in cartItems, item.quantity+1
    else {
      const cartItem = cart.cartItems[productIdxInCart];
      // console.log(product.quantityInStock);
      if (cartItem.quantity < product.quantityInStock) {
        cartItem.quantity += 1;
        cart.cartItems[productIdxInCart] = cartItem;
      }
    }
  }
  calcCartTotalPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added successfully to cart",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Remove Product From Cart
// @route   PATCH /api/cart/:productId
// @access  Protected
export const removeFromCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    {user: req.user._id},
    {
      $pull: {cartItems: {_id: req.params.productId}},
    },
    {new: true}
  );

  calcCartTotalPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Update CarItem Quantity
// @route   PATCH /api/cart/:productId
// @access  Protected
export const updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const {quantity} = req.body;
  const {productId} = req.params;
  const cart = await Cart.findOne({user: req.user._id});
  if (!cart) {
    return next(new APIError("There is no cart match this user", 404));
  }

  if (!quantity) {
    return next(new APIError(`Please enter a quantity`, 400));
  }
  // console.log(cart.cartItems);

  const productIdxInCart = cart.cartItems.findIndex(
    (item) => item._id.toString() === productId
  );

  // console.log(productIdxInCart);
  // if product exist in cartItems
  if (productIdxInCart > -1) {
    const cartItem = cart.cartItems[productIdxInCart];
    cartItem.quantity = quantity;
    cart.cartItems[productIdxInCart] = cartItem;
  } //if product not exist in cartItems
  else {
    return next(
      new APIError(
        `there is no cart item match this id :${req.params.productId} in your cart`,
        404
      )
    );
  }
  calcCartTotalPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Clear All CartItems
// @route   DELETE /api/cart
// @access  Protected
export const clearCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({user: req.user._id});
  cart.cartItems = [];
  calcCartTotalPrice(cart);
  await cart.save();
  res.status(204).json({status: "success"});
});

// @desc    Apply Coupon Discount On Cart
// @route   PATCH /api/cart/apply-coupon
// @access  Protected
export const applyCoupon = asyncHandler(async (req, res, next) => {
  const {couponCode, productId} = req.body;
  // Check Coupon code is valid and not expired
  const coupon = await Coupon.findOne({
    name: couponCode,
    product: productId,
    expire: {$gt: Date.now()},
  });
  if (!coupon) {
    return next(new APIError("Invalid or expired coupon", 404));
  }

  // Get user cart
  const cart = await Cart.findOne({user: req.user._id});

  // Calc Total Price before discount
  calcCartTotalPrice(cart);

  const cartItemIdx = cart.cartItems.findIndex(
    (item) => item.product.toString() === productId
  );
  if (cartItemIdx === -1) {
    return next(
      new APIError("Product with this id is not exist on your cart", 404)
    );
  }
  const cartItemWillDiscount = cart.cartItems[cartItemIdx];
  const cartWithDiscount = cart.cartItems.map((item) => {
    if (item === cartItemWillDiscount) {
      return {
        ...item._doc,
        price: item.price - (item.price * (coupon.discount / 100)).toFixed(2),
      };
    } else {
      return item;
    }
  });

  // Calc Total Price after discount

  let totalPriceAfterDisc = 0;
  cartWithDiscount.forEach((item) => {
    totalPriceAfterDisc += item.price * item.quantity;
  });
  cart.totalPriceAfterCouponDiscount = totalPriceAfterDisc;
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
