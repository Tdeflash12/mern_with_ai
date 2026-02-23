import { error } from "console";
import fs from "fs";

// Synchronously
//READ
// const result =fs.readFileSync("data.txt","utf-8");
// console.log(result)

// const result1=fs.readFileSync("screenshot.png","base64");
// console.log(result1)

//WRITE
//fs.writeFileSync("myFile.txt","Abhesh Mandal");

//UPDATE
//fs.appendFileSync("myFile.txt","This text in newly appended")

//DELETE
//unlink -- remove only the file
//fs.unlinkSync("myFile.txt");

//rm(rmsync,rmdirSync) ---remove file and folder
//fs.rmdirSync("test");

// Asynchronously
// fs.readFile("data.txt","utf-8",(error,data)=>{
//     if(error){
//         console.log(error)
//         return;
//     }
//     console.log(data);
// });
// console.log("hello world");
// fs.writeFile("Abhesh.txt","Abhesh Mandal",(error,data)=>{
//     if(error){
//         console.log(error)
//         return;
//     }
//     console.log("file has been successfully written");
// });

// fs.appendFile("Abhesh.txt","\nFrom nepal",(error,data)=>{
//     if(error){
//         console.log(error)
//         return;
//     }
//     console.log("file has been successfully appended");
// });

// fs.rm("Abhesh.txt",(error,data)=>{
//     if(error){
//         console.log(error)
//         return;
//     }
//  console.log("file has been deleted Successfully");
// });



