import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PostService } from 'src/app/post/post.service';
import { Post } from 'src/app/post/posts/post.model';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css'],
})
export class ProfileDetailComponent implements OnInit {
  name: any;
  user: User | null = null;
  postSubject: BehaviorSubject<Post[]> | null = null;
  posts: Post[] = [];
  subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    this.name = this.route.snapshot.params['username'];
    this.user = this.auth.getUser();

    this.postSubject = this.postService.getPosts();
    this.subscription = this.postSubject.subscribe((res) => {
      this.posts = res;
    });

    this.posts = this.posts.filter((p) => p.userId == this.name);
  }
}
