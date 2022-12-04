import profile from "@/modules/profile/views/profile";
import updateProfile from "@/modules/profile/components/updateProfile.vue";

export default [
  {
    path: "/profile",
    component: profile,
    children: [
      {
        path: "update-profile",
        name: "updateProfile",
        component: updateProfile,
      },
    ],
  },
];
