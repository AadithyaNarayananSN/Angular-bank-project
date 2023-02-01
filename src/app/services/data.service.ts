import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUsername: any
  currentAcno: any

  //database    - IT IS A DICTIONARY.Account number is  used as key
  database: any = {
    1000: { acno: 1000, uname: "leo", password: 1000, balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "ken", password: 1001, balance: 2000, transaction: [] },
    1002: { acno: 1002, uname: "kevin", password: 1002, balance: 7000, transaction: [] }
  }

  constructor() { 
    this.getDetails()
  }

  // save data in local storage
  saveDetails() {
    localStorage.setItem("database", JSON.stringify(this.database))
    // setItem(key,value)

    if (this.currentAcno) {  
      localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
    }
    if (this.currentUsername) {
      localStorage.setItem("currentUsername", JSON.stringify(this.currentUsername))
    }
  }
  
  //get data local storage
  getDetails(){
    if(localStorage.getItem("database")){
      this.database = JSON.parse(localStorage.getItem("database")||'')
    }
    if(localStorage.getItem("database")){
      this.currentAcno = JSON.parse(localStorage.getItem("currentAcno")||'')
    }
    if(localStorage.getItem("database")){
      this.currentUsername = JSON.parse(localStorage.getItem("currentUsername")||'')
    }
  }
  //register
  register(acno: any, password: any, uname: any) {

    let database = this.database
    if (acno in database) {  //if the registering account already exist in database's defaultly stored account no,it should return fals
      //acno already existing
      return false
    }
    else {
      database[acno] = {
        acno,
        uname,
        password,
        balance: 0,
        transaction: []
      }
      this.saveDetails()     //stores data to the local storage(database)
      console.log(database)
      return true  //returns true if account is not already existing
    }

  }
  //login
  login(acno: any, pswd: any) {

    let database = this.database

    if (acno in database) {
      if (pswd == database[acno]["password"]) {   //if passed password is same as password in particuler account number.database[acno] means we used account number as key 
        this.currentUsername = database[acno]["uname"]
        this.currentAcno = acno
        //password match
        this.saveDetails()
        return true
      }
      else {
        alert("incorect password")
        return false
      }
    }
    else {
      //not exist
      alert("account does not exist")
      return false
    }
  }

  //deposit
  deposit(acno: any, pswd: any, amt: any) {
    var amount = parseInt(amt)
    let database = this.database
    if (acno in database) {
      if (pswd == database[acno]["password"]) {
        database[acno]["balance"] += amount
        database[acno]["transaction"].push({
          type: "CREDIT",
          amount: amount
        })
        console.log(database)
        this.saveDetails()
        return database[acno]["balance"]
      }
      else {
        alert("incorrect password")
        return false
      }
    }
    else {
      alert("account doesnot exist")
      return false
    }
  }

  //withdraw
  withdraw(acno: any, pswd: any, amt: any) {
    var amount = parseInt(amt)
    let database = this.database
    if (acno in database) {
      if (pswd == database[acno]["password"]) {
        if (database[acno]["balance"] > amount) {   //check if there is more amount as balance than the withdrawing amount
          database[acno]["balance"] -= amount
          database[acno]["transaction"].push({
            type: "DEBIT",
            amount: amount
          })
          console.log(database)
          this.saveDetails()
          return database[acno]["balance"]
        }
        else {
          alert("insufficient balance")
          return false
        }
      }
      else {
        alert("incorrect password")
        return false
      }
    }
    else {
      alert("account doesnot exist")
      return false
    }
  }
  getTransaction(acno: any) {
    this.database(acno)["transaction"]
  }
}
