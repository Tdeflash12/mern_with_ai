// /*
// 1. Template literals
// */

// const { use } = require("react");

// const name = "Ram";
// const age =20;
// const address ="Banglore";
// // Hello my name is <name>. I am <age> years old.I live in <address>
// const result = "Hello my name is"
// +name+ 
//   "and i am "+age+ 
//   "years old i live in "+address;
//   console.log(result);
//   // Template litetals;
//   const result2 =`hello my name is${name} 
//   and i am ${age} years old 
//   and I live in ${address}`
//   console.log(result2)

//   //1. Object destructing;
//   const course={
//     title:"Mern Stack",
//     duration : "3 months",
//     price:250,
//   };
//   //const CourseTitle = course.title
//   const {title:CourseTitle,duration,price} = course;
//   console.log(CourseTitle)
//   console.log(price) 
//   console.log(duration)


//   //2. Array Destructing;
// const arr =["Ithari",49839839,"Grade A"];
// console.log(arr[1]);

// //react Usestate
// const[myAdress,myNumber,myvalue]= arr;
//   console.log(myNumber);
// console.log(myAdress);
// console.log(myvalue);

//spread operator (...)
// to copy data
const profile ={
  name:"Abhesh",
  age:18,
  addresss:"Biratnagar",
};

const user ={
  email:"abheshmandal249@gmail.com", 
  password:2232232,
};
const userData={
  ...profile,
  ...user,
};
console.log(userData);

list1=[12,43,6,56,76,8,9,89]
list2=[323,24,4,24,24,4,24,24]
console.log(...list1,...list2)

const myObject={
  title:"Mern Stack",
   duration : "3 months",
  price:250,
  name:"Abhesh",
  age:18,
  addresss:"Biratnagar",
};
// combine destructing nad spread operator
const{name:myName,title,...restObject}= myObject;  
console.log(restObject);


//Arrow function
// function hello(name){
//   console.log("hello"+name)
// }
const hello =(name) =>{
  console.log("Hello  "+ name)
};
hello("Ram");
hello("Hari")
function sum(a,b){
  sum=a+b;
  console.log(sum)
};
sum(3,4);

const add =(a,b)=> a+b;
  console.log(add(5,6));

//Anonymous Function
//function() {}
()=>{} //anonymous function arrow function
console.log("array methods start here===========.")

//Array methods
const datalist1=[12,43,6,56,76,8,9,89]
for(let i=0;i<datalist1.length;i++){
  console.log(datalist1[i]) 
}
console.log("===========.")

for( const mydata of datalist1){
  console.log(mydata)
}

