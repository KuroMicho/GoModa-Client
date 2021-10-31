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

    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'purchase-order',
    data: () => ({
        multipleSelection: [],
        search: '',
    }),    
    computed: {
        ...mapGetters(["onhandsFilter"]),
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
    },
}
</script>

<style scoped>

</style>
