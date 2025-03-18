const http = require("http");
const routes = require("./routes");

routes.testFunction();

const app = http.createServer(routes.requestHandler);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App is listen ${PORT}`);
})



