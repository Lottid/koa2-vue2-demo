import Vue from 'vue'
import Router from 'vue-router'
import todo from '../components/todo.vue';
import ajax from '../components/ajax.vue';
import upload from '../components/upload.vue';
import uploadAjax from '../components/uploadAjax.vue';

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/todo',
        name: 'todo',
        component: todo
    },
    {
        path: '/ajax',
        name: 'ajax',
        component: ajax
    },{
        path: '/upload',
        name: 'upload',
        component: upload
    },{
        path: '/uploadAjax',
        name: 'uploadAjax',
        component: uploadAjax
    }]
})
    // components: {
    //     todo: todo,
    //     ajax: ajax,
    //     upload: upload,
    //     uploadAjax: uploadAjax
    // }
