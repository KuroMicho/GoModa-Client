<template>    
    <section class="awesome-table">
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
                            <input type="checkbox" :value="theData[index]" v-model="selected">
                            <i class="form-icon"></i>
                        </label>
                        <span v-if="obj.type === 'inputdata'">{{ row[obj.key] }}</span>

                        <label  v-if="obj.type === 'inputdata'" class="form-checkbox">
                            <input 
                            v-model.lazy="amount" 
                            @keyup.enter="update(index)" 
                            @keypress="isNumber($event)"
                            >
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
        textValue: String,
        getSelected: Promise,
    },
    emits: ["update:textValue"],
    data: () => ({
        selectAll: false,
        selected: [],
        amount: undefined,
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
        update(index) {
            this.$emit("setAmount", this.theData[index].id, this.amount);
            this.amount = "";            
        },
        resetInput() {
            try {
                console.log('reset input');
                //this.$refs["number"].$el.focus();
                this.$refs.email.focus();
                this.$refs["email"].value = "";
            } catch (error) {
                console.error(error);
            }
        },
        isNumber(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        }        
    },
    mounted() {
        //this.selected = this.onhands;
    },
    watch: {
        selected: function() {
            //this.$store.dispatch("setProductsOnHand", this.selected);
            this.$emit("getSelected", this.selected);
        }
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