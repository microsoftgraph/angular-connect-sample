// Initialize MSAL libraries by setting the Client Id and a callback
// @config - variable containing basic configuration, such as Client Id, interaction mode, and Redirect Url
// @authCallback - callback function to be called after sign-in completes
function createApplication(applicationConfig) {

    var clientApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, function (errorDesc, token, error, tokenType) {
        // Called after loginRedirect or acquireTokenPopup
    });

    return clientApplication;
}

var clientApplication;
