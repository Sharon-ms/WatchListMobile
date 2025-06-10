const express = require('express');
const connect = require("./mongoDB");

const usersRouter = require('./routers/users.router');
const seriesRouter = require('./routers/series.router');
const episodesRouter = require('./routers/episodes.router');
const watchedRouter = require('./routers/watched.router');

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/series", seriesRouter);
app.use("/episodes", episodesRouter);
app.use("/watched", watchedRouter);

connect();


app.listen(3000, () => console.log("litening on 3000"));
