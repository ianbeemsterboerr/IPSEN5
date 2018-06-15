import { User } from './model/user';
import { ErrorhandlerService } from './errorhandler.service';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {
    public isUserLoggedIn = false;
    public activeUserId: number;

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
                    localStorage.setItem('activeUserId', data['userID']);

                    this.checkLoginStatus();

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

        this.setLoginStatus(false);
        this.toastr.info('Goodbye.');
    }

    public isLoggedIn(): boolean {
        this.checkLoginStatus();
        return this.isUserLoggedIn;
    }

    public setLoginStatus(status: boolean) {
        this.isUserLoggedIn = status;
    }

    public checkLoginStatus() {
        this.activeUserId = +localStorage.getItem('activeUserId');
        this.setLoginStatus(this.activeUserId !== 0);
    }

    public getActiveUserId() {
        if (!this.isUserLoggedIn) { return null; }
    }

    public getActiveUser(): Observable<User> {
        if (!this.isLoggedIn()) { return null; }

        return this.getUserByID(this.activeUserId);
    }

    public getUserByID(id: number): Observable<User> {
        return this.api.get<User>(`users/get/${id}`);
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
