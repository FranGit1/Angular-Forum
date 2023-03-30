export class Post {
  userId: string;
  timestamp: string;
  comment: string;
  _id: string;

  constructor() {
    this.userId = '';
    this.timestamp = '';
    this.comment = '';
    this._id = '';
  }
}
