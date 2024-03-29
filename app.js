// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();
// test heroku
const cool = require('cool-ascii-faces');
app.get('/cool', (req, res) => res.send(cool()));
// fin test heroku

// const { isAuthenticated } = require('./middleware/jwt.middleware');

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
app.use(express.json());

const allRoutes = require('./routes/index.routes');
app.use('/api', allRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const themeRoutes = require('./routes/theme.routes');
app.use('/api/theme', themeRoutes);

const storyRoutes = require('./routes/story.routes');
app.use('/api/story', storyRoutes);

const professionalRoutes = require('./routes/professional.routes');
app.use('/api/professional', professionalRoutes);

const bodyPartRoutes = require('./routes/bodyPart.routes');
app.use('/api/bodypart', bodyPartRoutes);
// const adminRoutes = require('./routes/admin.routes');
// app.use('/api/admin', isAuthenticated, adminRoutes);

// const userRoutes = require('./routes/user.routes');
// app.use('/api/users', isAuthenticated, userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
