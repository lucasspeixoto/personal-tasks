import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  userData: any;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  // Leitura das Tarefas
  getAll() {
    return this.angularFireDatabase.list(`/tasks`);
  }

  // Adição de tarefa
  insert(data: any) {
    const dbRef = this.angularFireDatabase.list('/tasks');
    dbRef
      .push(data)
      .then((res) => {
        data.id = res.key;
        const database = this.angularFireDatabase.object('/tasks/' + `${res.key}`);
        database
          .update(data)
          .then((result) => { })
          .catch((err) => { });
      })
      .catch((err) => { });
  }

  // Edição de tarefas
  update(data: any) {
    if (data) {
      const dbRef = this.angularFireDatabase.object('/tasks/' + `${data.id}`);
      dbRef
        .update(data)
        .then((result) => { })
        .catch((err) => { });
    }
  }

  // Exclusão de Tarefa
  remove(data: any) {
    if (data) {
      const dbRef = this.angularFireDatabase.list('/tasks/' + `${data.id}`);
      dbRef.remove();
    }
  }

}
