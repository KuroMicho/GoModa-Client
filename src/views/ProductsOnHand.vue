<template>
  <div id="tab">
    <CustomTable
      v-if="products" 
      :theData="products" 
      :config="config"
      @getSelected="getSelected"
      v-model:textValue="valueInput"
    />
    <custom-select 
      :lists="colors"
      v-model:textValue="color"
    />
    <div>{{ color }}</div>
    <custom-select 
      :lists="materials"
      v-model:textValue="material"
    />
    <div>{{ material }}</div>
    <custom-button 
    @saveSelected="saveSelected"
    />
    <div>{{ onhands }}</div>

  </div>
</template>

<script>
import CustomTable from '../components/Table.vue'
import CustomSelect from '../components/Select.vue'
import CustomButton from '../components/Button.vue'
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    CustomTable,
    CustomSelect,
    CustomButton,
  },
  data: () => ({
    tableData: undefined,
    selected: [],
    valueInput: "",
    color: "",
    material: "",
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
    ...mapGetters(["products", "colors", "materials", "onhands"]),
  },
  methods: {
    ...mapActions(["getProducts", "getProductsByName", "getProductsByItem"]),
    getSelected(data) {
      this.selected = data;
    },
    saveSelected() {
      this.$store.dispatch("setProductsOnHands", this.selected);
    },
  },
  mounted () {
    this.getProducts();
  },
  watch: {
        valueInput: function() {
            this.$store.dispatch("getProductsByName", this.valueInput);
        },
        color: function() {
            this.$store.dispatch("getProductsByItem", this.color);
        },
        material: function() {
            this.$store.dispatch("getProductsByItem", this.material);
        }
    }
}
</script>

<style scoped>

body {
  font-family: Helvetica, sans-serif;
  font-weight: 400;
}

</style>
