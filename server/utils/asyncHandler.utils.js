// asyncHandler is a function to catch error that result from func
// func is an async function (mean promise)
// if async func (promise) _rejected_ we catch error from it and pass error to Global Error middleware by next function
const asyncHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};
export default asyncHandler;
