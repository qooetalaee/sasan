<template>
  <v-data-table :items="items" :headers="headers" class="elevation-0">
    <template #[`item.status`]="{ item }">
      {{ convert(item.status) }}
    </template>

    <!--EDIT-->
    <template #[`item.edit`]="{ item }">
      <v-btn color="primary" class="elevation-0" @click="$emit('edit', item)">
        <v-icon> mdi-pen </v-icon>
      </v-btn>
    </template>

    <!--DELETE-->
    <template #[`item.delete`]="{ item }">
      <v-btn
        color="secondary"
        class="elevation-0"
        @click="$emit('delete', item)"
      >
        <v-icon> mdi-delete </v-icon>
      </v-btn>
    </template>
  </v-data-table>
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
  },
  methods: {
    convert(name) {
      switch (name) {
        case 'amazing':
          return 'شگفت انگیز'
        default:
          return 'نمیدونم'
      }
    },
  },
}
</script>
