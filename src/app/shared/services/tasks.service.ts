import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  userData: any

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  // Leitura das Tarefas
  getAll() {
    return this.db.list(`/tasks`).valueChanges()
      .pipe(
        map(obj =>
          obj.filter(obj => obj['userid'] === this.userData.uid))
      )
  }

  // Adição de tarefa
  insert(data: any) {
    const dbRef = this.db.list('/tasks');
    dbRef.push(data).then(res => {
      data.id = res.key
      const database = this.db.object('/tasks/' + `${res.key}`)
      database.update(data).then(result => { }).catch(err => { })
    }).catch(err => { })
  }

  // Edição de tarefas
  update(data: any) {
    if (data) {
      const dbRef = this.db.object('/tasks/' + `${data.id}`)
      dbRef.update(data).then(result => {
      }).catch(err => { })
    }
  }

  // Exclusão de Tarefa
  remove(data: any) {
    if (data) {
      const dbRef = this.db.list('/tasks/' + `${data.id}`)
      dbRef.remove()
    }
  }

  errorHandler(error: any): Observable<any> {
    alert('Erro. Tente novamente mais tarde.')
    return EMPTY
  }

}

