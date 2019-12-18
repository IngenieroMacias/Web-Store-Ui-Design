import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2'
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth:AngularFireAuth,public flashMessages:FlashMessagesService, public router:Router) {
    this.isLogged();
}

   public registro=(email,password)=>{
    this.afAuth.auth.createUserWithEmailAndPassword(email,password)
    .then((res)=>{
     console.log(res);
   alert('Usuario registrado');
    this.router.navigate(['/private']);

    }).catch((error)=>{
     console.log(error);
     alert('Error');
    })
   }


  // registro(email:string,password:string){
  //   return new Promise((resolve,reject)=>{
  //     this.afAuth.auth.createUserWithEmailAndPassword(email,password)
  //     .then(userData=> resolve(userData),
  //     err=>reject(err));
  //   });
  // }


  loginEmail(email,password){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userData=> resolve(userData),
      err=>reject(err));
    });
  }


  facebookEmail(){
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());

  }


  googleEmail(){
    return  this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public getAuth(){
    return this.afAuth.authState.map (auth => auth);
  }

  public logout(){
    return this.afAuth.auth.signOut();
  }

  public isLogged(){
     return this.afAuth.authState;
  }

}
