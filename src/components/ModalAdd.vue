<template>
  <div v-show="modalIsShow" class="modal">
    <div class="modal__content">
      <AddForm class="form" @submit="handleSubmit" :validation-schema="schema">
        <div class="form__header">
          <h3>Add Product:</h3>
          <i class="fa fa-times" @click="$emit('close_modal')" />
        </div>
        <div class="form__body">
          <div class="form__group">
            <div>
              <label for="barcode">Barcode:</label>
              <Field type="text" name="barcode" />
            </div>
            <ErrorMessage name="barcode" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="name">Name:</label>
              <Field type="text" name="name" />
            </div>
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="image">Image Url:</label>
              <Field type="url" name="image" />
            </div>
            <ErrorMessage name="image" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="description">Description:</label>
              <Field type="textarea" name="description" />
            </div>
            <ErrorMessage name="description" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="color">Color:</label>
              <Field as="select" name="color" @change="handleColorOption">
                <option value="" disabled>-- Please select one color --</option>
                <option value="azul">azul</option>
                <option value="blanco">blanco</option>
                <option value="negro">negro</option>
                <option value="rosado">rosado</option>
                <option value="violeta">violeta</option>
                <option value="verde">verde</option>
              </Field>
            </div>
            <ErrorMessage name="color" class="error-feedback" />
          </div>
          <Tag :item="color" @pop_item="pop_item" />
          <div class="form__group">
            <div>
              <label for="size">Size:</label>
              <Field as="select" name="size" @change="handleSizeOption">
                <option value="" disabled>-- Please select one size --</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </Field>
            </div>
            <ErrorMessage name="size" class="error-feedback" />
          </div>
          <Tag :item="size" @pop_item="pop_item" />
          <div class="form__group">
            <div>
              <label for="material">Material:</label>
              <Field as="select" name="material" @change="handleMaterialOption">
                <option value="" disabled
                  >-- Please select one material --</option
                >
                <option value="Algodon">Algodon</option>
                <option value="Cuero">Cuero</option>
                <option value="Seda">Seda</option>
                <option value="Sintetico">Sintetico</option>
              </Field>
            </div>
            <ErrorMessage name="material" class="error-feedback" />
          </div>
          <Tag :item="material" @pop_item="pop_item" />
          <div class="form__group">
            <div>
              <label for="price">Price:</label>
              <Field type="number" name="price" />
            </div>
            <ErrorMessage name="price" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="minimum_required">Minimum Required:</label>
              <Field type="text" name="minimum_required" />
            </div>
            <ErrorMessage name="minimum_required" />
          </div>

          <button class="btn btn--add" type="submit">Add</button>
          <span class="error-feedback">{{ msg }}</span>
        </div>
      </AddForm>
    </div>
  </div>
</template>
<script>
import { Form as AddForm, Field, ErrorMessage } from "vee-validate";
import Tag from "./Tag.vue";
import * as yup from "yup";

export default {
  name: "ModalAdd",
  data() {
    const schema = yup.object().shape({
      barcode: yup
        .string()
        .required("barcode is required!")
        .trim("Without spaces"),
      price: yup
        .string()
        .required("price is required!")
        .trim("Without spaces"),
      name: yup
        .string()
        .required("name is required!")
        .trim("Without spaces"),
      image: yup
        .string()
        .matches(
          /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png)+$/,
          "Input a valid image url ended on jpg, jpeg, and png"
        )
        .required("image is required!")
        .trim("Without spaces"),
      description: yup
        .string()
        .required("description is required!")
        .trim("Without spaces"),
      color: yup.string().required("color is required!"),
      material: yup.string().required("material is required!"),
      size: yup.string().required("size is required!"),
      minimum_required: yup
        .string()
        .required("minimun products are required!")
        .trim("Without spaces"),
    });
    return {
      msg: "",
      color: {},
      size: {},
      material: {},
      schema,
    };
  },
  props: {
    modalIsShow: {
      type: Boolean,
    },
  },
  components: { AddForm, Field, ErrorMessage, Tag },
  methods: {
    handleSubmit(data, { resetForm }) {
      const { color, size, material, ...rest } = data;
      console.log(color, size, material);
      const newData = {
        color: this.color,
        size: this.size,
        material: this.material,
        ...rest,
      };
      this.$store
        .dispatch("products/postProduct", newData)
        .then(() => {
          resetForm();
          this.color = {};
          this.size = {};
          this.material = {};
          alert("product added");
        })
        .catch((error) => {
          this.msg = `${error.response?.data?.data?.barcode?.[0] ||
            error.response?.data?.data?.image?.[0] ||
            error + " something went wrong"}`;
        });
    },
    async handleColorOption(opt) {
      let colorObj = {};

      if (this.color == null || Object.keys(this.color).length <= 0) {
        colorObj = Object.assign({ 0: opt.target.value });
        return (this.color = colorObj);
      }

      if (Object.values(this.color).includes(opt.target.value))
        return alert("Color already choosed!");

      const colors = Object.keys(this.color);
      const size = colors.length - 1;
      colorObj = {
        ...this.color,
        [Number(colors[size]) + 1]: opt.target.value,
      };
      this.color = colorObj;
    },
    async handleSizeOption(opt) {
      let sizeObj = {};

      if (this.size == null || Object.keys(this.size).length <= 0) {
        sizeObj = Object.assign({ 0: opt.target.value });
        return (this.size = sizeObj);
      }
      if (Object.values(this.size).includes(opt.target.value))
        return alert("size already choosed!");
      const sizes = Object.keys(this.size);
      const size = sizes.length - 1;
      sizeObj = {
        ...this.size,
        [Number(sizes[size]) + 1]: opt.target.value,
      };
      this.size = sizeObj;
    },
    async handleMaterialOption(opt) {
      let materialObj = {};

      if (this.material == null || Object.keys(this.material).length <= 0) {
        materialObj = Object.assign({ 0: opt.target.value });
        return (this.material = materialObj);
      }
      if (Object.values(this.material).includes(opt.target.value))
        return alert("Material already choosed!");
      const materials = Object.keys(this.material);
      const size = materials.length - 1;
      materialObj = {
        ...this.material,
        [Number(materials[size]) + 1]: opt.target.value,
      };
      this.material = materialObj;
    },
    async pop_item() {
      alert("pop!");
    },
  },
  emits: ["pop_item", "close_modal"],
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
  height: 80%;
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
