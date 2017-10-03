import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Vue from 'vue';
import VueRouter from 'vue-router'
import Tasks from './Tasks.vue';
import RoutedTask from './RoutedTask.vue';

$(function() {

    // Vue.component('my-component', {
    //     props: ['property'],
    //     template: '<p>My data is {{ property }}</p>',
    // });
    //
    Vue.use(VueRouter);

    var routes = [
        {
            path: '/', component: { template: '<p>Hi</p>' },
        },
        {
            path: '/tasks', component: Tasks
        },
        {
            path: '/tasks/:id', component: RoutedTask, props: true
        }
    ];

    var router = new VueRouter({ routes: routes });

    var app = new Vue({
        router: router
    }).$mount('#vue');

    // var app = new Vue({
    //     routes: routes,
    //     components: {
    //         task: Task
    //     },
    //     data: {
    //         message: 'Your message here',
    //         text_field: 'starting value 2',
    //         password_field: '',
    //         number_field: '',
    //         tasks: [],
    //         selectedTask: {}
    //     },
    //     created: function() {
    //         $.getJSON('/tasks').done(response => this.tasks = response);
    //     },
    //     computed: {
    //         isFormCompleted: function() {
    //             return !!(this.text_field && this.password_field && this.number_field);
    //         }
    //     },
    //     methods: {
    //         doAThing: function() {
    //             alert("Hi!");
    //         },
    //         selectTask: function(task) {
    //             console.log('selecting', task);
    //             this.selectedTask = task;
    //         }
    //     }
    // }).mount('#vue');

    // var app2 = new Vue({
    //     el: '#vue-2',
    //     template: '<my-component v-bind:property=property></my-component>',
    //     data: {
    //         property: 'Something'
    //     }
    // });

    window.app = app;
});
