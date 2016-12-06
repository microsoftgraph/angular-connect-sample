/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/

(function () {
  angular.module('app', [
		'angular-loading-bar'
  ])		
})();

var authToken;
var graphClient = MicrosoftGraph.Client.init({
    authProvider: function(done) {
        if (typeof authToken === "undefined") {
          done({err: "No auth token"})
        } else {
          done(null, authToken); //first parameter takes an error if you can't get an access token
        }
    }
});