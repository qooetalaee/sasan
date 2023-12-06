<template>
  <div class="auto">
    <v-row>
      <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="12" md="6">
        <v-img :src="require('~/assets/Images/login/login.jpg')" />
      </v-col>
      <v-col cols="12" md="6">
        <!--Info Box-->
        <div
          class="infoBox backgroundColor d-flex rounded-tr-pill rounded-br-pill py-5 align-center justify-center"
          :style="`border-color : ${$vuetify.theme.themes.light.primary} !important`"
        >
          <v-icon size="30" class="primary rounded-pill pa-1 ml-5"
            >mdi-account</v-icon
          >
          <p class="mt-3">جهت دسترسی به پنل ادمین وارد شوید</p>
        </div>
        <!--Main Content-->
        <div class="d-flex align-center mt-12">
          <h1 class="peydaExtraBold mb-4">ورود</h1>
          <p
            class="mx-5 thin"
            :style="`color :  ${$vuetify.theme.themes.light.tertiary}`"
          >
            |
          </p>
          <p>ادمین</p>
        </div>
        <p>لطفا نام کاربری و رمز عبور خود را واردکنید</p>
        <form @submit.prevent="login">
          <base-input
            icon="account"
            placeholder="نام کاربری"
            :model-value="username"
            @update:modelValue="(newValue) => (username = newValue)"
          />
          <base-input
            icon="lock"
            placeholder="رمز ورود"
            type="password"
            :model-value="password"
            @update:modelValue="(newValue) => (password = newValue)"
          />
          <v-row align="center" justify="space-between">
            <v-col cols="6" md="4">
              <v-btn
                :disabled="loading"
                :loading="loading"
                color="primary"
                class="elevation-0 rounded-pill px-6 py-5"
                type="submit"
                @click="login"
                >ورود</v-btn
              >
            </v-col>
            <v-col cols="6" md="4">
              <v-btn outlined class="elevation-0 underBorder" color="primary"
                >فراموشی رمز عبور</v-btn
              >
            </v-col>
            <v-col cols="6" md="4">
              <v-checkbox label="مرا به خاطر بسپار" />
            </v-col>
          </v-row>
        </form>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import BaseInput from '~/components/common/BaseInput.vue'
export default {
  components: { BaseInput },
  layout: 'login',
  data() {
    return {
      loading: false,
      username: null,
      password: null,
    }
  },
  methods: {
    async login() {
      try {
        this.loading = true
        await this.$auth.loginWith('laravelJWT', {
          data: {
            mobile: this.username,
            password: this.password,
          },
        })
        this.$router.push('/')
      } catch (error) {
        this.$toast.error('نام کاربری ویا رمز عبور نادرست میباشد')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.auto {
  margin: auto;
  max-width: 1200px;
}
.infoBox {
  border: 2px solid;
  border-left: none;
}
</style>
