const mongoose = require("mongoose");

mongoose
  .connect("mongodb://Localhost:27017/pdatabase")
  .then(() => {
    console.log("connection okay");
  })
  .catch((err) => {
    console.log(err);
  });

const Sschema = new mongoose.Schema({
  name: String,
  fname: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
  num: Number,
});

const Pdata = new mongoose.model("Pdata", Sschema);

const createdata = async () => {
  try {
    const parthdata = new Pdata({
      name: "Parth",
      fname: "adhiuhs",
      num: 9712568362,
    });
   const precord = await parthdata.save();
   console.log(precord);
  } catch (err) {
    console.log(err);
  }
};
createdata();

