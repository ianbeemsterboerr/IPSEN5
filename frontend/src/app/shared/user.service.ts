import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ApiService} from "./api.service";
import {User} from "./model/user";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
    public isUserLoggedIn: boolean = false;
    public activeUserId: number;

    constructor(private toastr: ToastrService, private router: Router, private api: ApiService) {
        this.checkLoginStatus();
    }

    login(username: string, password: string) {
        this.api.post('login', {'username': username, 'password': password})
            .subscribe(
                data => {

                    localStorage.removeItem('bearer');
                    localStorage.setItem('bearer', data['bearer']);

                    localStorage.removeItem('activeUserId');
                    localStorage.setItem('activeUserId', data['userID']);

                    this.checkLoginStatus();

                    this.setLoginStatus(true);
                    this.toastr.info("Hello 👋!");
                    this.toastr.error()
                    this.router.navigate(['/']);
                },
                error => {
                    this.toastr.error(error.error.message, "Could not log in!");
                }
            );
    }

    logout() {
        localStorage.removeItem('bearer');
        localStorage.removeItem('activeUserId');

        this.setLoginStatus(false);
        this.toastr.info("Goodbye.");
    }

    public isLoggedIn():boolean {
        this.checkLoginStatus();
        return this.isUserLoggedIn;
    }

    public setLoginStatus(status: boolean) {
        this.isUserLoggedIn = status;
    }

    public checkLoginStatus() {
        this.activeUserId = +localStorage.getItem('activeUserId');
        this.setLoginStatus(this.activeUserId != 0);
    }

    public getActiveUser(): Observable<User> {
        if (!this.isLoggedIn()) return null;

        return this.getUserByID(this.activeUserId)
    }

    public getUserByID(id: number): Observable<User> {
        return this.api.get<User>(`users/get/${id}`);
    }
}
