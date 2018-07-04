import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { HomeComponent } from "./pages/home/home.component";
import { GuestComponent } from "./pages/guest/guest.component";

export const routes = [
    { path: "", component: HomeComponent },
    { path: "guest", component: GuestComponent },
    { path: "login", component: LoginComponent },
    { path: "list", component: ListComponent }
];

export const navigatableComponents = [
  LoginComponent,
  HomeComponent,
  GuestComponent,
  ListComponent
];