import {Component} from '@angular/core'
import {AuthenticationService,TokenPayload} from '../authentication.service'
import {Router} from '@angular/router'

@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    credentials: TokenPayload = {
        _id:'',
        first_name:'',
        last_name:'',
        email:'',
        password:''
    }

    constructor(private auth:AuthenticationService,private router:Router){}

    register(){
        if(this.credentials.first_name==""||this.credentials.last_name==""||this.credentials.password==""||this.credentials.email==""){
            alert("Feils can not be blank!!");
            return;
        }
        this.auth.register(this.credentials).subscribe(
            ()=>{
                this.router.navigateByUrl('/profile')
            },
            err =>{
                console.error(err)
            }
        )
    }
}