import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user.model';
import { PostService } from '../post.service';
import { Post } from './post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  hidden: boolean = false;
  cancel: string = 'Dodaj Komentar';
  edit: boolean = false;
  authenticated: boolean = false;
  autoChangeSubscription: Subscription | null = null;
  user: User | null = null;
  newPostForm!: FormGroup;
  postSubject: BehaviorSubject<Post[]> | null = null;
  posts: Post[] = [];
  editingPost: Post = new Post();
  subscription: Subscription | null = null;

  constructor(private auth: AuthService, private postService: PostService) {}

  ngOnInit(): void {
    this.postSubject = this.postService.getPosts();
    this.subscription = this.postSubject.subscribe((res) => {
      this.posts = res;
    });

    this.authenticated = this.auth.isAuthenticated();
    this.autoChangeSubscription = this.auth.authChange.subscribe(
      (authenticated) => (this.authenticated = authenticated)
    );

    this.auth.userSub.subscribe((user) => {
      this.user = user;
    });
    this.user = this.auth.getUser();

    this.newPostForm = new FormGroup({
      userId: new FormControl(this.user.username, [Validators.required]),
      comment: new FormControl(null, [Validators.required]),
    });
  }

  makeid(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  promijeni() {
    if (this.hidden) {
      this.cancel = 'Cancel';
    } else {
      this.cancel = 'Dodaj Komentar';
    }
  }

  formatDate(currentDate: Date): String {
    return `${currentDate.toJSON().slice(0, 10)} ${currentDate
      .toJSON()
      .slice(11, 19)}`;
  }

  addPost() {
    this.postService.addPost({
      ...this.newPostForm.value,
      timestamp: this.formatDate(new Date()),
      _id: this.makeid(15),
    });

    this.newPostForm.controls['comment'].reset();
  }

  deletePost(i: number) {
    let p = this.posts[i];
    this.postService.deleteCountry(p._id);
  }

  startEditing(post: Post) {
    this.edit = !this.edit;
    this.editingPost = post;
  }

  doneEditing() {
    this.postService.editPost(this.editingPost);
    this.editingPost = new Post();
    this.edit = false;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
