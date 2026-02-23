 import path from "path"
 import url from "url";
 const filePath = "codeit/courses/mern/day1/video.mp4";

 //baseName()--->Filename
 console.log(path.basename(filePath ));

 //dirname()-->
 console.log(path.dirname(filePath));

 //extname
 console.log(path.extname(filePath));

 // parse 
 console.log(path.parse(filePath));

 const _filename= url.fileURLToPath(import.meta.url);
 const _dirname=path.dirname(_filename)
 console.log(_filename );
 console.log(_dirname );
