const express = require("express");
const con= require('./database');

const app= express();

app.use(express.json())

app.listen(3000, () =>{
    console.log('Server running of 3000');
});


app.get("/longestdurationmovies", (req, res) => {

    con.query("SELECT  tconst, primaryTitle, runtimeMinutes ,genres FROM movie WHERE runtimeMinutes IN (SELECT (runtimeMinutes) FROM movie) ORDER BY runtimeMinutes DESC LIMIT 10;",(err,result)=>{
        if(err)
        {
            res.send("error")
        }

        else{
            res.send(result)
            
        }
    })
  });

  app.post("/newmovie",(req,res)=>{
        const data=req.body;
        con.query("INSERT INTO movie SET?",data,(err,result)=>{
            if(err)
            {
                res.send("error")
            }
            else{
                res.send(result)
                console.log("success")
            }
        })
  });


  app.get("/topratedmovies", (req, res) => {
    con.query("SELECT  tconst, primaryTitle, genres ,averageRating, AVG(averageRating)>6.0 FROM movie LEFT JOIN rating USING (tconst) GROUP BY averageRating HAVING AVG(averageRating) >= 6.0 ORDER BY AVG(averageRating) ASC;",(err,result)=>{
        if(err)
        {
            res.send("error")
        }

        else{
            res.send(result)
            console.log(result)
        }
    })
  });
