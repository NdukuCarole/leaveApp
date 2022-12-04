import application from "@/modules/application/views/application";
import apply from "@/modules/application/components/applyLeave";
import applications from "@/modules/application/components/applications";

export default [
  {
    path: "/app",
    component: application,

    children: [
      {
        path: "make-application",
        name: "Application",
        component: apply,
      },
      {
        path: "all-applications",
        name: "Allpplicationa",
        component: applications,
      },
    ],
  },
];
