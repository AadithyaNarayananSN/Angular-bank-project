import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  uname = ""
  acno = ""
  pswd = ""

  //registerForm    
  registerForm = this.fb.group({
    uname: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    acno: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {


    var acno = this.registerForm.value.acno
    var pswd = this.registerForm.value.pswd
    var uname = this.registerForm.value.uname

    if (this.registerForm.valid) {
      // call register in dataservice
      const result = this.ds.register(acno, pswd, uname)    //redirects to register function in data service
      if (result) {   //true
        alert("registration successful")
        this.router.navigateByUrl("")   //it navigates to login page .path of  login page was empty string.
      }
      else { //false
        alert("account already exist... please Login")
      }
    }
    else {
      alert("invalid form")
    }
  }

}
