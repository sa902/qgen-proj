<template>
  <div class="login-form">
    <form>
      <h1 class="login-form__title">Login</h1>
      <div class="login-form__content">
        <div class="login-form__input-field">
          <input
            class="login-form__input-field--input"
            type="email"
            v-model="email"
            placeholder="Email"
            autocomplete="nope"
          />
        </div>
        <div class="login-form__input-field">
          <input
            class="login-form__input-field--input"
            type="password"
            v-model="password"
            placeholder="Password"
            autocomplete="new-password"
          />
        </div>
      </div>
      <div class="login-form__action">
        <button class="login-form__action--button" @click="signIn">
          Sign in
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoginPage",
  data: () => ({
    email: null,
    password: null,
  }),
  computed: mapState(["isAdmin"]),
  methods: {
    signIn() {
      let loginCredentials = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("login", loginCredentials);
      if (this.isAdmin) {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/_variables.scss";

.login-form {
  background: #fff;
  width: 90%;
  margin: 65px auto;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: variables.$card-highlight__hover-box-shadow;
  @media only screen and (min-width: map-get( variables.$grid-breakpoints, "md")) {
    width: 60%;
  }
  &__title {
    padding: 35px 35px 0 35px;
    font-weight: 300;
  }

  &__content {
    padding: 35px;
    text-align: center;
  }

  &__input-field {
    padding: 12px 5px;
    &--input {
      font-size: 16px;
      display: block;
      width: 100%;
      padding: 10px 1px;
      border: 0;
      border-bottom: 1px solid #747474;
      outline: none;
      transition: all 0.2s;
      &::placeholder {
        text-transform: uppercase;
      }
      &:focus {
        border-color: #222;
      }
    }
  }
  &__action {
    display: flex;
    flex-direction: row;
    &--button {
      width: 100%;
      border: none;
      padding: 18px;
      color: #777;
      border-radius: 4px;
      transition: all 0.3s;

      &:hover {
        background: #d8d8d8;
      }
    }
  }
}
</style>
