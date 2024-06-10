
const express = require("express")
const server = require("http")
const users = require("./mock_data.json");
const PORT = 8000;
const app = express();
// This is to send HTML to browser
// app.get("/user",(req,res)=>{
    //     const html = `
    //     <ul>
    //       ${users.map((user)=>`<li style = "background:red">${user.first_name}</li>`)}
    //     </ul>`
    //      res.send(html);
    // })
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


app.listen(PORT, ()=>console.log("server Started"))


