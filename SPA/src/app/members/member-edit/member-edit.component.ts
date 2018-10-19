import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/Alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private route: ActivatedRoute, 
    private alertify: AlertifyService,
    private userService: UserService,
    private authSerivce: AuthService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user = data['user'];
    })
  }

  updateUser(){
    this.userService.updateUser(this.authSerivce.decodedToken.nameid, this.user).subscribe(next => {
      this.editForm.reset(this.user);
      this.alertify.success('Profile updated successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

}
