import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatInputModule, MatCheckboxModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,

  ],
  providers: [
    FormBuilder
  ]
})
export class AuthenticationModule { }
