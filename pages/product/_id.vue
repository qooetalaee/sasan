<template>
  <div>
    <div v-if="!data" class="d-flex align-center justify-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-row v-else>
      <v-col cols="12" md="4">
        <!--Product Title-->
        <h4>عنوان محصول</h4>
        <base-input
          placeholder="عنوان محصول را وارد کنید"
          :model-value="data.name"
          @update:modelValue="(newValue) => (data.name = newValue)"
        />
      </v-col>
      <!--Add Tags-->
      <v-col cols="12" md="4">
        <h4>تگ جدید</h4>
        <base-input
          placeholder="نام برچسب جدید را وارد کنید"
          :model-value="newTag"
          @update:modelValue="(newValue) => (newTag = newValue)"
        />
        <v-btn
          width="100%"
          outlined
          color="gray500"
          class="elevation-0"
          @click="addNewTag"
          >ایجاد</v-btn
        >
      </v-col>
      <!--Product Tags-->
      <v-col cols="12" md="4">
        <h4>تگ های محصول</h4>
        <base-select
          chips
          :items="tags"
          placeholder="انتخاب برچسب"
          :model-value="data.tags"
          @update:modelValue="(newValue) => (data.tags = newValue)"
        />
      </v-col>
      <!--Product Status-->
      <v-col cols="12" md="4">
        <h4>وضعیت موجودی</h4>
        <v-radio-group v-model="data.status">
          <div class="d-flex justify-space-between">
            <v-radio label="`ویترین" value="showcase"></v-radio>
            <v-radio label="`شگفت انگیز" value="amazing"></v-radio>
            <v-radio label="`به زودی" value="coming_soon"></v-radio>
          </div>
        </v-radio-group>
      </v-col>

      <!--Price-->
      <v-col v-for="(input, i) in data.companies" :key="i" cols="12" md="2">
        <h4>قیمت در {{ input.web_name }}</h4>
        <base-input
          placeholder="قیمت محصول"
          type="number"
          suffix="درصد"
          :model-value="data.companies[i].pivot.percentage"
          @update:modelValue="
            (newValue) => (data.companies[i].pivot.percentage = newValue)
          "
        />
      </v-col>
      <!--Releated Products-->
      <v-col cols="12" md="4">
        <h4>پکیج پیشنهادی همراه محصول</h4>
        <base-select
          :items="relatedProducts"
          placeholder="انتخاب محصول"
          :model-value="data.related_products[0]"
          @update:modelValue="
            (newValue) => (data.related_products[0] = newValue)
          "
        />
      </v-col>
      <!--Meta Title-->
      <v-col cols="12" md="4">
        <h4>عنوان متا</h4>
        <base-input
          placeholder="متا تایتل"
          :model-value="data.meta_title"
          @update:modelValue="(newValue) => (data.meta_title = newValue)"
        />
      </v-col>
      <!--Meta Description-->
      <v-col cols="12" md="4">
        <h4>توضیحات متا</h4>
        <base-input
          placeholder="متا دیسکریپشن"
          :model-value="data.meta_description"
          @update:modelValue="(newValue) => (data.meta_description = newValue)"
        />
      </v-col>
      <!--Table-->
      <v-col cols="12">
        <DataTable
          :items="data.available_modes"
          :headers="headers"
          @edit="editValues($event)"
        />
      </v-col>
      <!--Product Image-->
      <v-col cols="12" md="6">
        <h4>تصویر شاخص</h4>
        <v-img class="rounded-lg" :src="data.image" />
        <div class="d-flex align-center justify-space-between mt-2">
          <v-btn
            class="elevation-0"
            width="48%"
            color="gray500"
            outlined
            @click="$refs.featuredImage.click()"
            >تغییر عکس شاخص</v-btn
          >
          <input
            ref="featuredImage"
            type="file"
            style="display: none"
            @change="setFeaturedImage"
          />
          <v-btn
            class="elevation-0"
            width="48%"
            color="gray500"
            outlined
            @click="editImageDialog = !editImageDialog"
            >تغییر گالری</v-btn
          >
        </div>
      </v-col>
      <!--Description-->
      <v-col cols="12" md="6">
        <h4 class="mb-6">توضیحات محصول</h4>
        <editor
          v-model="data.description"
          api-key="lcsg3n1q3yfew7ukoivpxl8oexya132i3ukqxjuzfhrutic8"
          :init="{
            menubar: false,
            height: 410,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
          }"
        />
      </v-col>
    </v-row>
    <!--Edit Image Dialog-->
    <v-dialog v-model="editImageDialog" max-width="600" class="rounded-lg">
      <v-card class="pa-5">
        <v-icon
          color="primary"
          style="cursor: pointer"
          @click="imgDialog = !imgDialog"
          >mdi-close</v-icon
        >
        <br />
        <br />
        <div style="max-width: 95%" class="mx-auto">
          <h3 class="titletxt--text">بارگذاری تصاویر</h3>
          <br />
          <v-row>
            <v-col v-if="!galary.length > 0" cols="12" md="6">
              <div class="backgroundColor pa-8 rounded-lg">
                <h3 class="text-center gray600--text">
                  برای شروع، تصویری را آپلود نمائید
                </h3>
              </div></v-col
            >
            <v-col v-else cols="12" md="6">
              <div
                v-for="(img, i) in galary"
                :key="i"
                class="d-flex pa-1 rounded-lg mb-2"
                :class="i === galary.length - 1 ? 'backgroundColor' : ''"
              >
                <div class="mt-3">
                  <v-img
                    max-width="30"
                    :src="require('~/assets/Images/product/file-upload.svg')"
                  />
                </div>
                <p class="titletxt--text mr-2 mt-3">
                  {{ `عکس شماره : ${i + 1}` }}
                </p>
                <v-spacer> </v-spacer>

                <v-img
                  v-if="galary[i].path"
                  max-width="50"
                  class="rounded-lg"
                  :src="galary[i].path"
                  @click="openImgDialog = !openImgDialog"
                />
                <v-icon
                  color="primary"
                  size="20"
                  style="cursor: pointer"
                  @click.prevent="removePhoto(i)"
                  >mdi-close</v-icon
                >
              </div>
            </v-col>
            <!--Upload Image-->
            <v-col cols="12" md="6">
              <div
                class="backgroundColor pa-5 rounded-lg"
                @click="$refs.file.click()"
              >
                <div
                  class="white pa-2 rounded-pill mx-auto"
                  style="max-width: max-content"
                >
                  <v-img
                    class="mx-auto"
                    max-width="25"
                    :src="require('~/assets/Images/product/import2.svg')"
                  />
                </div>
                <p class="primary--text text-center">اپلود تصویر محصول</p>
                <input
                  ref="file"
                  type="file"
                  style="display: none"
                  @change="upload"
                />
              </div>
              <br />
            </v-col>
          </v-row>
        </div>
        <br />
      </v-card>
    </v-dialog>
    <!--Edit Value Dialog-->
    <v-dialog v-model="editValueDialog" max-width="450" class="rounded-lg">
      <v-card class="pa-6">
        <v-row justify="space-around">
          <div v-for="(ipt, i) in inputs" :key="i">
            <p>{{ ipt.title }}</p>
            <base-input
              :placeholder="ipt.title"
              :model-value="newValue[ipt.value]"
              @update:modelValue="(va) => (newValue[ipt.value] = va)"
            />
          </div>
          <v-btn
            width="98%"
            color="primary"
            class="elevation-0"
            @click="saveValue"
            >ذخیره تغییرات</v-btn
          >
        </v-row>
      </v-card>
    </v-dialog>
    <v-btn class="elevation-0" color="primary" @click="updateProduct"
      >ذخیره تغییرات</v-btn
    >
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import BaseInput from '~/components/common/BaseInput.vue'
import BaseSelect from '~/components/common/BaseSelect.vue'
import DataTable from '~/components/common/DataTable.vue'

export default {
  components: {
    BaseInput,
    BaseSelect,
    DataTable,
    Editor,
  },
  data() {
    return {
      newValue: {},
      inputs: [
        {
          title: 'موجودی کودک',
          value: 'count_size_kids',
        },
        {
          title: 'موجودی بزرگ',
          value: 'count_size_large',
        },
        {
          title: 'موجودی متوسط',
          value: 'count_size_medium',
        },
        {
          title: 'موجودی کوچک',
          value: 'count_size_small',
        },
        {
          title: 'وزن کودک',
          value: 'weight_kid',
        },
        {
          title: 'وزن بزرگ',
          value: 'weight_large',
        },
        {
          title: 'وزن متوسط',
          value: 'weight_medium',
        },
        {
          title: 'وزن کوچک',
          value: 'weight_small',
        },
      ],
      relatedProducts: [],
      releated: [],
      editImageDialog: false,
      editValueDialog: false,
      newTag: null,
      data: null,
      galary: [],
      tags: [],
      imgDialog: false,
      headers: [
        {
          text: 'رنگ',
          value: 'color_name',
          align: 'start',
          sortable: false,
        },
        {
          text: 'موجودی کودک',
          value: 'count_size_kids',
          align: 'start',
          sortable: false,
        },
        {
          text: 'موجودی بزرگ',
          value: 'count_size_large',
          align: 'start',
          sortable: false,
        },
        {
          text: 'موجودی متوسط',
          value: 'count_size_medium',
          align: 'start',
          sortable: false,
        },
        {
          text: 'موجودی کوچک',
          value: 'count_size_small',
          align: 'start',
          sortable: false,
        },
        {
          text: 'وزن کوچک',
          value: 'weight_kid',
          align: 'start',
          sortable: false,
        },
        {
          text: 'وزن متوسط',
          value: 'weight_medium',
          align: 'start',
          sortable: false,
        },
        {
          text: 'وزن کوچک',
          value: 'weight_small',
          align: 'start',
          sortable: false,
        },
        {
          text: 'وزن بزرگ',
          value: 'weight_large',
          align: 'start',
          sortable: false,
        },
        {
          text: 'ویرایش',
          value: 'edit',
          align: 'start',
          sortable: false,
        },
      ],
    }
  },
  mounted() {
    this.getProductInfo()
    this.getReleatedProducts()
  },
  methods: {
    async getProductInfo() {
      const response = await this.$product.getAll(
        `?filter[id]=${this.$route.params.id}`
      )
      response.data[0].tags.forEach((element) => {
        this.tags.push(element)
      })
      this.data = response.data[0]
    },
    addNewTag() {
      this.tags.push(this.newTag)
      this.newTag = null
    },
    upload(e) {
      try {
        this.galary.push({
          file: e.target.files[0],
          path: URL.createObjectURL(e.target.files[0]),
        })
      } catch (error) {
        this.$toast.error('بارگذاری محصول با شکست مواجه شد')
      }
    },
    setFeaturedImage(e) {
      try {
        this.featuredImage = {
          file: e.target.files[0],
          path: URL.createObjectURL(e.target.files[0]),
        }
        this.data.image = this.featuredImage.path
      } catch (error) {
        this.$toast.error('بارگذاری محصول با شکست مواجه شد')
      }
    },
    removePhoto(i) {
      this.galary.splice(i, 1)
    },
    async getReleatedProducts() {
      const resposne = await this.$product.getAll('?filter[name]=اکسسوری')
      resposne.data.forEach((el) => {
        this.relatedProducts.push({
          title: el.name,
          id: el.id,
        })
      })
    },
    editValues(value) {
      this.newValue = value
      this.editValueDialog = true
    },
    saveValue() {
      const idx = this.data.available_modes.findIndex(
        (el) => el.id === this.newValue.id
      )
      this.data.available_modes[idx] = this.newValue
      this.editValueDialog = false
    },
    async updateProduct() {
      try {
        const form = new FormData()
        if (this.featuredImage) form.append('image', this.featuredImage.file)
        form.append('name', this.data.name)
        form.append('description', this.data.description)
        form.append('is_gold', 1)
        form.append('categories', this.data.categories)
        form.append('meta_title', this.data.meta_title)
        form.append('meta_description', this.data.meta_description)
        form.append('tags', this.data.tags)
        // Set Available Mods
        for (let i = 0; i < this.data.available_modes.length; i++) {
          form.append(
            `available_mode[${i}][name]`,
            this.data.available_modes[i].color_name
          )
          form.append(
            `available_mode[${i}][count_size_large]`,
            this.data.available_modes[i].count_size_large
          )
          form.append(
            `available_mode[${i}][count_size_medium]`,
            this.data.available_modes[i].count_size_medium
          )
          form.append(
            `available_mode[${i}][count_size_small]`,
            this.data.available_modes[i].count_size_small
          )
          form.append(
            `available_mode[${i}][count_size_kids]`,
            this.data.available_modes[i].count_size_kids
          )
        }
        // Set Weights
        form.append(`weight[large]`, this.data.available_modes[0].weight_large)
        form.append(`weight[kid]`, this.data.available_modes[0].weight_kid)
        form.append(`weight[small]`, this.data.available_modes[0].weight_small)
        form.append(
          `weight[medium]`,
          this.data.available_modes[0].weight_medium
        )
        let total = 0
        this.data.available_modes.forEach((el) => {
          total += Number(el.count_size_kids)
          total += Number(el.count_size_large)
          total += Number(el.count_size_medium)
          total += Number(el.count_size_small)
        })
        form.append('sum_count', total)
        // Set Companies
        for (let i = 0; i < this.data.companies.length; i++) {
          form.append(`companies[${i}][id]`, this.data.companies[i].id)
          form.append(
            `companies[${i}][type]`,
            this.data.companies[i].pivot.type
          )
          form.append(
            `companies[${i}][type_action]`,
            this.data.companies[i].pivot.type_action
          )
          form.append(
            `companies[${i}][percentage]`,
            Number(Math.abs(this.data.companies[i].pivot.percentage))
          )
          form.append(`companies[${i}][status]`, 1)
          form.append('id', this.$route.params.id)
        }
        // Set Galaries
        if (this.galary.length > 0)
          for (let i = 0; i < this.galary.length; i++) {
            form.append(`gallery_images[${i}]`, this.galary[i].file)
          }
        form.append('status', this.data.status)
        form.append('related_products', this.data.related_products)
        await this.$product.update(form, this.$route.params.id)
        this.$toast.success('محصول با موفقیت بروز شد')
      } catch (error) {
        this.$toast.error('بروزرسانی محصول با شکست مواجه شد')
        console.log('ERR IS : ', error)
      }
    },
  },
}
</script>
