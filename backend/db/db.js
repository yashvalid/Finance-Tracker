const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("MongoDB connected"))
        .catch((err) => {
            console.error("MongoDB connection error:", err);
            process.exit(1); // Exit the process with failure
        });
}

module.exports = connectDB;