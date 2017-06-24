import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {OAuthService} from 'angular2-oauth2/oauth-service';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([{path: "home", component: AppComponent}]),

    ],
    providers: [OAuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
