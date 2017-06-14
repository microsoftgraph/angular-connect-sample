import {Component} from '@angular/core';
import {OAuthService} from 'angular2-oauth2/oauth-service';
import {ActivatedRoute} from '@angular/router';
import {Http, RequestOptions, Headers} from '@angular/http';
import {oauthSettings} from "./app.oauth";
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    public meUrl:string;
    public organizationUrl:string;
    public meDisplayName:Object;
    public myCompanyName:string;

    constructor(private oAuthService:OAuthService, public activeRoute:ActivatedRoute, public http:Http) {
        this.initOAuthSettings();
        this.initData();
    }

    public login() {
        this.oAuthService.initImplicitFlow();
    };

    public initData() {
        this.activeRoute.fragment.subscribe((response => {
            if (response && typeof response === "string" && response.length > 0) {
                this.oAuthService.tryLogin({});
                this.getAllGraphInfo();
            }
            else {
                if (response !== null) {
                    if (localStorage.getItem("access_token")) {
                        this.getAllGraphInfo();
                    }
                }
            }
        }));
    }

    public initOAuthSettings() {
        this.oAuthService.clientId = oauthSettings.clientId;
        this.oAuthService.loginUrl = oauthSettings.loginUrl;
        this.oAuthService.redirectUri = oauthSettings.redirectUri;
        this.oAuthService.scope = oauthSettings.scope;
        this.meUrl = oauthSettings.meUrl;
        this.organizationUrl = oauthSettings.organizationUrl;
    };

    public getAllGraphInfo() {
        this.getGraphResource(this.meUrl).subscribe((response)=> {
            if (response && response["displayName"]) {
                this.meDisplayName = response["displayName"];
            }
        });
        this.getGraphResource(this.organizationUrl).subscribe((response)=> {
            if (response && response["value"]) {
                this.myCompanyName = response["value"][0]["displayName"];
            }
        });
    };

    public getGraphResource(resourceUrl:string) {
        return new Observable((observer)=> {
            try {
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                headers.append('Authorization', this.oAuthService.authorizationHeader());
                this.http.get(resourceUrl, new RequestOptions({headers: headers})).subscribe((response) => {
                    observer.next(JSON.parse(response["_body"]))
                });
            } catch (err) {
                observer.error(new Error("Unable to retrieve Graph data"));
            }
        });
    };
}
