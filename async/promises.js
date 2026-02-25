import fs from 'fs/promises';

//promise type
//  3 states 1. pending(Loading),  2.Reaolved(success),  3.Rejected(Error)
fs.readFile("data.txt","utf-8")
.then((data)=>{
   //success
   console.log(data);
}).catch((error)=>{
  //error
  console.log(error);
}).finally(()=>{
    console.log("This is final code")
})
fs.readFile("users.json", "utf-8")
.then((users)=>{
 console.log(users)
  return fs.readFile("posts.json","utf-8");
}).then((posts) => {
   console.log(posts);
    return fs.readFile("comment.json","utf-8");
}).then((comment)=>{
    console.log(comment);
})
.catch((error)=>{
    console.log(error);
});