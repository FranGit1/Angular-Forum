import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileDetailComponent],
  imports: [CommonModule, ProfileRoutingModule, HttpClientModule, FormsModule],
})
export class ProfileModule {}
