import fs from "fs/promises";

async function getData(){
 try {
    const users=  await fs.readFile("users.json","utf-8");
     console.log(users)
 const posts=  await fs.readFile("posts.json","utf-8");
  console.log(posts)
 const comments=  await fs.readFile("comment.json","utf-8");
 console.log(comments)
 } catch (error) {
    console.log(error);
 }
} 
getData();
