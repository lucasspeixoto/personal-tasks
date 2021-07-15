import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/shared/services/user.service';
import { Detail, Summary } from 'src/app/shared/static/messages';
import { AuthService } from '../../shared/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenericUser, ProviderUser } from './../../shared/static/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  providerUserData: ProviderUser
  genericUserData: Array<GenericUser>
  genericUserName: string

  userObservableControl$ = new Subject()

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private messageService: MessageService
  ) {
    this.providerUserData = JSON.parse(localStorage.getItem('user'))
  }

  ngOnInit() {
    this.getUserInfo()
  }

  ngOnDestroy() {
    this.userObservableControl$.next()
    this.userObservableControl$.complete()
  }

  // Função para obter tarefas do banco
  getUserInfo() {
    this.userService
      .getUserData(this.providerUserData.uid)
      .valueChanges()
      .pipe(takeUntil(this.userObservableControl$))
      .subscribe(
        (user: string[]) => {
          this.genericUserName = user[2]
        },
        (error) => {
          this.messageService.clear()
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
}
