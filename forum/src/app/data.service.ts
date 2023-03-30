import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
import { Post } from './post/posts/post.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiRoot = environment.API_URL + '/api/posts';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.apiRoot).pipe(
      map((res: any) => {
        return res.post;
      })
    );
  }

  addPost(post: Post) {
    console.log(post);
    return this.http.post(this.apiRoot, post);
  }

  deletePost(_id: string) {
    return this.http.delete(this.apiRoot + `/${_id}`);
  }

  editPost(post: Post) {
    return this.http.put(this.apiRoot, post);
  }
}
