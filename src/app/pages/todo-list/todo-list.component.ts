import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  userData: any

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.angularFireAuth.signOut().then((_) => this.router.navigate(['login']))
  }

  test() {
    this.userData = this.authenticationService.getUserData()
    console.log(this.userData)
  }

}
