// Initialize MSAL libraries by setting the Client Id and a callback
// @config - variable containing basic configuration, such as Client Id, interaction mode, and Redirect Url
// @authCallback - callback function to be called after sign-in completes
function createApplication(config, authCallback) {
    var userAgentApplication = new MSAL.UserAgentApplication(config.clientID, null, authCallback);
    userAgentApplication.redirectUri = config.redirectUri;
    userAgentApplication.interactionMode = config.interactionMode;

    // On page load, check if the token is present in the location hash and handle it
    var isCallback = userAgentApplication.isCallback(window.location.hash);
    if (isCallback) {
        userAgentApplication.handleAuthenticationResponse(window.location.hash);
    }
    return userAgentApplication;
}

var clientApplication;


function getAccessToken(scope, callback) {
    clientApplication.acquireTokenSilent(scope, function callBackendApiCallback(errorDescription, token, error) {
        if (error) {
            clientApplication.interactionMode = APPLICATION_CONFIG.interactionMode;
            clientApplication.acquireToken(scope, function (error, token) {
                if (token) {
                    callback(token, null);
                }
                if (error) {
                    callback(null, error);
                }
            });
        } else {
            callback(token, null);
        }
    });
}