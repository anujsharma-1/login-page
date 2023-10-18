import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';
import { user } from '../../user';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,  private route: ActivatedRoute){}

  accounts : user[]=[];
  errorMsg : string = '';
  throwError : boolean = false;
  newAccount : boolean = true;
  signInStart : boolean = false;
  userForm = new FormGroup({
      name : new FormControl("", Validators.required),
      userName : new FormControl("", Validators.required),
      password : new FormControl("", Validators.required),
  });

  signIn(value : any){
    this.throwError = false;
    if(value.userName == null || value.userName == ''){
      this.throwError = true;
      this.errorMsg = "Username cannot be empty!";
      return;
    }

    if(value.password == null || value.password == ''){
      this.throwError = true;
      this.errorMsg = "Password cannot be empty!";
      return;
    }

    this.userForm.reset();
    let i=0;
    for(i=0;i<this.accounts?.length;i++){
      if(this.accounts[i].userName == value.userName){
        if(this.accounts[i].password == value.password){
          this.throwError = false;
          this.signInStart = false;;
          this.router.navigate(['home/' + this.accounts[i].name])
          break;
        }
        else{
          this.errorMsg = "Username or Password is incorrect!!";
          this.throwError = true;
          this.signInStart = true;
        }
      }      
    }
    if(i == this.accounts?.length){
      this.throwError = true;
      this.signInStart = true;
      this.errorMsg = "Username or Password is incorrect!!";
    }
  }

  signUp(value : any){
    if(this.signInStart)
      return;
    this.throwError = false;
    if(value.userName == null || value.userName == ''){
      this.throwError = true;
      this.errorMsg = "Username cannot be empty!";
      return;
    }

    if(value.password == null || value.password == ''){
      this.throwError = true;
      this.errorMsg = "Password cannot be empty!";
      return;
    }
    if(value.name == null || value.name == ''){
      this.throwError = true;
      this.errorMsg = "Name cannot be empty!";
      return;
    }

    this.userForm.reset();
    this.newAccount = true;
    for(let i=0;i<this.accounts?.length;i++){
      if(this.accounts[i].userName == value.userName){
        this.newAccount = false;
        this.throwError = true;
        this.errorMsg = "This username is already registered!! Please SignIn!!";
      }
    }
    if(this.newAccount){
      this.accounts.push(value);
      if(this.signInStart == false)
      this.signInStart = true;

      console.log("value : ", value);
    }
    console.log("Account", this.accounts.length);
  }
  toggle(){
    this.signInStart = !this.signInStart;
    this.throwError = false;
  }
}