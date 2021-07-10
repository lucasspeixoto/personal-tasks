import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { Summary, Detail } from '../static/messages';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';
import { O2A } from 'object-to-array-convert';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {

  categories: any[];
  status: any[];

  constructor(
    private db: AngularFireDatabase,
    private messageService: MessageService
  ) { }

  teste() {
    console.log(this.categories)
  }

  // Leitura dos dados fixo
  getDropListInfos() {
    return this.db.list(`/parameters`).valueChanges()

  }

}
