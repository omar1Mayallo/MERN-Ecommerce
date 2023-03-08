import {MdStarBorder, MdStar} from "react-icons/md";

//GENERATE_STARS_SETTINGS
let starsSettings = [];
for (let index = 5; index >= 1; index--) {
  const setting = {
    size: 23,
    value: index,
    isHalf: false,
    emptyIcon: <MdStarBorder />,
    filledIcon: <MdStar />,
    edit: false,
  };
  starsSettings.push(setting);
}
export {starsSettings};
