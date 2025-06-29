/*
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const PORT  = 3000;

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const MONGO_URL = 'mongodb://localhost:27017/Expenses-DB2';

mongoose.connect(MONGO_URL)
.then(()=>console.log("MONGO DB CONNECTING......"))
.catch(()=>console.log("ERROR cONNECTING!!!"))

const userSchema = mongoose.Schema(
    {
        name:{type:String,required:true},
        password:{type:String,required:true}
    });

const User = mongoose.model('User',userSchema);

app.post('/expense',async(req,res)=>{
    try{
    const {name,password} = req.body;
    const userdetails = new User({name,password})
    await userdetails.save()
    res.status(201).json({ message: 'User added successfully!', user: userdetails });
}
    catch(err){
        console.log("ERROR IN ADDING")
    }
})

app.get('/expense',async(req,res)=>{
    try{
    const userdetails = await User.find();
    res.json(userdetails);
    }
    catch(err){
        console.log("ERROR FETCHING USE DETAILS");
        res.status(500).json({error:"FAILED to FETCH THE DETAILS "})
    }
})

app.put('/expense/:id',async(req,res)=>{
try{
    const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    if(!updateUser){
        console.log("ERROR UPDATING USER DETAILS")
        return res.status(404).json(error,"Expense not found")
    }
    res.json(updateUser);

}
catch(err){
    console.log(err,"ERROR UPDATING FILES")
}
})

app.delete('/expense/:id',async(req,res)=>{
  try{
    const deleteUser = await User.findByIdAndDelete(
        req.params.id
    )
    if(!deleteUser){
        console.log("ERROR DELTING USER DETAILS")
        res.status(404).json({error:"ERROR IN FETCHING DETAILS"})
    }
    res.json(deleteUser)

  }
  catch(err){
    console.log(err,"ERROR IN DELTINF>>>>>>>>>>>>>>>")
  }
})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = 'mongodb://localhost:27017/studentDB';

mongoose.connect(MONGO_URI)
    .then(()=>console.log("Mongo DB Connected"))
    .catch(err=>console.log("Error connecting ",err));

const expSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    dept: { type: String, required: true },
    course:{ type: String, required: true }
});

const Exp = mongoose.model('Exp', expSchema);

app.get('/student', async (req, res) => {
    try {
        const exp = await Exp.find();
        res.json(exp);
    }
    catch (err) {
        console.error("Get method Error");
    }
});

app.post('/student', async (req, res) => {
    try {
        const { title, amount } = req.body;
        const expense = new Exp({ title, amount });
        await expense.save();
        res.status(201).json(expense);
    }
    catch (error) {
        res.status(404).json("error")
        console.log("Post method failure");
    }
});

app.put('/student/:id', async (req, res) => {
    const updatexp = await Exp.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatexp) {
        console.error("Update method error");
        res.status(404).json({error: "Error update"})
    }
    res.json(updatexp);
})

app.delete('/student/:id', async (req, res) => {
    const updatexp = await Exp.findByIdAndDelete(req.params.id)
    if (!updatexp) {
        console.error("Delete method error");
        res.status(404).json({error: "Error delete"})
    }
    res.json(updatexp);
})

app.search('/student/:id', async (req, res) => {
    const updatexp = await Exp.findById(req.params.id)
    if (!updatexp) {
        console.error("Delete method error");
        res.status(404).json({error: "Error delete"})
    }
    res.json(updatexp);
});
    
app.listen(PORT, ()=>{
    console.log("Server running");
})