/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/


"use strict";

(function () {
  angular
    .module('app')
    .service('GraphHelper', ['$http', function ($http) {

      // Initialize the auth request.
      clientApplication = createApplication(APPLICATION_CONFIG, function ()
      {
          // localStorage.user = clientApplication.user;
          getAccessToken(APPLICATION_CONFIG.graphScopes, function (token, error)
          {
              if (token) {
                  localStorage.token = angular.toJson(token);

                  // refreshes the page as with msal, the authentication happened in an HTML dialog, 
                  // whereas it happened in the window itself with hello.js
                  location = location;
              }
          });
      });

      return {

        // Sign in and sign out the user.
        login: function login() {
            clientApplication.login();
        },
        logout: function logout() {
            clientApplication.logout();
            delete localStorage.token;
            delete localStorage.user;
        },

        // Get the profile of the current user.
        me: function me() {
          return graphClient.api('/me').get();
        },

        // Send an email on behalf of the current user.
        sendMail: function sendMail(email) {
          return graphClient.api('/me/sendMail').post({ 'message' : email, 'saveToSentItems': true });
        }
      }
    }]);
})();
