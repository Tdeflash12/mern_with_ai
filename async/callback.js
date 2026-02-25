//callback-- that is used as paramemter
//Geneally used in async program;
//High Order Function --> function that accepts function as parameter

import fs from "fs"
fs.readFile("data.txt","utf-8",(error,data)=>{
  if(error)
    return error;
  
    console.log(data);

});
     

