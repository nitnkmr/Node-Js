
const express = require("express")
const fs = require("fs");
const server = require("http")
const users = require("./mock_data.json");
const PORT = 8000;

const app = express();
// This is to send HTML to browser
app.get("/user",(req,res)=>{
        const html = `
        <ul>
          ${users.map((user)=>`<li style = "background:red">${user.first_name}</li>`)}
        </ul>`
         res.send(html);
    })



    // middleware

    app.use(express.urlencoded({extended:false}))

        app.get("/",(req,res)=>{
            return res.send("Hello from Home");
        })
app.get("/api/user",(req,res)=>{
    return res.json(users);
})
app.get("/api/user/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id===id)
    return res.json(user);
})


app.post("/api/user",(req,res)=>{
    console.log(req.body);
    users.push({...req.body, id:users.length+1});
    fs.writeFile("./mock_data.json", JSON.stringify(users), (err,data)=>{
        return res.json({status:"success", id:users.length});
    })
})
app.patch("/api/user",(req,res)=>{
    console.log(req.body);
    const user = users.filter((user)=>req.body.id != user.id)
    fs.writeFile("./mock_data.json", JSON.stringify(user), (err,data)=>{
        return res.json({status:"success", massage:`Removed user with ID : ${req.body.id}`});
    })
    // return res.json({status:"failed", id:req.body.id})
})



app.listen(PORT, ()=>console.log("server Started"))


