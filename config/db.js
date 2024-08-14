const mongoose = require("mongoose");

module.exports = () => {
  const dbUrl = process.env.URL;
  const dbName = process.env.DBNAME;
  const dbUser = process.env.USERNAME;
  const dbPass = process.env.PASSWORD;

  console.log(`Connecting to MongoDB at ${dbUrl} with DB name ${dbName}`);

  mongoose.connect(dbUrl, {
    dbName: dbName,
    user: dbUser,
    pass: dbPass,
  }).then(() => {
    console.log("DB Connection established successfully");
  }).catch((error) => {
    console.log("DB Connection error: ", error);
  });
};
