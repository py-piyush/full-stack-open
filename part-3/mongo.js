const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Usage: node mongo.js <password>\n node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.suyltof.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const people = mongoose.model("People", personSchema);

if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");
      const person = new people({
        name: process.argv[3],
        number: process.argv[4],
      });
      return person.save();
    })
    .then(() => {
      console.log(
        `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
      );
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
} else {
  mongoose.connect(url).then(() => {
    console.log("connected");
    console.log(`phonebook:`);
    people.find({}).then((result) => {
      result.forEach((p) => {
        console.log(p.name, p.number);
      });
      mongoose.connection.close();
    });
  });
}
