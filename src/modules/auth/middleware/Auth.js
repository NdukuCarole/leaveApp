import { AuthService } from "../index";

export default function auth({ next, router }) {
  if (!AuthService.check() || AuthService.user.isAdmin === 1) {
    return router.push({ name: "Login" });
  }
  return next();
}
