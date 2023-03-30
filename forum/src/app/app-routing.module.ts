import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';

const routes: Routes = [
  { path: 'login', loadChildren: () => AuthModule },
  { path: '', loadChildren: () => PostModule },
  { path: 'profile/:username', loadChildren: () => ProfileModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
