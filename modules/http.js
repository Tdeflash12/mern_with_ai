import http from 'http';

const app = http.createServer((request,response)=>{
    console.log(request.method)
    const data = {
        version:"01.31",
        name:"Mern Stack",
        staatus:"OK",
    };
    response.writeHead(200,{"content-type":"application/json"});
    response.end(JSON.stringify(data))
});
app.listen(5001,()=>{
    console.log("Server running at port 5001");
}) ;