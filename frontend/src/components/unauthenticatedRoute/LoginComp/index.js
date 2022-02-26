import React, { useState } from "react";
import _ from "lodash";
import { Button, message } from "antd";
import { GoogleLogin } from "react-google-login";

import LoginForm from "./loginForm";

import { OAuthClient } from "../../../constants/credentials";
import validateTokenAndObtainSession from "../../../requests/validateTokenAndObtainSession";
import { getUsermod } from "../../../requests/requestPerson";
import url from "../../../requests/Urls";

export default function LoginComp() {
  const [openOldLogin, setOpenOldLogin] = useState(false);

  const handleButtonOnClick = () => {
    setOpenOldLogin(true);
  };

  const onGoogleLoginSuccess = (response) => {
    const idToken = response.tokenId;
    const data = {
      email: response.profileObj.email,
      name: response.profileObj.name,
      first_name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
      google_id: response.profileObj.googleId,
    };

    validateTokenAndObtainSession({ data, idToken }).then((response) => {
      if (response.status === 200) {
        if (response.data.allowLogin) {
          const values = response.data.userInfo;
          const token = values.token;
          getUsermod(values).then((response) => {
            // authentication dedicated account?
            if (response.status === 500) {
              // something unexpected
              message.error(response.data.msg);
            } else {
              if (Object.keys(response.data).length > 1) {
                // username or usermod does not exist
                message.error(response.data.msg);
              } else {
                if (response.data.allowLogin) {
                  // not authentication dedicated account, all good
                  localStorage.setItem("token", token);
                  //fetch user and author
                  fetch(`${url.domain}:${url.port}/current-user/`, {
                    headers: {
                      Authorization: `JWT ${localStorage.getItem("token")}`,
                    },
                  })
                    .then((res) => res.json())
                    .then((json) => {
                      localStorage.setItem("username", json.username);
                      // get author
                      fetch(`${url.domain}:${url.port}/user-person/`, {
                        headers: {
                          Authorization: `JWT ${localStorage.getItem("token")}`,
                        },
                      })
                        .then((res) => res.json())
                        .then((json) => {
                          localStorage.setItem("personID", json.id);
                          localStorage.setItem(
                            "name",
                            _.filter([
                              json.first_name,
                              json.middle_name,
                              json.last_name,
                            ]).join(" ")
                          );
                          localStorage.setItem("type", json.type);
                          localStorage.setItem(
                            "access",
                            JSON.stringify(json.access)
                          );
                          window.location.href = "/";
                        });
                    });
                } else {
                  // do not allow authentication dedicated account to login
                  message.error(
                    `${values.username} is for external authentication only, cannot login.`
                  );
                }
              }
            }
          });
        } else {
          localStorage.setItem("googleAuth", JSON.stringify(data));
          window.location.href = "/signup";
        }
      }
    });
  };

  const onGoogleLoginFailure = (response) => {};

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
        cookiePolicy={"single_host_origin"}
      />
      <Button type="link" onClick={handleButtonOnClick}>
        Login with username and password
      </Button>
      {openOldLogin ? <LoginForm /> : ""}
    </div>
  );
}
