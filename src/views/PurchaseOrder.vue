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
        style="width: 65%"
        @selection-change="handleSelectionChange"
        >
            <!--Barcode 	Name 	Description 	Price 	Color 	Number Unit 	Edit  -->
            <el-table-column property="barcode" label="Barcode" width="120" />
            <el-table-column property="name" label="Name" width="120" />
            <el-table-column property="price" label="Price" width="80" />
            <el-table-column property="inventory_onhand" label="On hand" width="80" />
            <el-table-column property="amount" label="Units" width="80" />
            <el-table-column property="suppliername" label="Supplier" width="160" />
            
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

        <modal-purchase
        :modalIsShow="modalIsShow"
        :product="productSelected"
        :suppliers="suppliers"
        @setAmount="setAmount"
        @close_modal="handleAddModal"
        />        

        <div style="margin-top: 20px">
            <el-button @click="sendPurchaseOrder()">
                <router-link to="/products">Apply order</router-link>
            </el-button>
        </div>

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
        setAmount(id, amount, supplier) {
            //this.onhandsFilter[index] = amount;
            console.info("id ", id, "  amount: ", amount, " supplier: ", supplier.id);

            let val = {
                productid: id,
                productamount: amount,
                suppliername: supplier.name,
                supplierid: supplier.id,
            }
            this.$store.dispatch("setProductOnHandsFilterAmountSupplier", val);

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
        async sendPurchaseOrder() {
            console.info('sending....');
             let objSelected = this.onhandsFilter;
            for (let k in objSelected) {
                if (typeof objSelected[k] === "object") {
                //objSelected[k].amount = 0;
                    if (objSelected[k].amount > 0) {
                        console.log(objSelected[k]);
                        let data = {
                            product: objSelected[k].id,
                            number_purchases: objSelected[k].amount,
                            supplier: objSelected[k].supplierid,
                        }
                        try {
                            await this.$store.dispatch("createPurchase", data);
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
    mounted () {
        this.$store.dispatch("getSuppliers");
    },
}
</script>

<style scoped>

</style>
