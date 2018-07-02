import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { MeetUpService } from "~/shared/meetup/meetup.service";
import { Member } from "~/shared/meetup/member";


@Component({
  selector: "my-app",
  providers: [UserService, MeetUpService],
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login-common.css", "./pages/login/login.css"]
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;

  members = Array<Member>();

  constructor(private router: Router, 
              private userService: UserService,
              private meetUpService: MeetUpService) {
    this.user = new User();
    this.user.email = "my.test.account@nativescript.org";
    this.user.password = "password";
  }

  ngOnInit() {
    this.callProfiles();
  }
  
  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.userService.login(this.user)
      .subscribe(
        () => this.router.navigate(["/list"]),
        (error) => alert("Unfortunately we could not find your account.")
      );
  }

  signUp() {
    this.userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  callCities() {
    this.meetUpService.getCities()
    .subscribe(
      (data) => {
        console.log(data[1]);
      },
      () => alert("getCitites didn't work")
    );
  }

  callTopics() {
    this.meetUpService.getTopics('London')
    .subscribe(
      (data) => {
        //console.log(data);
      },
      () => alert("callTopics didn't work")
    );    
  }

  callGroups() {
    //const lat = 41.9097; // TODO get it from GPS
    //const lon = 12.2558; // TODO get it from GPS
    let lat: null;
    let lon: null;
    this.meetUpService.getGroups(lat, lon)
    .subscribe(
      (data) => {
        // console.log(data);
      },
      () => alert("callGroups didn't work")
    );    
  }

  callProfiles() {
    const urlname = 'Couchsurfing-Roma-Weekly';
    this.meetUpService.getProfiles(urlname)
    .subscribe(
      (data) => {
        this.members = data;
        console.log(this.members);
      },
      () => alert("callProfiles didn't work")
    );    
  }  
}