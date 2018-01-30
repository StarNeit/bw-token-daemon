/**
 * Module dependencies.
 */
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var schedule = require("node-schedule");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

/**
 * Services
 */
var tokenService = require("./src/services/token");

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useMongoClient: true });
mongoose.connection.on("error", () => {
    console.log("MongoDB connection error. Please make sure MongoDB is running.");
    process.exit();
});

schedule.scheduleJob("*/" + process.env.SCHEDULE_INTERVAL + " * * * * *", tokenService);

console.log("---------- Started Token Daemon ----------");
