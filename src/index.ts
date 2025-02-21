import express, {Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import initPassport from '../src/middleware/GoogleLogin';
import routes from '../src/routers/Routes';


dotenv.config();

const app  = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use(session({
  secret: process.env.COOKIE_KEY || "keyboard cat",
  resave: false,
  saveUninitialized: true,
}));

initPassport(app);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(routes);

  
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});