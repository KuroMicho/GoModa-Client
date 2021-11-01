<template>
  <div v-show="modalIsShow" class="modal">
    <div class="modal__content">
      <SupplierForm
        class="form"
        @submit="handleSubmit"
        :validation-schema="schema"
      >
        <div class="form__header">
          <h3>Supplier:</h3>
          <i class="fa fa-times" @click="$emit('close_modal')" />
        </div>
        <div class="form__body">
          <div class="form__group">
            <div>
              <label for="name">Name:</label>
              <Field type="text" name="name" />
            </div>
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="city">City:</label>
              <Field type="text" name="city" />
            </div>
            <ErrorMessage name="city" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="address">Address:</label>
              <Field type="text" name="address" />
            </div>
            <ErrorMessage name="address" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="phone">Phone:</label>
              <Field type="text" name="phone" />
            </div>
            <ErrorMessage name="phone" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="email">Email:</label>
              <Field type="text" name="email" />
            </div>
            <ErrorMessage name="email" class="error-feedback" />
          </div>
          <button class="btn btn--add" type="submit">Add</button>
          <span class="error-feedback">{{ msg }}</span>
        </div>
      </SupplierForm>
    </div>
  </div>
</template>
<script>
import { Form as SupplierForm, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "ModalSupplier",
  data() {
    const schema = yup.object().shape({
      name: yup.string().required("name is required!").trim("Without spaces"),
      city: yup.string().required("city is required!").trim("Without spaces"),
      address: yup
        .string()
        .required("address is required!")
        .trim("Without spaces"),
      phone: yup.string().required("phone is required!").trim("Without spaces"),
      email: yup
        .string()
        .required("email is required!")
        .trim("Without spaces")
        .email("input email"),
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
  },
  components: { SupplierForm, Field, ErrorMessage },
  methods: {
    handleSubmit(data, { resetForm }) {
      this.$store
        .dispatch("suppliers/postSupplier", data)
        .then(() => {
          resetForm();
          alert("supplier added!");
        })
        .catch((error) => {
          this.msg = `${error + " something went wrong"}`;
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
  height: 60%;
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
.form__group > div > input {
  margin-top: 10px;
  border-radius: 8px;
  width: 50%;
  padding: 5px 15px;
  border: 1px solid gray;
  outline: none;
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
