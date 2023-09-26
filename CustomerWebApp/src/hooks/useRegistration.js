import { useCallback, useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { createUser, login } from "../apollo/graphQL";
import { AlertContext } from "../context/Alert";
import { useGoogleLogin } from "react-google-login";
import { GOOGLE_CLIENT_ID } from "../configuration/configurataion";
import { UserContext } from "../context/User";
import { useHistory } from "react-router-dom";

const LOGIN = gql`
  ${login}
`;

const CREATEUSER = gql`
  ${createUser}
`;

function useRegistration() {
  const navigation = useHistory();
  const [loading, setLoading] = useState(false);
  const { showAlert } = useContext(AlertContext);
  const { setTokenAsync } = useContext(UserContext);
  const [loginButton, loginButtonSetter] = useState(null);
  const [Login] = useMutation(LOGIN, { onCompleted, onError });
  const [Registration] = useMutation(CREATEUSER, { onCompleted, onError });

  const mutateLogin = useCallback(
    async (user) => {
      Login({
        variables: {
          ...user,
        },
      });
    },
    [Login]
  );

  async function onCompleted({ login, createUser }) {
    try {
      await setTokenAsync(login ? login.token : createUser.token);
      navigation.replace("/Home");
    } catch (e) {
      showAlert({
        alertMessage: "Something went wrong",
      });
      console.log("Error While saving token:", e);
    } finally {
      setLoading(false);
    }
  }

  function onError(errors) {
    setLoading(false);
    showAlert({
      alertMessage: errors.message || "Invalid credentials!",
      alertSeverity: "error",
    });
  }

  const authenticationFailure = useCallback((response) => {
    console.log("Authentication Failed: ", response);
    switch (response.error) {
      case "popup_closed_by_user":
      case "immediate_failed":
        break;
      case "idpiframe_initialization_failed":
        showAlert({
          alertMessage: "Something went wrong",
          alertSeverity: "default",
        });
        break;
      default:
        showAlert({
          alertMessage: "Something went wrong",
          alertSeverity: "default",
        });
        break;
    }
    setLoading(false);
    loginButtonSetter(null);
  }, []);

  const goolgeSuccess = useCallback(
    (response) => {
      const user = {
        phone: "",
        email: response.profileObj.email,
        password: "",
        name: response.profileObj.name,
        picture: response.profileObj.imageUrl,
        type: "google",
      };
      mutateLogin(user);
    },
    [mutateLogin]
  );

  const { signIn } = useGoogleLogin({
    clientId: GOOGLE_CLIENT_ID,
    onSuccess: goolgeSuccess,
    onFailure: authenticationFailure,
    cookiePolicy: "single_host_origin",
  });

  const googleAuthentication = () => {
    if (!loading) {
      loginButtonSetter("GOOGLE");
      setLoading(true);
      signIn();
    }
  };

  const emailLogin = (user) => {
    setLoading(true);
    mutateLogin(user);
  };

  const emailAuthentication = async (user) => {
    setLoading(true);
    Registration({
      variables: {
        ...user,
      },
    });
  };

  return {
    loading,
    loginButton,
    emailLogin,
    loginButtonSetter,
    authenticationFailure,
    googleAuthentication,
    emailAuthentication,
  };
}
export default useRegistration;
