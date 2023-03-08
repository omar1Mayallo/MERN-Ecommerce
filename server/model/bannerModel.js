import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Banner must be image"],
    },
  },
  {timestamps: true}
);
//_SET_FULL_IMAGE_URL_//
const setFullImageUrl = (doc) => {
  //check if image is already has a url
  if (doc.image && doc.image.startsWith("http")) {
    return;
  } else {
    const fullImgUrl = `${process.env.BASE_URL}/banners/${doc.image}`;
    doc.image = fullImgUrl;
  }
};
//1)FOR_create_save
bannerSchema.post("save", function (doc) {
  setFullImageUrl(doc);
});
//2)FOR_findOne_findAll-findByIdAndUpdate
bannerSchema.post("init", function (doc) {
  setFullImageUrl(doc);
});

const Banner = mongoose.model("Banner", bannerSchema);

export default Banner;
