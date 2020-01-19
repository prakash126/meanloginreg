import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    templateUrl:'./admin.component.html'
})
export class adminComponent {

    constructor(private http:HttpClient){}

    public users=null;

    public admin={
        email:null,
        password:null
    }
    public isLoggedIn=false;

    admin_login(){
        if(this.admin.email==="admin@this.com" && this.admin.password==="admin"){
            this.isLoggedIn=true;
            this.http.get("http://meanloginreg.herokuapp.com/users/get_all").subscribe((data)=>{
                this.users=data;
            })
        }else{
            alert("Username or password incorrect!!");
            return;
        }
    }

}