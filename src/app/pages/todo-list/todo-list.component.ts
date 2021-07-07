import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  add() {
    alert('Add')
  }

}
