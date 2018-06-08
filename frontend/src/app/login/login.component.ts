import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {FormsModule} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
    user_username: string;
    user_password: string;

    constructor(private userService: UserService) {

    }

    ngOnInit() {
       
    }

    login(user_username: string, user_password: string) {
        this.userService.login(user_username, user_password);
    }
}
