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
            <v-radio label="`ویترین" value="vitrin"></v-radio>
            <v-radio label="`شگفت انگیز" value="amazing"></v-radio>
            <v-radio label="`به زودی" value="soon"></v-radio>
          </div>
        </v-radio-group>
      </v-col>
      <v-col cols="6"></v-col>
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
      <!--Price-->
      <v-col v-for="(input, i) in data.companies" :key="i" cols="12" md="2">
        <h4>قیمت در {{ input.web_name }}</h4>
        <base-input
          placeholder="قیمت محصول"
          type="number"
          :model-value="data.companies[i].amount"
          suffix="درصد"
          @update:modelValue="
            (newValue) => (data.companies[i].amount = newValue)
          "
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
                  {{ i === 0 ? 'تصویر معرف' : `عکس شماره : ${i + 1}` }}
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
  </div>
</template>
<script>
import BaseInput from '~/components/common/BaseInput.vue'
import BaseSelect from '~/components/common/BaseSelect.vue'
export default {
  components: {
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      editImageDialog: false,
      newTag: null,
      data: null,
      galary: [],
      tags: [],
      imgDialog: false,
    }
  },
  mounted() {
    this.getProductInfo()
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
  },
}
</script>
