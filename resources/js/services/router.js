import {
    createRouter,
    createWebHistory,
    createWebHashHistory,
} from "vue-router";
const Home = () => import("@/pages/Home.vue");

export const createRouterInstance = (base = null) => {
    const router = createRouter({
        history: createWebHistory(base),
        linkActiveClass: "active",
        routes: [
            {
                path: "/",
                component: Home,
            },
            {
                path: "/resource/:handle",
                component: () => import("@/pages/ResourceIndex.vue"),
                name: "resourceIndex",
                props: true,
            },
            {
                path: "/resource/:handle/create",
                component: () => import("@/pages/ResourceEdit.vue"),
                name: "resourceCreate",
                props: (to) => ({ data: to.meta.data }),
            },
            {
                path: "/resource/:handle/:id/edit",
                component: () => import("@/pages/ResourceEdit.vue"),
                name: "resourceEdit",
                props: (to) => ({ data: to.meta.data }),
            },
            {
                path: "/resource/:handle/:id",
                component: () => import("@/pages/ResourceDetail.vue"),
                name: "resourceDetail",
                props: (to) => ({ ...to.meta.data }),
            },
            {
                path: "/navigation/:id/items",
                component: () => import("@/pages/NavigationEdit.vue"),
                name: "navEditItems",
            },
            {
                path: "/group/:id/permissions",
                component: () => import("@/pages/PermissionEdit.vue"),
            },
            {
                path: "/settings",
                component: () => import("@/pages/Settings.vue"),
                props: (to) => ({ data: to.meta.data }),
            },
            {
                path: "/tools/commands",
                component: () => import("@/pages/CommandsIndex.vue"),
                props: (to) => ({ ...to.meta.data }),
            },
        ],
    });

    return router;
};
