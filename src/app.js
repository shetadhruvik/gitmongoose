const mongoose = require("mongoose");
const validator = require('validator');
//connection creating and creating a new DB
mongoose
  .connect("mongodb://localhost:27017/DDatabase")
  .then(() => {
    console.log("connection okay");
  })
  .catch((err) => {
    console.log(err);
  });

//created schema for validation
const sschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    // lowercase:true,           //lowercase, minlenght, maxlenght, ... are validators
    // minlenght:true,
    // maxlenght:true       
  },
  class: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  rstatus: Boolean,
  pname: String,
});

//collection creation
const Sdata = new mongoose.model("Sdata", sschema);

//create document
const cdocument = async () => {
  try {
    const dhruvikSdata = {
      name: "Dhruvik",
      class: 11,
      rstatus: true,
      pname: "Ghanshyambhai",
    };
    const parthSdata = {
      name: "Parth",
      class: 8,
      rstatus: true,
      pname: "Ghanshyambhai",
    };
    const chiragSdata = {
      name: "Chirag",
      class: 11,
      rstatus: true,
      pname: "Rameshbhai",
    };
    const pinalSdata = {
      name: "Pinal",
      class: 13,
      rstatus: true,
      pname: "Dineshbhai",
    };
    // for inserting more than one documents at a time
    const result = await Sdata.insertMany([
      dhruvikSdata,
      parthSdata,
      chiragSdata,
      pinalSdata,
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// cdocument();

//for read documets
const getdocuments = async () => {
  try {
    const result = await Sdata.find(
      { pname: "Ghanshyambhai" },
      { _id: 0, pname: 1 }
    ); //mongo read query
    // console.log(result);

    const result2 = await Sdata.find({ class: { $gte: 10 } }, { name: 1 });
    // console.log(result2);

    //conditional operator
    const result3 = await Sdata.find(
      { name: { $in: ["Parth", "Dhruvik"] } },
      { name: 1 }
    );
    // console.log(result3);

    //logical operator
    const result4 = await Sdata.find({
      $and: [{ name: "Chirag" }, { pname: "Rameshbhai" }],
    });
    // console.log(result4);

    // count method will show numbers that match condition
    const result5 = await Sdata.find({
      $and: [{ name: "Chirag" }, { pname: "Rameshbhai" }],
    }).countDocuments();
    // console.log(result5);

    //Sort method
    const result6 = await Sdata.find({ rstatus: true }, { name: 1 }).sort({
      name: 1,
    });
    console.log(result6);
  } catch (err) {
    console.log(err);
  }
};
// getdocuments();

//update document
const updatedocument = async () => {
  try {
    const result = await Sdata.findOneAndUpdate(
      { _id: "637dc6e671787bffcf107c2f" },
      {
        $set: { name: "Hiren", class: 15 },
      },
      { new: true }
    ); //new:true will return after update value if we are not using it will return before updating value
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
// updatedocument();

//delete document
const deletedocument = async () => {
  try {
    const result = await Sdata.findAndDeleteMany({
      _id: { $in: ["637effe6eddb7e199503521c", "637effefeddb7e199503521d"] },
    });
    console.log(result); //will return deleted data
  } catch (err) {
    console.log(err);
  }
};
// deletedocument();
