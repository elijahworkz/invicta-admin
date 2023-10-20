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
                name: 'resourceDetail'
            },
            {
                path: '/resource/navigation',
                component: () => import('@/views/Nav/Index.vue')
            },
            {
                path: '/navigation/create',
                component: () => import('@/views/Nav/Edit.vue')
            },
            {
                path: '/navigation/:id',
                component: () => import('@/views/Nav/Edit.vue')
            },
            {
                path: '/navigation/:id/items',
                component: () => import('@/views/Nav/ItemsEdit.vue')
            },
            {
                path: '/group/:id/permission', 
                component: () => import('@/views/Permission/Edit.vue')
            },
            {
                path: '/tools/commands',
                component: () => import('@/views/Commands/Index.vue'),
            }
        ]
    })


    return router
}