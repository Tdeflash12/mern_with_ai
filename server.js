import http from "http"
const server =http.createServer((request,response) => {
    response.end("Hello World");
});
server.listen(5001,()=>{
    console.log("Server running at port 5001")
});  