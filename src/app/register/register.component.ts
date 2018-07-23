import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private alert: AlertService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      username: [ '', Validators.required ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(() => {
        this.alert.success('Registration successful', true);
        this.router.navigate([ '/login' ]);
      }, error => {
        this.alert.error(error);
        this.loading = false;
      });
  }
}
