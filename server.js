var  express=require("express")
var path=require("path");

var  cors=require("cors")
var  bodyParser=require("body-parser")
var  app=express()
var  mongoose=require("mongoose")

var port = process.env.PORT || 3500

app.use(bodyParser.json())

app.use(cors())
app.use("/",express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:false}))

const mongoURI='mongodb+srv://prakashuser:nZP8kwqWQAnfBHEW@prakash-clst-sw9cv.mongodb.net/meanloginreg?retryWrites=true&w=majority'

mongoose.connect(mongoURI, {useNewUrlParser:true}).then(()=> console.log("MongoDb connected")).catch(err=> console.log(err))

var Users= require('./routes/Users')

app.use('/users',Users);
app.get('/',(req,res)=>{
    console.log("__dirname");
    res.sendFile(path.join(__dirname,"public","index.html"));
})


app.listen(port, function(){
    console.log("server is running on port:" +port)
})