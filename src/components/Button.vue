<template>
    <!--
    <button 
    class="btn waves-effect waves-light" 
    type="submit" 
    name="action"
    @click="setSelect($event)"
    >
        Submit
        <i class="material-icons right">send</i>
    </button>-->
    <a class="waves-effect waves-light btn-large"
    href="#"
    @click="setSelect($event)"
    >
        <i class="material-icons left">cloud</i>
        button
    </a>

</template>

<script>

export default {
    name: 'custom-button',
    computed: {

    },
    methods: {
        setSelect(e) {
            this.$emit("saveSelected", e);
        }
    }

}
</script>

<style scoped>

</style>
