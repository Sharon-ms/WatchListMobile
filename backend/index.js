const express = require('express');
const connect = require("./mongoDB");
const cors = require("cors")
const path = require('path')

const usersRouter = require('./routers/users.router');
const seriesRouter = require('./routers/series.router');
const episodesRouter = require('./routers/episodes.router');
const watchedRouter = require('./routers/watched.router');
const favoritesRouter = require('./routers/favorites.router')

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors())

app.use("/users", usersRouter);
app.use("/series", seriesRouter);
app.use("/episodes", episodesRouter);
app.use("/watched", watchedRouter);
app.use("/favorites", favoritesRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connect();


app.listen(3000, () => console.log("litening on 3000"));
