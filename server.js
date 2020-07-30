const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connecting to MongoDB Atlas database
connectDB();

// initializing middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => {
    res.send('API Running')
});

// defining routes from ./routes/api folder
app.use('/api/quizzes', require('./routes/api/quizzes'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
});