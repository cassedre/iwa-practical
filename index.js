const express = require("express"), //Allows to respond to http request, defines routing and renders the required content
fs = require("fs"), //working with file system (read and write)
http = require("http"), //http service
path = require("path"), //utility that allows to work with directory
xml2js = require ("xml2js"), //xml to json converter
xmlParse = require("xslt-processor").xmlParse, //Parsing xml
xsltProcess = require("xslt-processor").xsltProcess;  //processing xslt


const router = express(), //instantiating Express
        server = http.createServer(router);

        router.use(express.static(path.resolve(__dirname,'views'))); //serving static

        router.get('/', function(req,res){
            
            res.writeHead(200,{'Content-type' : 'text/html'}); //tell the user that the resource existe and which type it that.
            let xml = fs.readFileSync('PaddysCafe.xml','utf8'), //read the xml file
            xsl = fs.readFileSync('PaddysCafe.xsl','utf8'); //read in the xsl file

            console.log(xml);
            console.log(xsl)

            let doc = xmlParse(xml), //parse the xml file
            stylesheet = xmlParse(xsl); //parse the xsl file

            let result = xsltProcess(doc, stylesheet); //performing xslt
 
            console.log(result);

            res.end(result.toString());

            console.log(result.toString());



        });

        server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0",function(){
            const addr = server.address();
            console.log ('Server Listening at', addr.address + ';' +addr.port)


        });