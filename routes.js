const fs = require("fs");

const requestHandler = (req,res) => {
    if (req.url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(`
        <form action='/message' method="POST">
            <label>UserName</label>
            <input type="text" name="userName"></input>
            <button type="submit">Add</button>
        </form>
        `)
    }
    else if(req.url=='/message'){
        let body=[];
        req.on("data", (chunk) => {
            body.push(chunk);
        })

        req.on("end", () => {
        let bufferData= Buffer.concat(body);
        let data= bufferData.toString().split("=")[1];
        console.log(data);
        fs.writeFile('textFile.txt',data, (err) => {
            if(err){
                console.log("Got error in writting in file");
            }
            else {
                res.statusCode=302;
                res.setHeader('Location', '/');
                res.end();
            }
        })
        })
        
    }
    else {
        if(req.url=='/read') {
            fs.readFile("textFile.txt", (err,data) => {
                res.end(`<h1>${data.toString()}</h1>`);
            })
        }
    }
}

const testFunction = () => {
    console.log("Hello from other function")
}

// module.exports = requestHandler;

module.exports = {
    requestHandler,
    testFunction
}