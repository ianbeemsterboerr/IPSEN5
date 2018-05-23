import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {FormsModule} from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
    user_username: string;
    user_password: string;

    constructor(private api: ApiService, private toastr : ToastrService) {

    }

    ngOnInit() {

    }

    login(user_username: string, user_password: string) {
        this.api.post('login', JSON.stringify({user_username, user_password})).subscribe(
            data => {
                console.log('Received data (JWT): ' + data['bearer']);
                console.log('ActiveUser from JSON: ' + data['activeUserId']);
                let JSONWebToken = data['bearer'];
                let activeUserId = data['activeUserId'];

                localStorage.removeItem('bearer');
                localStorage.setItem('bearer', JSONWebToken);

                localStorage.removeItem('activeUserId');
                localStorage.setItem('activeUserId', activeUserId);

                console.log('Active User from localstorage: ' + JSON.parse(localStorage.getItem('activeUserId')));
            },
            err => {
                console.log('error: ' + JSON.stringify(err.error));
                this.toastr.error(err.error.message, "Could not log in!");
            },
            () => {
                console.log('Succesvol ingelogd.')
            }
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('avtiveUserId');
    }
}
