import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthenticationService,
              private alert: AlertService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });

    this.auth.logout();
    this.returnUrl = this.route.snapshot.queryParams[ 'returnUrl' ] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.auth.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(() => this.router.navigate([ this.returnUrl ]),
        error => {
          this.alert.error(error);
          this.loading = false;
        });
  }

}
