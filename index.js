import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";


let data1 = "";
let data2 = "";
let dataArray = [{title:"Secrets Of Universe", text:"Hello world"}];
let dataId = 0;

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let entry = false;

app.use(express.json());

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

function loginDetails(req, res, next){
    let email = req.body["email"];
    let password = req.body["password"];

    if(email === "abhishek@gmail.com" && password === "12345"){
        entry = true;
    }else{
        entry = false;
    }

    next();
}

app.use(express.json());

app.use(loginDetails);

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/loginPage.html");
});


app.get("/home", (req, res)=>{
    res.render("home", {data:dataArray});
});

app.get("/about", (req, res)=>{
    res.render("about.ejs");
});

app.get("/contact", (req, res)=>{
    res.render("contact.ejs");
});

app.get("/create", (req, res)=>{
    res.sendFile(__dirname + "/views/create.html");
});

app.get("/read", (req, res)=>{
    res.render("read.ejs", {data:dataArray, id:dataId});
});

app.post('/your-api-endpoint', (req, res) => {
    const receivedData = req.body;
    // console.log('Received data:');
    data1 = receivedData["key1"];
    data2 = receivedData["key2"];

    // console.log(data1, data2)
    let someData = { title: data1, text: data2 };
    dataArray.push(someData);
    // console.log(dataArray);

    res.render("home", {data:dataArray});
   
  });

app.post("/read", (req, res)=>{
    const dataRecieved = req.body.i;
    dataId = dataRecieved;
});

app.post("/login", (req, res)=>{
    if(entry){
        res.render("home.ejs", {data:dataArray});
    }else{
        res.sendFile(__dirname + "/views/loginPage.html");
    }
});


app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
});

