/* eslint-disable no-undef */
const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting:", err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: [3, "Name must have at least 3 characters"],
    require: [true, "Why no name?"],
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-?\d{1,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
    minLength: [8, "Number must be at least 8 characters long"],
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("People", personSchema);
