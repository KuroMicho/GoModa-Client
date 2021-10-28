<template>
    <div class="input-field col s12">
        <select 
        v-model="value"
        :value="textValue"
        @input="$emit('update:textValue', $event.target.value)">
            <option value="" selected>Choose your option</option>
            <option v-for="(color, index) in lists" :key="index">{{ lists[index] }}</option>
        </select>
        <label>Materialize Select</label>
    </div>    
</template>

<script>
export default {
    name: 'custom-select',
    props: {
        lists: Array,
        textValue: String
    },
    emits: ["update:textValue", "input"],
    data: () => ({
        value: undefined
    }),
    watch: {
        value(newValue){
            this.$emit('input', newValue);
        }
    }
}
</script>

<style scoped>

</style>