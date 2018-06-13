import { User } from './model/user';
import { ErrorhandlerService } from './errorhandler.service';
import { state } from '@angular/animations';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ApiService} from './api.service';


@Injectable()
export class UserService {
    public isUserLoggedIn = false;

    constructor(private errorService: ErrorhandlerService, private toastr: ToastrService, private router: Router, private api: ApiService) {
        this.checkLoginStatus();
    }

    login(username: string, password: string) {
        this.api.post('login', {'username': username, 'password': password})
            .subscribe(
                data => {
                    localStorage.removeItem('bearer');
                    localStorage.setItem('bearer', data['bearer']);

                    localStorage.removeItem('activeUserId');
                    localStorage.setItem('activeUserId', data['activeUserId']);

                    this.setLoginStatus(true);
                    this.toastr.info('Hello 👋!');
                    this.router.navigate(['/']);
                },
                error => {
                  this.errorService.handleError(error, 'Couldn\'t log in: ');
                }
            );
    }

    logout() {
        localStorage.removeItem('bearer');
        localStorage.removeItem('activeUserId');
        localStorage.removeItem('activeUser');

        this.setLoginStatus(false);
        this.toastr.info('Goodbye.');
    }

    public isLoggedIn() {
        return this.isUserLoggedIn;
    }

    public setLoginStatus(status: boolean) {
        this.isUserLoggedIn = status;
    }

    public checkLoginStatus() {
        this.setLoginStatus(localStorage.getItem('activeUserId') != null);
    }

    public getActiveUserId() {
        if (!this.isUserLoggedIn) { return null; }

        return localStorage.getItem('activeUserId');
    }

    public getActiveUser() {
        if (!this.isUserLoggedIn) { return null; }

        return localStorage.getItem('activeUser');
    }

    public register(user: User) {
      this.api.post('users/register', user).subscribe(
        data => {
          this.toastr.success('User created');
          this.login(user.username, user.password);
        }, err => {
          this.errorService.handleError(err, 'Could\'t register user:');
        }
      );
    }
}
