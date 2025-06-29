const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = process.env.MONGO_URI; 

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch(err => console.error("MongoDB Connection Error:", err));


const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true }
});
const User = mongoose.model('User', userSchema);


app.get('/', (req, res) => {
  res.send("🚀 Backend is live!");
});


app.post('/expense', async (req, res) => {
  try {
    const { title, amount } = req.body;
    const newUser = new User({ title, amount });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error inserting expense:', error);
    res.status(500).json({ message: 'Failed to add expense.' });
  }
});


app.get('/expense', async (req, res) => {
  try {
    const expenses = await User.find();
    res.json(expenses);
  } catch (error) {
    console.error(" Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});


app.put('/expense/:id', async (req, res) => {
  try {
    const updatedExpense = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Failed to update expense" });
  }
});


app.delete('/expense/:id', async (req, res) => {
  try {
    const deletedExpense = await User.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json(deletedExpense);
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ message: 'Failed to delete expense' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});