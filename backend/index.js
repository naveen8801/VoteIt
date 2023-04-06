const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./db');
const errorHandler = require('./middleware/error');
const http = require('http');

// Loading Env Vars
dotenv.config({ path: '.env' });

// Connect to Database
connectDB();

//============================ Route Files ===========================//
const auth = require('./routes/Auth');
const resource = require('./routes/Resource');

// Initialising Express Constructor
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Cors Middleware
app.use(cors());

// Body Parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello');
});

// Development logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ================Mount routes=====================
app.use('/api/v1/auth', auth);
app.use('/api/v1/resource', resource);

// =================================================

// Error handler middleware (Should be after mounting routes as otherwise it will not be able to
// errors otherwise)
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

//Socket.io Controllers
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

const server_ = server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handel unhandelled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error : ${err.message}`);
  // Close Server & Exit process
  server_.close(() => process.exit(1));
});
