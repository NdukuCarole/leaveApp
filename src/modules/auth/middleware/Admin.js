import AdminAuthService from "../../admin/modules/auth/adminAuthService";

export default function auth({ next, router }) {
  if (!AdminAuthService.check() || AdminAuthService.user.isAdmin === 0) {
    return router.push({ name: "AdminLogin" });
  }
  return next();
}
