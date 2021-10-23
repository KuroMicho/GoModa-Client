<template>
  <div id="tab">
    <CustomTable 
      v-if="products" 
      :theData="products" 
      :config="config" 
      :style="{height: '600px'}"
    />
  </div>
</template>

<script>
import CustomTable from '../components/Table.vue'
import { mapActions, mapState } from "vuex";

export default {
  components: {
    CustomTable
  },
  data: () => ({
    tableData: undefined,
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
        key: 'minimum_required',
        title: 'Minimum',
        type: 'text'
      },
      {
        key: 'inventory_received',
        title: 'Received',
        type: 'text'
      },
      {
        key: 'inventory_shipped',
        title: 'Shipped',
        type: 'text'
      },
      {
        key: 'inventory_onhand',
        title: 'On hand',
        type: 'text'
      },
      {
        key: 'id',
        title: 'Check',
        type: 'checkbox'
      }

    ]
  }),
  computed: {
    ...mapState(["products"]),
  },
  methods: {
    ...mapActions(["getProducts"]),
  },
  mounted () {
    this.getProducts()
  },
}
</script>

<style scoped>

body {
  font-family: Helvetica, sans-serif;
  font-weight: 400;
}

</style>
