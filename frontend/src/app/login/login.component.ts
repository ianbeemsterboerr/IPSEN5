import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActiveaccountService } from '../services/activeaccount.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
    user_username: string;
    user_password: string;

    // tslint:disable-next-line:max-line-length
    constructor(private api: ApiService, private toastr: ToastrService, private router: Router, public activeAccountService: ActiveaccountService) {

    }

    ngOnInit() {
       if (localStorage.getItem('bearer') != null && localStorage.getItem('activeUserId') != null) {
        this.router.navigate(['/']);
       }
    }

    login(user_username: string, user_password: string) {
        this.api.post('login', {'username': user_username, 'password': user_password}).subscribe(
            data => {
                console.log('Received data (JWT): ' + data['bearer']);
                console.log('ActiveUser from JSON: ' + data['activeUserId']);
                const JSONWebToken = data['bearer'];
                const activeUserId = data['activeUserId'];

                localStorage.removeItem('bearer');
                localStorage.setItem('bearer', JSONWebToken);

                localStorage.removeItem('activeUserId');
                localStorage.setItem('activeUserId', activeUserId);

                console.log('Active User from localstorage: ' + JSON.parse(localStorage.getItem('activeUserId')));
                this.activeAccountService.setLoggedIn(true);
                this.router.navigate(['/']);
            },
            err => {
                console.log('error: ' + JSON.stringify(err.error));
                this.toastr.error(err.error.message, 'Could not log in!');
            },
            () => {
                console.log('Succesvol ingelogd.');

                this.api.get('users/get/1').subscribe(
                    data => {
                        console.log(data);
                    },
                    err => {

                    }
                );
            }
        );

    }

    logout() {
        localStorage.removeItem('bearer');
        localStorage.removeItem('activeUserId');
        localStorage.removeItem('activeUser');

    }
}
