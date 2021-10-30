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
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >
            <!--Barcode 	Name 	Description 	Price 	Color 	Number Unit 	Edit  -->
            <el-table-column property="barcode" label="Barcode" width="120" />
            <el-table-column property="name" label="Name" width="120" />
            <el-table-column property="price" label="Price" width="120" />

            <el-table-column property="amount" label="Units" width="120" />
            <el-table-column property="description" label="Description" show-overflow-tooltip />
            
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



    </div>
</template>

<script>

//import CustomTable from '../components/Table.vue'
import { mapGetters } from "vuex";
export default {
    name: 'sale-order',
    components: {
//        CustomTable,
    },
    data: () => ({
        valueInput: "",
        multipleSelection: [],
        search: '',

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
            console.log(index, row);
        },        
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

</style>