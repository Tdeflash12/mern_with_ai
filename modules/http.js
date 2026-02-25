import http from 'http';
import { url } from 'inspector';

const app = http.createServer((request,response)=>{
    console.log(request.method)
   console.log(request.url)

   if(request.url === "/"){
    response.writeHead(200,{ "content-type":"text/html"});
    response.end("<h1>HOME PAGE</h1>")
   }else if(request.url==="/about"){
    response.writeHead(200,{"content-type":"text/html"});
    response.end("<h1>ABOUT PAGE</h1>")
   }else{
     response.writeHead(404,{"content-type":"text/html"});
    response.end("<h1>pahe not found</h1>")
   }
     
});
app.listen(5001,()=>{
    console.log("Server running at port 5001");
}) ;