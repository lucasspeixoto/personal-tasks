import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { AuthService } from './auth.service';
import { Task } from './../static/task';
import { ProviderUser } from './../static/user';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  providerUserData: ProviderUser

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    public authService: AuthService
  ) {
    this.providerUserData = JSON.parse(localStorage.getItem('user'))
  }

  // Leitura das Tarefas
  getAll() {
    return this.angularFireDatabase.list(`/tasks`)
  }

  // Adição de tarefa
  insert(task: Task) {
    this.angularFireDatabase.list('/tasks')
      .push(task)
      .then((res) => {
        task.id = res.key
        this.angularFireDatabase.object('/tasks/' + `${res.key}`)
          .update(task)
          .then((result) => { })
          .catch((err) => { })
      })
      .catch((err) => { })
  }

  // Edição de tarefas
  update(data: Task) {
    if (data) {
      this.angularFireDatabase.object('/tasks/' + `${data.id}`)
        .update(data)
        .then((result) => { })
        .catch((err) => { })
    }
  }

  // Exclusão de Tarefa
  remove(id: string) {
    this.angularFireDatabase.list(`/tasks/${id}`).remove()
  }

}
