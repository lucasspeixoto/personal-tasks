import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';
import { Detail, Summary } from 'src/app/shared/static/messages';
import { AuthService } from '../../shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: any
  userData: any

  destroy$ = new Subject();

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private messageService: MessageService,
  ) { this.userData = JSON.parse(localStorage.getItem('user')); }

  ngOnInit() {
    this.getUserInfo()
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Função para obter tarefas do banco
  getUserInfo() {
    this.userService.getUserData(this.userData.uid).valueChanges()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (user) => {
          this.userName = user[2]
        },
        (error) => {
          this.messageService.clear();
          this.messageService.add({
            severity: 'error',
            summary: Summary[error.code],
            detail: Detail[error.code],
          });
        }
      );
  }

  logOut() {
    this.authService.SignOut()
  }

  onCreate() {
    window.alert('Create')
  }

  onRefresh() {
    window.alert('Refresh')
  }

}
