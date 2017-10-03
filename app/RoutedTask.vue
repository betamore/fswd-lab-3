<template lang="pug">
div
    p Task {{ id }}
    p Task name: {{ task.name }}
</template>

<script>
import $ from 'jquery';

export default {
    props: ['id'],
    data() {
        return {
            task: {}
        }
    },
    created() {
        $.getJSON('/tasks/' + this.id).done(response => this.task = response);
    }
}
</script>

<style>
</style>
