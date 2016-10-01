var http = require('http'); //include http module
var fs = require('fs'); //include file server module
var path = require('path'); //include path module

var hostname = 'localhost'; //host name
var port = 3000; //portno

//createSerever is a function defined in http module which accepts another 
//function passed with its args with request and response as two parameters.
var server = http.createServer(function(req, res){
  console.log('Request for ' + req.url + ' by method ' + req.method); //write log
  if (req.method == 'GET') 
  {
    var fileUrl;
        if (req.url == '/') 
            fileUrl = '/index.html';
        else 
            fileUrl = req.url;
    var filePath = path.resolve('./public'+fileUrl);
    var fileExt = path.extname(filePath);
    if (fileExt == '.html') 
    {
       fs.exists(filePath, function(exists) 
        {
          if (!exists) 
          {
        	   res.writeHead(404, { 'Content-Type': 'text/html' });
        	   res.end('<html><body><h1>Error 404: ' + fileUrl + ' not found</h1></body></html>');
        	   return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          fs.createReadStream(filePath).pipe(res);
        });
    }
    else 
    {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Error 404: ' + fileUrl + ' not a HTML file</h1></body></html>');
    }
  }
  else 
  {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Error 404: ' + req.method + ' not supported</h1></body></html>');
  }
})

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});