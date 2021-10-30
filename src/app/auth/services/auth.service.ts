import { Injectable } from '@angular/core';
//import { auth } from 'firebase/app';
//import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { promise } from 'selenium-webdriver';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }


  async sendVerificationEmail():Promise<void>{
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string){
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error){
      console.log(error);
    }
  }
  async register(name: string, lastname: string, text: string, cellphone: string, email: string, password: string){
    try{
      const result = await this.afAuth.createUserWithEmailAndPassword( email, password);
      this.sendVerificationEmail();
      return result;
    } catch(error){
      console.log(error);
    }
  }
  async logout(){
    try{
      await this.afAuth.signOut();
    }catch (error){
      console.log(error);
    }
  }
}
