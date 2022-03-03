import React from "react";
import { message } from "antd";
import { GoogleLogin } from "react-google-login";

import { OAuthClient } from "../../constants/credentials";
import validateTokenAndObtainSession from "../../requests/validateTokenAndObtainSession";

export const GoogleAuthentication = () => {
  const onGoogleLoginSuccess = (response) => {
    const idToken = response.tokenId;
    const googleUserInfo = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      google_id: response.profileObj.googleId,
    };

    validateTokenAndObtainSession({ googleUserInfo, idToken }).then(
      (response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", googleUserInfo.name);
          localStorage.setItem("name", googleUserInfo.name);
          localStorage.setItem("type", "Student");
          localStorage.setItem("access", JSON.stringify(response.data.access));
          window.location.href = "/";
        }
      }
    );
  };

  const onGoogleLoginFailure = (response) => {
    message.error(response);
  };

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div className="login-form">
      <h1>eMath</h1>
      <GoogleLogin
        clientId={OAuthClient.id}
        buttonText="Sign in with UAlberta Google account"
        onSuccess={onGoogleLoginSuccess}
        onFailure={onGoogleLoginFailure}
        onLogoutSuccess={logout}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
