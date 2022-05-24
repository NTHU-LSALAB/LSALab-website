export default [
  {
    path: "/login",
    name: "LoginView",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgetView",
    component: () => import("@/views/ForgetView.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetView",
    component: () => import("@/views/ResetView.vue"),
  },
  {
    path: "/register",
    name: "RegisterView",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/oauth2callback",
    component: () => import("@/views/LoginCallback.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/Layout.vue"),
    children: [
      {
        path: "/",
        name: "HomeView",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "/member/advisor",
        component: () => import("@/views/AdvisorView.vue"),
        name: "AdvisorView",
        children: [
          {
            path: "",
            name: "AdvisorAbout",
            component: () => import("@/components/_advisor/AdvisorAbout.vue"),
          },
          {
            path: "bio",
            name: "AdvisorBio",
            component: () => import("@/components/_advisor/AdvisorBio.vue"),
          },
          {
            path: "pub",
            name: "AdvisorPub",
            component: () => import("@/components/_advisor/AdvisorPub.vue"),
          },
          {
            path: "teaching",
            name: "AdvisorTeaching",
            component: () =>
              import("@/components/_advisor/AdvisorTeaching.vue"),
          },
          {
            path: "cv",
            name: "AdvisorCV",
            component: () => import("@/components/_advisor/AdvisorCV.vue"),
          },
        ],
      },
      {
        path: "/member/student",
        name: "StudentView",
        component: () => import("@/views/StudentView.vue"),
      },
      {
        path: "/research",
        name: "ResearchView",
        component: () => import("@/views/ResearchView.vue"),
      },
      {
        path: "/research/:field",
        name: "ResearchDetailView",
        component: () => import("@/views/ResearchDetailView.vue"),
      },
      {
        path: "/pub",
        name: "PublicationView",
        component: () => import("@/views/PublicationView.vue"),
      },
      {
        path: "/competition",
        name: "CompetitionView",
        component: () => import("@/views/CompetitionView.vue"),
      },
      {
        path: "/servers",
        name: "ServerView",
        component: () => import("@/views/ServerView.vue"),
      },
      {
        path: "/connection",
        name: "ConnectionView",
        component: () => import("@/views/ConnectionView.vue"),
      },
      {
        path: "/calendar",
        name: "CalendarView",
        component: () => import("@/views/CalendarView.vue"),
      },

      {
        path: "/album",
        name: "AlbumView",
        component: () => import("@/views/AlbumView.vue"),
      },
      {
        path: "/resource",
        name: "ResourceView",
        component: () => import("@/views/ResourceView.vue"),
      },
      {
        path: "/resource/group-meeting",
        name: "Resource/GroupMeetingView",
        component: () => import("@/views/GroupMeetingView.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/resource/journal-conference-list",
        name: "Resource/JournalListView",
        component: () => import("@/views/JournalListView.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/resource/related-links",
        name: "Resource/RelatedLinksView",
        component: () => import("@/views/RelatedLinksView.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/article/:articleName",
        name: "ArticleView",
        component: () => import("@/views/ArticleView.vue"),
      },
      {
        path: "/contact",
        name: "ContactView",
        component: () => import("@/views/ContactView.vue"),
      },
      {
        path: "/not-found",
        name: "404",
        component: () => import("@/views/NotFoundView.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: "404",
    },
  },
];
