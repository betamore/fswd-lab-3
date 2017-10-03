<template lang="pug">
span(v-on:click="taskSelected") {{ task.id }}: {{ task.name }}
</template>

<script>
export default {
    props: ['task'],
    methods: {
        taskSelected: function() {
            this.$emit('select', this.task);
        }
    }
};
</script>

<style>
</style>
