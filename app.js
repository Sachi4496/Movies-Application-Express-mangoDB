const express = require("express");

const mongoose = require("mongoose");



const connect = () => {
    // return mongoose.connect("mongodb://127.0.0.1:27017/test");
    return mongoose.connect("mongodb+srv://sachida44:sachida44@cluster0.xiqh3.mongodb.net/test");
};

const app = express();

app.use(express.json());

// "_id" : ObjectId("61a275eed7e015bc105b0420"), "movie_name" : "1969", 
// "movie_genre" : "Drama|War", "production_year" : "1/12/2021", "budget" : 9303

const movieSchema = new mongoose.Schema({
    id:{ type: Number, required: false },
    movie_name:{ type: String, required:true },
    movie_genre:{ type:String, required:true },
    production_year:{ type:String, required:false, default:"20/10/2020" },
    budget:{ type:Number, required: true } 
},{
    versionKey: false,
    timestamps: true
});


const movie = mongoose.model("movie", movieSchema);

app.get("/movies", async (req, res) => {

    try {

        const movies = await movie.find().lean().exec(); 
        res.status(201).send({movies})

    }catch(e) {
        res.status(500).json({message: e.message, status: "Failed"});
    }
})

app.post("/movies", async (req, res) => {
    try{
        const movies = await movie.create(req.body)
        res.status(201).send(movies)
    }catch(e) {
        res.status(500).json({message: e.message, status: "Failed"})
    }
})

app.get("/movies/:id", async (req, res) => {

    try{

        const movies = await movie.findById(req.params.id).lean().exec()
        res.send(movies)

    }catch(e) {
        res.status(500).json({message: e.message, status: "Failed"})
    }

})

app.patch("/movies/:id" , async (req, res) => {

    try{

        const movies = await movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec()
       return res.status(201).send(movies)

    }catch(e) {
      return  res.status(500).json({message: e.message, status: "Failed"})
    }

})

app.delete("/movies/:id" , async (req, res) => {

    try{

        const movies = await movie.findByIdAndDelete(req.params.id).lean().exec()
        res.status(201).send(movies)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }

})

app.listen(2345, async function () {
    await connect();
    console.log("post is listening 2345");
})