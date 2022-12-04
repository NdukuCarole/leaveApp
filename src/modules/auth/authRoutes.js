import AuthLayout from "./views/authLayout";
import RequestAccess from "./components/requestAccess";
import ForgotPassword from "./components/forgotPassword";
import Password from "./components/password";
import Login from "@/modules/auth/components/login";
import Verify from "@/modules/auth/components/Verify";
import Register from "./components/Register";

export default [
  {
    path: "/",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "Login",
        component: Login,
      },
      {
        path: "forgot-password",
        name: "forgotPassword",
        component: ForgotPassword,
      },
      {
        path: "password/:code",
        name: "setPassword",
        component: Password,
      },
      {
        path: "request-access",
        name: "RequestAccess",
        component: RequestAccess,
      },

      {
        path: "verify",
        name: "Verify",
        component: Verify,
      },

      {
        path: "register/:code",
        name: "Register",
        component: Register,
      },
    ],
  },
];
