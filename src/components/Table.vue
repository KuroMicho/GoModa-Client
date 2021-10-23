<template>    
    <section class="awesome-table">
        <div class="text-uppercase text-bold">id selected: {{selected}}</div>
        <table>
            <thead>
                <tr>
                    <th v-for="(obj, ind) in config" :key="ind">
                        {{ obj.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in theData" :key="index">
                    <td v-for="(obj, ind) in config" :key="ind">
                        <span v-if="obj.type === 'text'">{{row[obj.key]}}</span>
                        <ul v-if="obj.type === 'array'">
                            <li v-for="ob, in row[obj.key]" :key="ob.id">{{ ob.name }}</li>
                        </ul>
                        <label v-if="obj.type === 'checkbox'" class="form-checkbox">
                            <input type="checkbox" :value="row[obj.key]" v-model="selected">
                            <i class="form-icon"></i>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
export default {
    name: 'CustomTable',
    props: ['theData', 'config'],
    data: () => ({
        selectAll: false,
        selected: []
    }),
    select() {
        this.selected = [];
        if (!this.selectAll) {
            for (let i in this.items) {
                this.selected.push(this.items[i].id);
            }
        }
    }
}
</script>

<style scoped>

body{
	padding: 50px
}

.awesome-table {
    border: 1px solid #999;
    border-radius: 4px;
    color: #333;
    overflow: auto;
}

table {
    border-collapse: collapse;
    width: 100.1%;
}

th {
    position: sticky;
    top: 0;
    background: #ccc;
    padding: 10px 5px;
    text-align: left;
    border-bottom: 1px solid #999;
    }
        
td {
    padding: 5px 5px;
    text-align: left;
}

</style>