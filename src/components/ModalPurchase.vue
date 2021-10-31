<template>
  <div v-show="modalIsShow" class="modal">
    <div class="modal__content">
      <AddForm class="form" aria-describedby="add form" @submit="handleSubmit">
        
        <el-form
        ref="productInfo" 
        :model="productInfo" 
        label-width="100px"
        class="demo-ruleForm"
        >
          <el-form-item label="Barcode">
            <el-form-item label="" v-if="product">{{
              product.barcode
            }}</el-form-item>
          </el-form-item>
          <el-form-item label="Name">
            <el-form-item label="" v-if="product">
              {{ product.name }}</el-form-item
            >
          </el-form-item>

          <el-form-item label="Amount" prop="amount"
          :rules="[
            { required: true, message: 'amount is required' },
            { type: 'number', message: 'amount must be a number' },
          ]">
            <el-input 
            v-model.number="productInfo.amount"
            type="amount" 
            autocomplete="off">
            </el-input>
          </el-form-item>

          <el-form-item label="Supplier">
            <el-select v-model="supplier.name" placeholder="please select your zone">
                <!--
                <el-option @click="getColor('one')" label="Zone one" value="shanghai"></el-option>
                <el-option @click="getColor('two')" label="Zone two" value="beijing"></el-option>
                -->
                <el-option v-for="(sup, ind) in suppliers" :key="ind" 
                @click="getSupplier(sup.name, ind)"
                label=""
                :value="sup.name">
                  {{ sup.name }}
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('productInfo')">Update</el-button>
            <el-button @click="handleSubmit('productInfo')">Cancel</el-button>
            <el-button @click="resetForm('productInfo')">Clean</el-button>
          </el-form-item>
        </el-form>
      </AddForm>
    </div>
  </div>
</template>

<script>
import { Form as AddForm } from "vee-validate";
export default {
  name: "modal-purchase",
  data() {
    return {
      productInfo: {
        id: undefined,
        amount: undefined,
        productSelected: undefined,
      },
      supplier: {
          id: undefined,
          name: '',
      },
    };
  },
  props: {
    modalIsShow: {
      type: Boolean,
    },
    product: undefined,
    suppliers: Array,
  },
  components: { 
    AddForm
  },
  methods: {
    handleSubmit(formName) {
      this.$emit("close_modal", false);
      this.resetForm(formName);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.productInfo.amount <= this.product.inventory_onhand && this.productInfo.amount > 0) {
          this.$emit("setAmount", this.product.id, this.productInfo.amount, this.supplier.id);
          this.handleSubmit(formName);
        } else if (!this.productInfo.amount <= this.product.inventory_onhand) {
          console.error('error no available product!!');
          return false;
        } else {
          console.error('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getSupplier(name, id) {
        console.log(name, '  hola   ', id);
        this.supplier.name = name;
        this.supplier.id = id + 1;
        
    }
  },
};
</script>
<style scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.modal__content {
  width: 60vw;
  max-width: 500px;
  position: absolute;
  background-color: #fff;
  top: 50%;
  left: 50%;
  border-radius: 8px;
  transform: translate(-50%, -50%);
}

.form {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 15px 20px;
}
.form__body {
  margin-top: 20px;
  width: 60%;
  min-width: 300px;
}
.form__group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form__group > input,
.form__group > select {
  margin-top: 10px;
  border-radius: 8px;
  width: 50%;
  padding: 5px 15px;
  border: 1px solid gray;
  outline: none;
}
.form__group > select {
  cursor: pointer;
}
.btn {
  color: white;
  cursor: pointer;
  background-color: lightcoral;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  padding: 5px 15px;
  margin-top: 20px;
}
.form__body > span {
  display: block;
  margin-top: 5px;
}
</style>

