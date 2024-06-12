### Here are the sample code to setup all the data DB and Express call syntax

#### v-  1.3
```
const express = require("express")
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./mock_data.json");
const { type } = require("os");
const PORT = 8000;

// Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    job_title: {
        type: String,
    }
}, { timestamps: true })

const User = mongoose.model("user", userSchema);

//connection

mongoose.connect('mongodb://127.0.0.1:27017/demo-data').then(() => console.log("DB connected")).catch((err) => console.log(err))


const app = express();
// This is to send HTML to browser
app.get("/user", async (req, res) => {

    const allUsers = await User.find({})
    const html = `
        <ul>
          ${allUsers.map((user) => `<li style = "background:red">${user.first_name}</li>`)}
        </ul>`
    res.send(html);
})



// middleware

app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    return res.send("Hello from Home");
})
app.get("/api/user",async (req, res) => {
    const allUsers = await User.find({})
    return res.json(allUsers);
})
app.get("/api/user/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return res.json(user);
})


app.post("/api/user", async (req, res) => {
    const body = req.body;
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        job_title: body.job_title
    })
    console.log(result)
    return res.status(201).json({ msg: "success" })
})
app.delete("/api/user/:id", async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id)
    const user = users.filter((user) => req.body.id != user.id)
    return res.json({ status: "success", massage: `Removed user with ID : ${id}` });
})
app.patch("/api/user/:id",async (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    await User.findByIdAndUpdate(id, {first_name:req.body.first_name,last_name:req.body.last_name})
    return res.json({ status: "success", massage: `Updated user with ID : ${id}` });
})



app.listen(PORT, () => console.log("server Started"))

```
