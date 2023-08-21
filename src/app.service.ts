import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user-entity';
import { Tweet } from './entities/tweet-entity';
import { UserDto } from './dtos/user-dtos';
import { TweetDto } from './dtos/tweet-dtos';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  postUser(body: UserDto) {
    const newUser = new User(body.username, body.avatar);
    return this.users.push(newUser);
  }

  getUsers() {
    return this.users;
  }

  postTweet(body: TweetDto) {
    // check if user is a valid one
    const checkUser = this.users.find(
      (user) => user.getUsername() === body.username,
    );
    if (!checkUser) throw new UnauthorizedException('User not found');

    const postedTweet = new Tweet(body.username, body.tweet);
    return this.tweets.push(postedTweet);
  }

  getAllTweet(page: number) {
    // if there is not tweets
    if (!this.tweets) return [];

    // join user avatar on tweet
    const includesAvatar = this.tweets.map((tweet) => {
      const user = this.users.find(
        (user) => user.getUsername() === tweet.getUsername(),
      );
      return { ...tweet, avatar: user.getAvatar() };
    });

    if (page) {
      const tweetsPerPage = 15; // fixed
      // first and last tweets of each page are fixed as well
      const firstTweet = (page - 1) * tweetsPerPage;
      const lastTweet = page * tweetsPerPage;

      return includesAvatar.slice(firstTweet, lastTweet);
    }

    return includesAvatar.slice(-15);
  }

  getTweetsByUsername(username: string) {
    const sortedTweets = this.tweets.filter(
      (tweet) => tweet.getUsername() === username,
    );
    sortedTweets.map((tweet) => {
      const includesAvatar = this.users.find(user => user.getUsername() === tweet.getUsername());
      return {...tweet, avatar: includesAvatar.getAvatar()};
    });

    if(!sortedTweets) return [];

    return sortedTweets;
  }
}
