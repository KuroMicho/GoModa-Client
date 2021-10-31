<template>

  <div id="tab">
      <!--
    <CustomTable
      v-if="products" 
      :theData="products" 
      :config="config"
      @getSelected="getSelected"
      v-model:textValue="valueInput"
    />
    -->
    <el-table
    ref="multipleTable"

    :data="
      products.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )
    "    
    style="width: 95%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column property="barcode" label="Barcode" width="120" />
    <el-table-column property="name" label="Name" width="120" />
    <el-table-column property="price" label="Price" width="120" />
    <el-table-column property="minimum_required" label="Minimum" width="120" />
    <el-table-column property="inventory_received" label="Received" width="120" />
    <el-table-column property="inventory_shipped" label="Shipped" width="120" />
    <el-table-column property="inventory_onhand" label="On Hand" width="120" />
    <el-table-column property="description" label="Description" show-overflow-tooltip />

    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="Type to search" />
      </template>
    </el-table-column>
    
  </el-table>

  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">Clear selection</el-button>
    <el-button @click="saveSelected()">
      <router-link to="/sale-order">Sale Order</router-link>
    </el-button>
    <el-button @click="saveSelected()">
      <router-link to="/purchase-order">Purchase Order</router-link>
    </el-button>
  </div>

  <el-row class="tac">
    <el-col :span="12">
      <h5>Default selects</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>Colors</span>
          </template>
          <el-menu-item-group >
            <el-menu-item 
            @click="getColor(ind)" v-for="(row, ind) in colors" :key="ind" index="ind"
            >
              {{ row }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <i class="el-icon-location"></i>
            <span>Materials</span>
          </template>
          <el-menu-item-group >
            <el-menu-item 
            @click="getMaterial(ind)"  v-for="(row, ind) in materials" :key="ind" index="ind"
            >
              {{ row }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>        
        
    <!--
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
    -->

  </div>
</template>

<script>
//import CustomTable from '../components/Table.vue'
//import CustomSelect from '../components/Select.vue'
//import CustomButton from '../components/Button.vue'
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
//    CustomTable,
//    CustomSelect,
//    CustomButton,
  },
  data: () => ({
    tableData: undefined,
    multipleSelection: [],
    selected: [],
    search: '',
    valueInput: "",
    color: "",
    material: "",
    value: "",
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
      this.$store.dispatch("setProductsOnHands", this.multipleSelection);
      //this.$store.dispatch("setProductsOnHands", this.selected);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
      
      this.$store.dispatch("getProductsByName", "");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.info(val);
    },
    handleOpen(key, keyPath)  {
        console.log(key, keyPath);
        
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },  
    getColor(index) {
        this.$store.dispatch("getProductsByItem", this.colors[index]);
    },
    getMaterial(index) {
        this.$store.dispatch("getProductsByItem", this.materials[index]);
    },    
  },  
  mounted () {
    this.getProducts();
  },
  watch: {
        valueInput: function() {
            this.$store.dispatch("getProductsByName", this.valueInput);
        },
    }
}
</script>

<style scoped>

body {
  font-family: Helvetica, sans-serif;
  font-weight: 400;
}

</style>
