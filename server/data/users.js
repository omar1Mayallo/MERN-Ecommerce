import bcrypt from "bcrypt";

const users = [
  {
    username: "Leanne Graham",
    email: "Sincere@april.biz",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(1).png",
    role: "admin",
  },
  {
    username: "Ervin Howell",
    email: "Shanna@melissa.tv",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(2).jpg",
    role: "admin",
  },
  {
    username: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(3).jpg",
  },
  {
    username: "Patricia Lebsack",
    email: "Julianne.OConner@kory.org",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(4).jpg",
  },
  {
    _id: "63df618eaa24dd7529ad834c",
    username: "Chelsey Dietrich",
    email: "Lucio_Hettinger@annie.ca",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(5).jpg",
  },
  {
    _id: "63df618eaa24dd7529ad834e",
    username: "Mrs. Dennis Schulist",
    email: "Karley_Dach@jasper.info",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(6).jpg",
  },
  {
    _id: "63df618eaa24dd7529ad834f",
    username: "Kurtis Weissnat",
    email: "Telly.Hoeger@billy.biz",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(7).jpg",
  },
  {
    _id: "63df618eaa24dd7529ad8350",
    username: "Nicholas Runolfsdottir V",
    email: "Sherwood@rosamond.me",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(8).jpg",
  },
  {
    _id: "63df618eaa24dd7529ad8351",
    username: "Glenna Reichert",
    email: "Chaim_McDermott@dana.io",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(9).webp",
  },
  {
    _id: "63df618eaa24dd7529ad8352",
    username: "Clementina DuBuque",
    email: "Rey.Padberg@karina.biz",
    password: bcrypt.hashSync("123456789", 12),
    image: "user-(10).jpg",
  },
];
export default users;
