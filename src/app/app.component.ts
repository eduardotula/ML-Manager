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
  viewSelectedUser!: string;
  users!: User[];
  errorMsg!: string;

  constructor(public userService: UsersServices, public userLs: UserLSService){
  }

  ngAfterViewInit(): void {
    this.userService.getAll().subscribe({
      next: (users) =>{
        if(users){
          this.users = users;
          if(this.userLs.getCurrentUser()){
            this.selectedUser = this.users.filter(user => user.id === this.userLs.getCurrentUser())[0];
          }
          else this.selectedUser = this.users[0];

          this.viewSelectedUser = this.selectedUser.name;
          this.userLs.setCurrentUser(this.selectedUser);
        }
        
      }, error: (err) => {
        console.log(err.message);
        this.errorMsg = err.message;
        this.users = [new User(1, "ERROR", "", "", "" , new Date())]
      }
    });
  }

  selectUser(event: Event){
    const selectElement = event.target as HTMLSelectElement;
    let toSelect = this.users.filter(user => user.name === selectElement.value);
    if(toSelect.length > 0){
      this.selectedUser = toSelect[0];
      this.userLs.setCurrentUser(this.selectedUser);
      window.location.reload();
    }

    
  }


}
