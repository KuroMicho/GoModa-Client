<template>
    <div>
        <!--
        <CustomTable
        v-if="onhandsFilter"
        :theData="onhandsFilter"
        :config="config"
        @setAmount="setAmount"
        v-model:textValue="valueInput"
        />
        -->

        <el-table
        ref="multipleTable"
        :data="
        onhandsFilter.filter(
            (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
        "    
        style="width: 65%"
        @selection-change="handleSelectionChange"
        >
            <!--Barcode 	Name 	Description 	Price 	Color 	Number Unit 	Edit  -->
            <el-table-column property="barcode" label="Barcode" width="120" />
            <el-table-column property="name" label="Name" width="120" />
            <el-table-column property="price" label="Price" width="120" />
            <el-table-column property="inventory_onhand" label="On hand" width="120" />
            <el-table-column property="amount" label="Units" width="120" />
            
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="mini" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                    >
                </template>
            </el-table-column>            
        </el-table>

        <modal-sale
        :modalIsShow="modalIsShow"
        :product="productSelected"
        @setAmount="setAmount"
        @close_modal="handleAddModal"
        />

        <div style="margin-top: 20px">
            <el-button @click="sendSaleOrder()">
                <router-link to="/products">Apply order</router-link>
            </el-button>
        </div>

    </div>
</template>

<script>
import ModalSale from '../components/ModalSale.vue'
//import CustomTable from '../components/Table.vue'
import { mapGetters } from "vuex";
export default {
    name: 'sale-order',
    components: {
//        CustomTable,
        ModalSale,
    },
    data: () => ({
        valueInput: "",
        multipleSelection: [],
        search: '',
        modalIsShow: false,
        productSelected: undefined,
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
                key: 'amount',
                title: 'Number Unit',
                type: 'inputdata'
            },
            {
                key: '',
                title: 'Edit',
                type: 'text'
            },          
        ],
    }),
    methods: {
        setAmount(id, amount) {
            //this.onhandsFilter[index] = amount;
            console.info("id ", id, "  amount: ", amount);

            let val = {
                productid: id,
                productamount: amount,
            }
            this.$store.dispatch("setProductOnHandsFilterAmount", val);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleEdit(index, row) {
            this.productSelected = row;
            this.handleAddModal(true);
        },
        handleAddModal(value) {
            this.modalIsShow = value;
        },
        async sendSaleOrder() {
            console.info('sending....');
             let objSelected = this.onhandsFilter;
            for (let k in objSelected) {
                if (typeof objSelected[k] === "object") {
                //objSelected[k].amount = 0;
                    if (objSelected[k].amount > 0) {
                        console.log(objSelected[k]);
                        let data = {
                            product: objSelected[k].id,
                            number_shipments: objSelected[k].amount,
                        }
                        try {
                            await this.$store.dispatch("createSale", data);
                            this.$store.dispatch("setProductsOnHandsFilter", []);
                            this.$store.dispatch("getProducts");
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
            }
        }
    },
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

body {
  font-family: Helvetica, sans-serif;
  font-weight: 400;
}

</style>