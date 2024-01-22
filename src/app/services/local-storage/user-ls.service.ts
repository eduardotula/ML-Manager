import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { User } from "../models/User";

@Injectable({
    providedIn: 'root'
  })
  export class UserLSService extends LocalStorageService{

    key: string = "current-user-id";

    constructor() {
        super();
     }

    setCurrentUser(user :User){
        this.set(this.key, user.id);
    }

    setCurrentUserId(userId :number){
        this.set(this.key, userId);
    }

    getCurrentUser(): number{
        return this.get(this.key);
    }

    deleteCurrentUser(){
        this.remove(this.key);
    }

  }