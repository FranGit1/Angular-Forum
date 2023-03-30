import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data.service';
import { Post } from './posts/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts: Post[] = [];
  postSubject: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  constructor(private dataService: DataService) {
    this.init();
  }
  init() {
    this.dataService.getPosts().subscribe((res) => {
      this.posts = res;
      this.postSubject.next([...this.posts]);
    });
  }

  getPosts() {
    return this.postSubject;
  }

  addPost(post: Post) {
    this.dataService.addPost(post).subscribe((res) => {
      this.posts.push(post);
      this.postSubject.next([...this.posts]);
    });
  }

  deleteCountry(_id: string) {
    this.dataService.deletePost(_id).subscribe((res) => {
      this.posts = this.posts.filter((p) => p._id != _id);
      this.postSubject.next([...this.posts]);
    });
  }

  editPost(post: Post) {
    this.dataService.editPost(post).subscribe((res) => {
      this.posts[this.posts.findIndex((p) => p._id == post._id)] = post;
      this.postSubject.next(this.posts);
    }),
      (error: any) => {
        console.log(error);
      };
  }
}
