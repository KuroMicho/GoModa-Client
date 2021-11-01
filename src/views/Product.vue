<template>
  <div class="modal">
    <div class="modal__content">
      <EditForm class="form" @submit="handleSubmit">
        <div class="form__header">
          <h3>Edit Product:</h3>
          <router-link to="/products">
            <i class="fa fa-times" />
          </router-link>
        </div>
        <div class="form__body">
          <div class="form__group">
            <div>
              <label for="barcode">Barcode:</label>
              <Field type="text" name="barcode" v-model="product.barcode" />
            </div>
            <ErrorMessage name="barcode" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="name">Name:</label>
              <Field type="text" name="name" v-model="product.name" />
            </div>
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="image">Image Url:</label>
              <Field type="url" name="image" v-model="product.image" />
            </div>
            <ErrorMessage name="image" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="description">Description:</label>
              <Field
                type="textarea"
                name="description"
                v-model="product.description"
              />
            </div>
            <ErrorMessage name="description" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="color">Color:</label>
              <select
                name="color"
                @change="handleColorOption"
                v-model="product.color"
              >
                <option value="" disabled>-- Please select one color --</option>
                <option value="azul">azul</option>
                <option value="blanco">blanco</option>
                <option value="negro">negro</option>
                <option value="rosado">rosado</option>
                <option value="violeta">violeta</option>
                <option value="verde">verde</option>
              </select>
            </div>
            <ErrorMessage name="color" class="error-feedback" />
          </div>
          <Tag :item="color" @pop_item="pop_item" />
          <div class="form__group">
            <div>
              <label for="size">Size:</label>
              <select
                name="size"
                @change="handleSizeOption"
                v-model="product.size"
              >
                <option value="" disabled>-- Please select one size --</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            <ErrorMessage name="size" class="error-feedback" />
          </div>
          <Tag :item="size" @pop_item="pop_item" />
          <div class="form__group">
            <div>
              <label for="material">Material:</label>
              <select
                name="material"
                @change="handleMaterialOption"
                v-model="product.material"
              >
                <option value="" disabled>
                  -- Please select one material --
                </option>
                <option value="Algodon">Algodon</option>
                <option value="Cuero">Cuero</option>
                <option value="Seda">Seda</option>
                <option value="Sintetico">Sintetico</option>
              </select>
            </div>
            <ErrorMessage name="material" class="error-feedback" />
          </div>
          <Tag :item="material" @pop_item="pop_item" />
          <div class="form__group">
            <div>
              <label for="price">Price:</label>
              <Field type="number" name="price" v-model="product.price" />
            </div>
            <ErrorMessage name="price" class="error-feedback" />
          </div>
          <div class="form__group">
            <div>
              <label for="minimum_required">Minimum Required:</label>
              <Field
                type="text"
                name="minimum_required"
                v-model="product.minimum_required"
              />
            </div>
            <ErrorMessage name="minimum_required" />
          </div>

          <button class="btn btn--add" type="submit">Update</button>
          <span class="error-feedback">{{ msg }}</span>
        </div>
      </EditForm>
    </div>
  </div>
</template>
<script>
import { Form as EditForm, Field, ErrorMessage } from "vee-validate";
import Tag from "../components/Tag.vue";
import { mapState } from "vuex";
export default {
  name: "Product",
  data() {
    return {
      loading: false,
      msg: "",
      color: {},
      size: {},
      material: {},
    };
  },
  components: { EditForm, Field, ErrorMessage, Tag },
  props: ["id"],
  computed: { ...mapState("products", ["product"]) },
  mounted() {
    this.loading = true;
    this.$store.dispatch("products/getProduct", this.id).then(() => {
      this.color = this.product.color;
      this.material = this.product.material;
      this.size = this.product.size;
    });
  },
  methods: {
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
        return alert("Size already choosed!");

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
    async handleSubmit(data) {
      const { color, material, size, ...rest } = data;
      console.log(color, material, size);
      const dataUpdated = {
        color: this.color,
        material: this.material,
        size: this.size,
        ...rest,
      };
      this.$store
        .dispatch("products/putProduct", { data: dataUpdated, id: this.id })
        .then(() => this.$router.push("/products/"))
        .catch((error) => {
          console.error(error);
        });
    },
    async pop_item() {
      alert("pop!");
    },
  },
  emits: ["pop_item"],
};
</script>
<style scoped>
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(189, 93, 93, 0.5);
  z-index: 1000;
}

.modal__content {
  width: 80vw;
  max-width: 600px;
  position: absolute;
  background-color: #fff;
  top: 50%;
  left: 50%;
  border-radius: 8px;
  transform: translate(-50%, -50%);
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
  display: flex;
  flex-direction: column;
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
</style>
