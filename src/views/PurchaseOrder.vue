<template>
    <div>
       <el-table
        ref="multipleTable"
        :data="
        onhandsFilter.filter(
            (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
        "    
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >
            <!--Barcode 	Name 	Description 	Price 	Color 	Number Unit 	Edit  -->
            <el-table-column property="barcode" label="Barcode" width="120" />
            <el-table-column property="name" label="Name" width="120" />
            <el-table-column property="price" label="Price" width="120" />
            <el-table-column property="inventory_onhand" label="On hand" width="120" />
            <el-table-column property="amount" label="Units" width="120" />
            
            <el-table-column label="Operations">
                <template #default="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                    >
                </template>
            </el-table-column>

            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="mini" placeholder="Type to search" />
                </template>
            </el-table-column>            
        </el-table>

        <modal-purchase
        :modalIsShow="modalIsShow"
        :product="productSelected"
        :suppliers="suppliers"
        @setAmount="setAmount"
        @close_modal="handleAddModal"
        />        

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalPurchase from '../components/ModalPurchase.vue'
export default {
    name: 'purchase-order',
    components: {
        ModalPurchase,
    },
    data: () => ({
        multipleSelection: [],
        search: '',
        modalIsShow: false,
        productSelected: undefined,        
    }),    
    computed: {
        ...mapGetters(["onhandsFilter", "suppliers"]),
    },
    methods: {
        setAmount(id, amount, supplierid) {
            //this.onhandsFilter[index] = amount;
            console.info("id ", id, "  amount: ", amount, " supplier: ", supplierid);
            /*
            let val = {
                productid: id,
                productamount: amount,
            }
            this.$store.dispatch("setProductOnHandsFilterAmount", val);
            */
        },        
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleEdit(index, row) {
            console.log(index, row);
            this.productSelected = row;
            this.handleAddModal(true);            
        },
        handleAddModal(value) {
            this.modalIsShow = value;
        },        
    },
    mounted () {
        this.$store.dispatch("getSuppliers");
    },
}
</script>

<style scoped>

</style>
