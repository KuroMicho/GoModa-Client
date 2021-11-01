<template>
  <div v-show="modalIsShow" class="modal">
    <div class="modal__content">
      <PurchaseForm
        class="form"
        @submit="handleSubmit"
        :validation-schema="schema"
      >
        <div class="form__header">
          <h3>Sale:</h3>
          <i class="fa fa-times" @click="$emit('close_modal')" />
        </div>
        <div class="form__body">
          <div class="form__group">
            <div>
              <label for="product">Product:</label>
              <Field :value="productId" type="text" name="product" disabled />
            </div>
            <ErrorMessage name="product" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="number_purchases">Number Purchases:</label>
              <Field type="text" name="number_purchases" />
            </div>
            <ErrorMessage name="number_purchases" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="supplier">Supplier:</label>
              <Field as="select" name="supplier">
                <option
                  v-for="supplier in suppliers"
                  :key="supplier.id"
                  :value="supplier.id"
                >
                  {{ supplier.name }}
                </option>
              </Field>
            </div>
            <ErrorMessage name="supplier" class="error-feedback" />
          </div>
          <button class="btn btn--add" type="submit">Add</button>
          <span class="error-feedback">{{ msg }}</span>
        </div>
      </PurchaseForm>
    </div>
  </div>
</template>
<script>
import { Form as PurchaseForm, Field, ErrorMessage } from "vee-validate";
import { mapState } from "vuex";
import * as yup from "yup";

export default {
  name: "ModalPurchase",
  data() {
    const schema = yup.object().shape({
      number_purchases: yup
        .number()
        .required("number purchases is required!")
        .positive("must be positive number")
        .integer()
        .moreThan(0, "not nullable values"),
      supplier: yup.number().required("select a supplier"),
    });
    return {
      msg: "",
      loading: false,
      schema,
    };
  },
  props: {
    modalIsShow: {
      type: Boolean,
    },
    productId: {
      type: String,
    },
  },
  components: { PurchaseForm, Field, ErrorMessage },
  computed: { ...mapState("suppliers", ["suppliers"]) },
  mounted() {
    this.loading = true;
    this.$store.dispatch("suppliers/getSuppliers");
  },
  methods: {
    handleSubmit(data) {
      this.$store
        .dispatch("purchases/postPurchase", { id: this.productId, data: data })
        .then(() => {
          this.$store.dispatch(
            "purchases/getPurchasesByProduct",
            this.productId
          );
          alert("purchased!");
        })
        .catch((error) => {
          this.msg = `${error} something went wrong"}`;
        });
    },
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
  width: 80vw;
  height: 50%;
  max-width: 600px;
  position: absolute;
  background-color: #fff;
  top: 50%;
  left: 50%;
  border-radius: 8px;
  transform: translate(-50%, -50%);
  overflow-y: scroll;
  scrollbar-width: thin;
}

.form__header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.form__header > i {
  cursor: pointer;
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

.form__group > div {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.form__group > div > input,
.form__group > div > select {
  margin-top: 10px;
  border-radius: 8px;
  width: 50%;
  padding: 5px 15px;
  border: 1px solid gray;
  outline: none;
}

.form__group > div > select {
  cursor: pointer;
}

.form__group > span {
  /* error feedback */
  display: block;
  margin-top: 10px;
  background-color: lightcoral;
  width: 100%;
  padding: 10px 5px;
  color: #fff;
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
