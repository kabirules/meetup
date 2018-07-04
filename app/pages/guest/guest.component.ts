import { Component, OnInit } from "@angular/core";
import { MeetUpService } from "~/shared/meetup/meetup.service";
import { Member } from "~/shared/meetup/member";
import { Group } from "~/shared/meetup/group";

@Component({
  selector: "app-guest",
  providers: [MeetUpService],
  templateUrl: "./pages/guest/guest.html",
  styleUrls: ["./pages/guest/guest.css"]
})
export class GuestComponent implements OnInit {

  members: Array<Member>;
  groups: Array<Group>;

  constructor(private meetUpService: MeetUpService) {
  }

  ngOnInit() {
    this.callGroups();
  }

  callGroups() {
    //const lat = 41.9097; // TODO get it from GPS
    //const lon = 12.2558; // TODO get it from GPS
    let lat: null;
    let lon: null;
    this.meetUpService.getGroups(lat, lon)
    .subscribe(
      (data) => {
        this.groups = data;
        this.callProfiles();
      },
      () => alert("callGroups didn't work")
    );    
  }

  callProfiles() {
    const urlname = this.getRandomGroup();
    this.meetUpService.getProfiles(urlname)
    .subscribe(
      (data) => {
        this.members = data;
        //console.log(this.members);
      },
      () => alert("callProfiles didn't work")
    );    
  }

  getRandomGroup() {
    const totalGroups = this.groups.length;
    const index = Math.floor(Math.random() * totalGroups);
    return this.groups[index].urlname;
  }
}