import { createRouter, createWebHistory } from "vue-router";
import AppHome from "./views/AppHome.vue";
import AppContact from "./views/AppContact.vue";
import AppAbout from "./views/AppAbout.vue";
import MangaShow from "./views/MangaShow.vue";
import AppTerms from "./views/AppTerms.vue";
import AppCookies from "./views/AppCookies.vue";
import AppPrivacy from "./views/AppPrivacy.vue";
import AppFaq from "./views/AppFAQ.vue";
import Cart from "./components/Cart.vue";
import Checkout from "./components/checkout.vue";
import AppThanksOrder from './Views/AppThanksOrder.vue';
import WishList from "./views/WishList.vue";
import Not_found from "./views/Not_found.vue";
import AppManga from "./views/AppManga.vue";
import { ref } from 'vue';

const loading = ref(false);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      name: "AppHome",
      component: AppHome,
    },
    {
      path: "/about",
      name: "about",
      component: AppAbout,
    },
    {
      path: "/contact",
      name: "contact",
      component: AppContact,
    },
    {
      path: "/manga",
      name: "AppManga",
      component: AppManga,
    },
    {
      path: "/manga/:slug",
      name: "MangaShow",
      component: MangaShow,
    },
    {
      path: "/terms",
      name: "terms",
      component: AppTerms,
    },
    {
      path: "/privacy",
      name: "privacy",
      component: AppPrivacy,
    },
    {
      path: "/cookies",
      name: "cookies",
      component: AppCookies,
    },
    {
      path: "/FAQ",
      name: "FAQ",
      component: AppFaq,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout,
    },
    {
      path: "/thanks",
      name: "thanks",
      component: AppThanksOrder,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not_found",
      component: Not_found,
    },
    {
      path: "/wish-list",
      name: "WishList",
      component: WishList,
    },
  ],
scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    } else {
        return { top: 0 };
    }
}
});  

router.beforeEach((to, from, next) => {
  loading.value = true;
  setTimeout(() => {
    next();
  }, 1000);
});

router.afterEach(() => {
  loading.value = false;
});

export { router, loading };