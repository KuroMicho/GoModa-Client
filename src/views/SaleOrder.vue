<template>
    <div>
        <CustomTable
        v-if="onhandsFilter"
        :theData="onhandsFilter"
        :config="config"
        v-model:textValue="valueInput"
        />
    </div>
</template>

<script>
import CustomTable from '../components/Table.vue'
import { mapGetters } from "vuex";
export default {
    name: 'sale-order',
    components: {
        CustomTable,
    },
    data: () => ({
        valueInput: "",
        config: [
            {
                key: 'barcode',
                title: 'Barcode',
                type: 'text'
            },
            {
                key: 'name',
                title: 'Name',
                type: 'text'
            },
            {
                key: 'description',
                title: 'Description',
                type: 'text'
            },
            {
                key: 'price',
                title: 'Price',
                type: 'text'
            },
            {
                key: 'color',
                title: 'Color',
                type: 'array'
            },
            {
                key: 'id',
                title: 'Number Unit',
                type: 'inputdata'
            }
        ],
    }),
    computed: {
        ...mapGetters(["onhands", "onhandsFilter"]),
    },
    watch: {
        valueInput: function() {
            let value = this.valueInput;
            let result = []
            if (this.valueInput != "") {
                result = this.onhandsFilter.filter(word => word.name.toLowerCase().includes(value.toLowerCase()));
                this.$store.dispatch("setProductsOnHandsFilter", result);
            }
            else {
                this.$store.dispatch("setProductsOnHandsFilter", this.onhands);
            }
        },
    },
}
</script>

<style scoped>

</style>