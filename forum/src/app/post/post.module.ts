import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostsComponent } from './posts/posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, PostRoutingModule, FormsModule, ReactiveFormsModule],
})
export class PostModule {}
