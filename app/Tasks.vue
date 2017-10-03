<template lang="pug">
div
    p Number of tasks: {{ tasks.length }}
    ul
        li(v-for="task in tasks")
            task(v-bind:task="task" v-on:select="selectTask(task)")
    p Selected task is {{ selectedTask.name }}
</template>

<script>
import $ from 'jquery';
import Task from './Task.vue';

export default {
    components: {
        Task: Task
    },
    data() {
        return {
            tasks: [],
            selectedTask: {}
        };
    },
    methods: {
        selectTask(task) {
            // this.selectedTask = task;
            this.$router.push('/tasks/' + task.id);
        }
    },
    created() {
        $.getJSON('/tasks').done(response => this.tasks = response);
    }
}
</script>

<style>
</style>
