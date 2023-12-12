<template>
  <div>
    <v-data-table
      :loading="loading"
      loading-text="درحال دریافت اطلاعات..."
      :items="items"
      :headers="headers"
      hide-default-footer
      class="elevation-0"
    >
      <template #[`item.status`]="{ item }">
        {{ convert(item.status) }}
      </template>

      <!--EDIT-->
      <template #[`item.edit`]="{ item }">
        <v-btn
          outlined
          color="tertiary"
          class="elevation-0"
          @click="$emit('edit', item)"
        >
          <v-icon> mdi-pen </v-icon>
        </v-btn>
      </template>
      <!--DELETE-->
      <template #[`item.delete`]="{ item }">
        <v-btn color="error" class="elevation-0" @click="$emit('delete', item)">
          <v-icon> mdi-delete </v-icon>
        </v-btn>
      </template>
      <!--No Data-->
      <template slot="no-data">
        <p>داده ای یافت نشد</p>
      </template>
      <!--Footer-->
    </v-data-table>
    <div>
      <v-pagination
        v-model="page"
        style="box-shadow: none !important"
        :length="pagesCount"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    pagesCount: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: 1,
    }
  },

  watch: {
    page() {
      this.$emit('page-changed', this.page)
    },
  },
  methods: {
    convert(name) {
      switch (name) {
        case 'amazing':
          return 'شگفت انگیز'
        case 'coming_soon':
          return 'به زودی'
        default:
          return 'ویترین'
      }
    },
  },
}
</script>
