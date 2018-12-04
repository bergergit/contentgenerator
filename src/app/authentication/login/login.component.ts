import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService, User } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isAuthenticated(): Boolean {
    return this.user !== null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Submited');
      this.loginService.authenticate(this.loginForm.value).subscribe((user) => {
        this.user = user;
        console.log('got user', user);
      }, (err) => {
        console.error('Login error', err);
      });
    }
    
  }


}
