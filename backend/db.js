const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/"

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/admin');
//   await mongoose.connect('mongodb://localhost:27017/');
  console.log('connected successfully');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// const connectToMongo = async()=>{
//     try{ 
//         mongoose.connect(mongoURI);
//         console.log('Connected Successfully');
// }catch(err){
//     console.log(err);
//     console.log('Error');
// }
// }
module.exports = main;