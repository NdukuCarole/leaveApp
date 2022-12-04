import profile from "@/modules/profile/views/profile";
// import bioData from "@/modules/profile/components/bio-data";
// import contacts from "@/modules/profile/components/contacts";
import academic from "@/modules/profile/components/academic/AcademicList.vue";
// import experience from "@/modules/profile/components/experience/Experience.vue";
import referees from "@/modules/profile/components/referees/Referees.vue";
import attachments from "@/modules/profile/components/attachments/Attachments.vue";
import updateProfile from "@/modules/profile/components/updateProfile.vue";
// import application from "@/modules/home/components/application";

export default [
  {
    path: "/profile",
    component: profile,
    children: [
      {
        path: "academic",
        name: "Academic",
        component: academic,
      },
      // {
      //   path: "experience",
      //   name: "Experience",
      //   component: experience,
      // },
      {
        path: "referee",
        name: "Referee",
        component: referees,
      },
      {
        path: "attachment",
        name: "Attachment",
        component: attachments,
      },
      {
        path: "update-profile/:code",
        name: "updateProfile",
        component: updateProfile,
      },
    ],
  },
];
