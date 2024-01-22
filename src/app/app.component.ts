import { Component, OnInit, PipeTransform } from '@angular/core';
import { User } from './services/models/User';
import { UsersServices } from './services/users.service';
import { UserLSService } from './services/local-storage/user-ls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  selectedUser!: User;
  users!: User[];
  errorMsg!: string;

  constructor(public userService: UsersServices, public userLs: UserLSService){
  }

  ngAfterViewInit(): void {
    this.userService.getAll().subscribe({
      next: (users) =>{
        this.users = users;
        if(this.users){
          this.selectedUser = this.users[0];
          this.userLs.setCurrentUser(this.selectedUser)
        } 
        
      }, error: (err) => {
        console.log(err.message);
        this.errorMsg = err.message;
        this.users = [new User(1, "ERROR", "", "", "" , new Date())]
      }
    });
  }



}
