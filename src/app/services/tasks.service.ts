import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly API = `http://localhost:3001/tasks`

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase
  ) { }

  // Leitura das Tarefas
  getAll() {
    return this.db.list('/tasks').valueChanges()
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

