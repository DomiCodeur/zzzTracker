import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {}

  setUser(user: User) {
    this.userSubject.next(user);
  }

  signOut() {
    this.userSubject.next(null);
  }

  // Méthode pour récupérer l'utilisateur actuel si nécessaire
  getUser(): User | null {
    return this.userSubject.value;
  }
}
