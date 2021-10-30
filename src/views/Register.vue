<template>
  <div class="register">
    <div class="alert" v-show="alertIsShow">
      <AlertCustom
        :alertIsShow="alertIsShow"
        :msg="msg"
        :type="'warning'"
        @close_alert="alertIsShow = false"
      ></AlertCustom>
    </div>
    <div class="form-container">
      <span class="form-loading" v-show="loading">
        <div class="lds-heart"><div></div></div>
      </span>
      <router-link to="/">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWFvNll2oAoBW1Cvkpc8HkbVVxs8gA0xdij4-OKBCWwYcarQpJ9IokRiBamKXHDnVKkag&usqp=CAU"
          alt="logo gomoda"
        />
      </router-link>
      <Form @submit="handleRegister" :validation-schema="schema">
        <div class="form-group">
          <div class="field-container">
            <i class="fa fa-user" />
            <Field
              name="username"
              placeholder=" username"
              type="text"
              class="form-control"
            />
          </div>
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="field-container">
            <i class="fas fa-envelope" />
            <Field
              name="email"
              placeholder=" email"
              type="text"
              class="form-control"
            />
          </div>
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="field-container">
            <i class="fas fa-smile" />
            <Field
              name="first_name"
              placeholder=" first name"
              type="text"
              class="form-control"
            />
          </div>
          <ErrorMessage name="first_name" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="field-container">
            <i class="fas fa-smile-beam" />
            <Field
              name="last_name"
              placeholder=" last name"
              type="text"
              class="form-control"
            />
          </div>
          <ErrorMessage name="last_name" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="field-container">
            <i class="fa fa-key" />
            <Field
              name="password"
              placeholder="password"
              type="password"
              class="form-control"
            />
          </div>
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn" :disabled="loading">
            <span>sign up</span>
          </button>
        </div>
      </Form>
      <router-link to="login">You already have an account?</router-link>
    </div>
  </div>
</template>
<script>
import AlertCustom from "../components/AlertCustom.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "register",
  components: {
    AlertCustom,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .min(6)
        .max(12)
        .required("username is required!"),
      email: yup
        .string()
        .email()
        .required("email is required!"),
      first_name: yup.string().required("first name is required!"),
      last_name: yup.string().required("last name is required!"),
      password: yup
        .string()
        .min(6)
        .max(12)
        .required("password is required!"),
    });
    return {
      alertIsShow: false,
      loading: false,
      msg: "",
      schema,
    };
  },
  methods: {
    handleRegister(user) {
      this.loading = true;
      this.$store
        .dispatch("auth/register", user)
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch((error) => {
          this.loading = false;
          this.msg = `${error.response?.data?.error?.username?.[0] ||
            error.response?.data?.error?.email?.[0] ||
            error + " server error"}`;
          this.alertIsShow = true;
        });
    },
  },
  emits: ["close_alert"],
};
</script>
<style scoped>
.register {
  background-color: #6e5085;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
  scroll-behavior: smooth;
  width: 100%;
}

.form-container {
  background-color: white;
  padding: 10px 20px;
  width: 30vw;
  min-width: 375px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  position: relative;
}

.form-loading {
  position: absolute;
  z-index: 20;
  background-color: rgba(110, 80, 133, 0.4);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container * img {
  height: 150px;
  width: 150px;
}

.field-container {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 30px;
  border: 1px solid gray;
}

.field-container i {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px 20px;
  border-right: 1px solid gray;
}

.form-group {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.field-container input {
  width: 100%;
  padding: 10px 20px;
  outline: none;
  margin-left: 50px;
  border-left: none;
  border: none;
}

.field-container input::placeholder {
  color: black;
}

.field-container:focus-within {
  border: 1px solid violet;
  box-shadow: 0 0 3px 3px rgba(162, 71, 173, 0.2);
}

.radio_option {
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5px;
}

.radio_option > div > span {
  display: block;
  margin-top: 10px;
}

.form-group > span {
  display: block;
  margin-top: 10px;
  background-color: lightcoral;
  width: 100%;
  padding: 10px 5px;
  color: #fff;
}

button {
  background: lightcoral;
  height: 35px;
  line-height: 35px;
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 1.1em;
  margin: 20px 0;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: rgb(224, 109, 109);
}

.form-container > a {
  color: gray;
  text-decoration: none;
}

.lds-heart {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
  transform-origin: 40px 40px;
}
.lds-heart div {
  top: 32px;
  left: 32px;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #fff;
  animation: lds-heart 1.2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}
.lds-heart div:after,
.lds-heart div:before {
  content: " ";
  position: absolute;
  display: block;
  width: 32px;
  height: 32px;
  background: #fff;
}
.lds-heart div:before {
  left: -24px;
  border-radius: 50% 0 0 50%;
}
.lds-heart div:after {
  top: -24px;
  border-radius: 50% 50% 0 0;
}
@keyframes lds-heart {
  0% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  39% {
    transform: scale(0.85);
  }
  45% {
    transform: scale(1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(0.9);
  }
}

.alert {
  position: absolute;
  top: 0;
  right: 0;
  width: calc(500px - 10vw);
  min-width: 400px;
  z-index: 1000;
}
</style>
