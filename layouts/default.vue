<template>
  <v-app rtl>
    <v-navigation-drawer
      v-model="drawer"
      color="primary"
      class="rounded-tl-xl rounded-bl-xl"
      right
      absolute
      fixed
      height="100%"
      :mini-variant.sync="mini"
      :app="!$vuetify.breakpoint.smAndDown"
    >
      <v-icon
        size="16"
        color="white"
        class="rounded-lg pa-1 float-left mt-5"
        style="background-color: #3f3f40; cursor: pointer"
        @click="drawer = !drawer"
        >mdi-arrow-right</v-icon
      >
      <v-list-item>
        <v-img
          max-width="198"
          :src="require('~/assets/Images/layout/logo.png')"
        ></v-img>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          class="my-2 py-1"
          link
          :to="item.link"
          @click="activePage = item.title"
        >
          <!--Single List-->
          <div v-if="!item.submenue" class="d-flex align-center">
            <v-list-item-icon>
              <v-icon color="gray500">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content class="mr-5">
              <v-list-item-title class="gray900--text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </div>
          <!--Group List-->
          <div v-else class="d-flex justify-space-between">
            <v-list-group>
              <template #activator>
                <v-icon class="mr-4" color="gray500">mdi-forum</v-icon>
                <v-list-item-content class="mr-5">
                  <v-list-item-title class="gray900--text">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="(sub, i) in item.submenue" :key="i" link>
                <v-list-item-title class="gray900--text">{{
                  sub.title
                }}</v-list-item-title>
                <v-list-item-icon>
                  <v-icon>{{ sub.icon }}</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-group>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-row class="mt-2">
        <v-col cols="1">
          <v-icon
            v-if="!drawer"
            size="16"
            color="white"
            class="rounded-lg pa-1"
            style="background-color: #3f3f40; cursor: pointer"
            @click="drawer = !drawer"
            >mdi-arrow-left</v-icon
          >
        </v-col>
        <v-col cols="6" md="3">
          <h2 class="text-right">{{ activePage }}</h2>
        </v-col>
      </v-row>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  middleware: 'auth',
  data() {
    return {
      activePage: 'داشبورد',
      drawer: true,
      items: [
        { title: 'خلاصه', icon: 'mdi-view-dashboard', link: '/' },
        { title: 'صفحات', icon: 'mdi-forum' },
        {
          title: 'فروش',
          icon: 'mdi-forum',
          submenue: [
            {
              title: 'لیست محصولات',
              icon: '',
            },
            {
              title: 'صورتحساب',
              icon: '',
            },
          ],
        },
        { title: 'پیام ها', icon: 'mdi-forum', link: '/test' },
        {
          title: 'احراز هویت',
          icon: 'mdi-forum',
          submenue: [
            {
              title: 'لیست محصولات',
              icon: '',
            },
            {
              title: 'صورتحساب',
              icon: '',
            },
          ],
        },
        { title: 'مستندات', icon: 'mdi-forum' },
        { title: 'اجزا', icon: 'mdi-forum' },
        { title: 'کمک', icon: 'mdi-forum' },
      ],
    }
  },
}
</script>
