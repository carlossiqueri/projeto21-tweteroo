import { User } from "./user-entity";

export class Tweet {
    private username: User;
    private tweet: string;

    constructor(username:User, tweet: string){
        this.username = username;
        this.tweet = tweet;
    }

    getUsername(){
        return this.username;
    }

    gettweet(){
        return this.tweet;
    }
}