import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../servicios/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
public isLogin:boolean;
public nombreUsuario:string;
public emailUsuario:string;


constructor(public AuthServ:AuthService, public routerLogout:Router) { }
 
  ngOnInit() {
    this.AuthServ.getAuth().subscribe((auth) =>{
    if(auth){
    this.isLogin=true;
    this.nombreUsuario=auth.displayName;
    this.emailUsuario=auth.email;
    }else{
      this.isLogin=false;
    }
    });
  }

  onclickLogout(){
     this.AuthServ.logout();
     }
   }
 