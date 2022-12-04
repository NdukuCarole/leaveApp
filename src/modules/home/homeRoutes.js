import home from "@/modules/home/views/home";
import jobCard from "@/modules/home/components/jobCard";
import jobList from "@/modules/home/components/jobList";
import application from "@/modules/home/components/application";
import myApplications from "@/modules/home/components/my-applications";
// import myApplication from "@/modules/home/components/my-application";
import jobQuestions from "@/modules/home/components/jobQuestions";
import experience from "@/modules/profile/components/experience/Experience";
import contact from "@/modules/profile/components/contact/Contact";
import academic from "@/modules/profile/components/academic/AcademicList";
import referees from "@/modules/profile/components/referees/Referees";
import attachments from "@/modules/profile/components/attachments/Attachments";
import checkAuth from "@/modules/home/components/checkAuth";
import profileHeader from "@/modules/home/components/profileHeader";
import AcademicCard from "@/modules/profile/components/academic/AcademicCard";
import ExperienceCard from "@/modules/profile/components/experience/ExperienceCard";
import RefereesCard from "@/modules/profile/components/referees/RefereesCard";
import AttachmentCard from "@/modules/profile/components/attachments/AttachmentCard";

export default [
  {
    path: "/home",
    component: home,
    children: [
      {
        path: "list",
        name: "Home",
        component: jobList,
      },
      {
        path: "profile",
        name: "Profile",
        component: profileHeader,
      },
      {
        path: "/job-card/:code",
        name: "Job",
        component: jobCard,
      },
      {
        path: "/check/:code",
        name: "Check",
        component: checkAuth,
      },

      {
        path: "/application/:code",
        name: "Application",
        component: application,
        children: [
          {
            path: "contact",
            name: "Contact",
            component: contact,
          },
          {
            path: "academic",
            name: "Academic",
            component: academic,
          },

          {
            path: "experience",
            name: "Experience",
            component: experience,
          },
          {
            path: "referees",
            name: "Referees",
            component: referees,
          },
          {
            path: "attachments",
            name: "Attachments",
            component: attachments,
          },
          {
            path: "card/:line?",
            name: "AcademicCard",
            component: AcademicCard,
          },
          {
            path: "exp-card/:line?",
            name: "ExperienceCard",
            component: ExperienceCard,
          },
          {
            path: "ref-card/:line?",
            name: "RefereesCard",
            component: RefereesCard,
          },
          {
            path: "att-card/:line?",
            name: "AttachmentCard",
            component: AttachmentCard,
          },
        ],
      },
      {
        path: "/my-applications",
        name: "My Applications",
        component: myApplications,
      },

      {
        path: "/job-questions/:code",
        name: "Questions",
        component: jobQuestions,
      },
    ],
  },
];
