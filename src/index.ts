const name:String = "Abhesh Mandal";
console.log(name);
const data:any = {
    name: "Abhesh Mandal",
    age: 25,
    city: "Kolkata"
}
console.log(data);
const phone:number| string = "1234567890";
console.log(phone);
const role: "admin" | "user" | "guest" = "admin";
console.log(role);
function sum(a: number, b: number): number {
    return a + b;
    
}
console.log(sum(5, 10));
// function 
const greet = (name: string): string => {
    return `Hello, ${name}!`;
}
console.log(greet("Abhesh"));
 const getUser = async(): Promise<string> => {
    return "Abhesh Mandal";
}
//getUser().then(user => console.log(user));

// interface
interface User {
    name: string;
    age: number;
    city: string;
    email?: string;
    roles:string[];
}

const user1: User = {
    name: "Abhesh Mandal",
    age: 25,
    city: "Kolkata",
    email: "abhesh.mandal@example.com",
    roles: ["user"]
};
const user2: User = {
    name: "Ram",
    age: 30,
    city: "Delhi",
    roles: ["admin", "user"]
};
console.log(user1);
console.log(user2);

type Address = {
    street: string;
    city: string;
    country: string;
}
const address2:Address = {
    street: "123 Main St",
    city: "Kolkata",
    country: "India"
}
console.log(address2);