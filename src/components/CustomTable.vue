<template>    
    <section>
        <div class="text-uppercase text-bold">select product: {{ selected }}</div>
        <div class="text-uppercase text-bold">filter by name: {{ textValue }}</div>
        <div class="col-md-6">
            <input  
            type="text" 
            class="form-control"
            :value="textValue"
            @input="$emit('update:textValue', $event.target.value)">
        </div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th v-for="(obj, ind) in config" :key="ind">
                        {{ obj.title }}
                        <label v-if="obj.type === 'checkbox'" class="form-checkbox">
                            <input type="checkbox" v-model="selectAll" @click="select">
                            <i class="form-icon"></i>
                        </label>
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
                        <label  v-if="obj.type === 'checkbox'" class="form-checkbox">
                            <input type="checkbox" :value="theData[index]" v-model="selected" @click="setSelected">
                            <i class="form-icon"></i>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
//import { mapGetters } from 'vuex';

export default {
    name: 'CustomTable',
    props: {
        theData: Object, 
        config: Object,
        textValue: String
    },
    emits: ["update:textValue"],
    data: () => ({
        selectAll: false,
        selected: []
    }),
    computed: {
         /*
        ...mapGetters({
            onhands: 'onhands',
            list: 'products'
        })
        */
    },
    methods: {
        select() {
            this.selected = [];
            if (!this.selectAll) {
                for (let i in this.theData) {
                    this.selected.push(this.theData[i]);
                }
            }
        },
        setSelect() {
            this.$emit("getSelected", this.selected);
        }
    },
    mounted() {
        //this.selected = this.onhands;
    },
    watch: {
        /*
        selected: function() {
            this.$store.dispatch("setProductsOnHand", this.selected);
        }
        */
    }
}
</script>

<style scoped>

/*
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
*/

</style>