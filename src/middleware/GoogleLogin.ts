import { Express } from "express";
import passport from "passport";
import googleOauth from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const initPassport = async (app: Express) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(
        new googleOauth.Strategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                callbackURL: "/google/redirect",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    
                    let user = await User.findOne({ 
                        where: 
                        { 
                            email: profile._json.email,
                        } 
                    });
                    if (user) {
                        done(null, user);
                    }else{
                        done(null, false, { message: "User or password incorrect"});
                    }
                    
                } catch (error) {
                    done(error);
                }
            },
        ),
    );

    passport.serializeUser((user:User | any, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (user:User, done) => {
        try {
            const userDB = await User.findOne({
                where :{
                    email : user.email,
                }
        });
            done(null, userDB);
        } catch (error) {
            done(error);
        }
    });
}

export default initPassport;


