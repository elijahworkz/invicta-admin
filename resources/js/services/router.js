import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
const Home = () => import('@/views/Home.vue')

export const createRouterInstance = (base = null) => {
    const router = createRouter({
        history: createWebHistory(base),
        linkActiveClass: 'active',
        routes: [
            {
                path: '/',
                component: Home
            },
            {
                path: '/resource/:handle',
                component: () => import('@/views/ResourceIndex.vue'),
                name: 'resourceIndex',
                props: true
            },
            {
                path: '/resource/:handle/create',
                component: () => import('@/views/Resource/Edit.vue'),
                name: 'resourceCreate',
                props: to => ({data: to.meta.data})                
            },
            {
                path: '/resource/:handle/:id/edit',
                component: () => import('@/views/Resource/Edit.vue'),
                name: 'resourceEdit',
                props: to => ({data: to.meta.data})
            },
            {
                path: '/resource/:handle/:id',
                component: () => import('@/views/Resource/Detail.vue'),
                name: 'resourceDetail',
                props: to => ({...to.meta.data})
            },
            {
                path: '/navigation',
                component: () => import('@/views/Nav/Index.vue'),
                name: 'navIndex',
                props: to => ({...to.meta.data})
            },
            {
                path: '/navigation/create',
                component: () => import('@/views/Nav/Edit.vue'),
                name: 'navCreate',
                props: to => ({...to.meta.data})
            },
            {
                path: '/navigation/:id',
                component: () => import('@/views/Nav/Edit.vue'),
                name: 'navEdit',
                props: to => ({...to.meta.data}),
            },
            {
                path: '/navigation/:id/items',
                component: () => import('@/views/Nav/ItemsEdit.vue'),
                name: 'navEditItems',
                props: to => ({...to.meta.data}),
            },
            {
                path: '/group/:id/permission', 
                component: () => import('@/views/Permission/Edit.vue'),
                props: to => ({...to.meta.data}),
            },
            {
                path: '/tools/commands',
                component: () => import('@/views/Commands/Index.vue'),
                props: to => ({...to.meta.data}),
            }
        ]
    })


    return router
}