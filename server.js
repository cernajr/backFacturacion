const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT;

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get('/', (req, res) => {
    res.send("Hola");
});

const indexRouter = require('./src/routes/index');
const errorHandlerMiddleware = require('./src/middleware/errorHandlerMiddleware');
const logErrorHandlerMiddleware = require('./src/middleware/logErrorHandlerMiddleware');

app.use(indexRouter);
app.use(logErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => console.log('Listen: http://localhost:' + PORT));
