<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <h4>عنوان محصول</h4>
        <!--Product Title-->
        <base-input
          placeholder="عنوان محصول را وارد کنید"
          @input="product.title = $event"
        />
        <p class="fijate--text guideText">
          متن راهنما : عنوان نمایشی محصولات که با این نام جستجو میشوند .
        </p>
      </v-col>
      <v-col cols="12" md="4">
        <h4>دسته بندی محصول</h4>
        <base-select :items="categories" placeholder="انتخاب دسته بندی" />
      </v-col>
      <v-col cols="12" md="4">
        <h4>مدل محصول</h4>
        <base-select :items="categories" placeholder="انتخاب مدل" />
      </v-col>
      <v-col cols="12" md="8">
        <h4>تگ های محصول</h4>
        <base-select chips :items="categories" placeholder="انتخاب برچسب" />
      </v-col>
      <v-col cols="12" md="4">
        <h4>وضعیت موجودی</h4>
        <div class="d-flex justify-space-between">
          <v-checkbox label="ویترین"></v-checkbox>
          <v-checkbox label="شگفت انگیز"></v-checkbox>
          <v-checkbox label="به زودی"></v-checkbox>
        </div>
      </v-col>
      <!--Price-->
      <v-col cols="12" md="6">
        <h4>قیمت محصول</h4>
        <br />
        <v-row>
          <v-col cols="4">
            <h5 class="primary--text">قو طلایی</h5>
            <base-input suffix="تومان" type="number" />
          </v-col>
          <v-col cols="4">
            <h5 class="primary--text">سایت دوم</h5>
            <base-input suffix="تومان" type="number" />
          </v-col>
          <v-col cols="4">
            <h5 class="primary--text">سایت سوم</h5>
            <base-input suffix="تومان" type="number" />
          </v-col>
        </v-row>
      </v-col>
      <!--Total numbers of product-->
      <v-col cols="12" md="2">
        <h4>تعداد موجودی</h4>
        <br />
        <h5 class="primary--text">تعداد موجود در انبار</h5>
        <base-input placeholder="عدد" type="number" />
      </v-col>
      <!--Offers-->
      <v-col cols="12" md="4">
        <h4>درصد تخفیف محصول</h4>
        <br />
        <v-row>
          <v-col cols="4">
            <h5 class="primary--text">قو طلایی</h5>
            <base-input suffix="درصد" type="number" />
          </v-col>
          <v-col cols="4">
            <h5 class="primary--text">سایت دوم</h5>
            <base-input suffix="درصد" type="number" />
          </v-col>
          <v-col cols="4">
            <h5 class="primary--text">سایت سوم</h5>
            <base-input suffix="درصد" type="number" />
          </v-col>
        </v-row>
        <p class="fijate--text guideText">
          متن راهنما : درصد تخفیف در سایت های مختلف میتواند متفاوت باشد .
        </p>
      </v-col>
      <!--Weights of product-->
      <v-col cols="12" md="4">
        <h4>وزن محصول</h4>
        <v-col class="d-flex" cols="12">
          <base-select
            style="max-width: 150px"
            :items="sizes"
            :model-value="newWeight.id"
            placeholder="اندازه"
            @update:modelValue="(newValue) => (newWeight.id = newValue)"
          />
          <base-input
            style="margin-right: -10px"
            type="number"
            :model-value="newWeight.weight"
            placeholder="وزن"
            suffix="گرم"
            @update:modelValue="(newValue) => (newWeight.weight = newValue)"
          />
          <v-btn
            style="margin-right: -12px; margin: -14px; margin-top: 12px"
            color="backgroundColor"
            height="48"
            class="elevation-0 rounded-lg"
            @click="addWeight"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </v-col>
        <v-col cols="12">
          <div
            v-for="(item, i) in weights"
            :key="i"
            class="d-flex backgroundColor pa-1 rounded-lg my-1"
          >
            <p class="mt-2 mr-5 grey800--text">
              {{ sizes.find((el) => el.id === item.id).title }}
            </p>
            <p class="mt-2 grey800--text mr-8 peydaLight">
              {{ item.weight + ' ' + 'گرم' }}
            </p>
            <v-btn
              color="backgroundColor"
              height="48"
              class="elevation-0 rounded-lg"
              style="margin-right: 100px"
              @click="removeWeight(item.id)"
              ><v-icon color="primary">mdi-close</v-icon></v-btn
            >
          </div>
        </v-col>
      </v-col>
      <v-col cols="1"></v-col>
      <!--How many items you have?-->
      <v-col cols="12" md="7">
        <h4 class="mb-6">تعداد حالت های موجود</h4>
        <v-col cols="12">
          <v-row
            v-for="(item, i) in sizesValue"
            :key="i"
            align="center"
            justify="space-around"
            style="max-height: 48px"
            class="mb-2 backgroundColor rounded-lg"
          >
            <v-col class="d-flex" cols="2" md="1">
              <p class="grey800--text">{{ item.name }}</p>
              <v-avatar size="30" :color="`${item.color}  mr-2`"></v-avatar>
            </v-col>
            <v-col class="d-flex justify-space-between" cols="2" md="2">
              <input
                v-model="sizesValue[i].large"
                style="max-width: 38px; margin-top: -2px; max-height: 30px"
                class="primary--text text-center"
                type="number"
              />
              <p class="primary--text ml-2">عدد</p>
              <p class="peydaLight">بزرگ</p>
            </v-col>
            <v-col class="d-flex justify-space-between" cols="2" md="2">
              <input
                v-model="sizesValue[i].small"
                style="max-width: 38px; margin-top: -2px; max-height: 30px"
                class="primary--text text-center"
                type="number"
              />
              <p class="primary--text ml-2">عدد</p>
              <p class="peydaLight">کوچک</p>
            </v-col>
            <v-col class="d-flex justify-space-between" cols="2" md="2">
              <input
                v-model="sizesValue[i].medium"
                style="max-width: 38px; margin-top: -2px; max-height: 30px"
                class="primary--text text-center"
                type="number"
              />
              <p class="primary--text ml-2">عدد</p>
              <p class="peydaLight">متوسط</p>
            </v-col>
            <v-col class="d-flex justify-space-between" cols="2" md="2">
              <input
                v-model="sizesValue[i].child"
                style="max-width: 38px; margin-top: -2px; max-height: 30px"
                class="primary--text text-center"
                type="number"
              />
              <p class="primary--text ml-2">عدد</p>
              <p class="peydaLight">کودک</p>
            </v-col>
          </v-row>
        </v-col>
        <br />
        <h4>پکیج پیشنهادی همراه محصول</h4>
        <base-select chips :items="categories" placeholder="انتخاب محصول" />
      </v-col>
      <!--Product Image-->
      <v-col cols="12" md="6">
        <h4 class="mb-6">تصاویر محصول</h4>
        <div class="backgroundColor rounded-lg pa-5">
          <v-img
            class="mx-auto"
            max-width="36"
            :src="require('~/assets/Images/product/import.svg')"
          />
          <p class="text-center mt-4">برای آپلود تصاویر محصول، کلیک نمائید</p>
          <div class="d-flex justify-center">
            <v-btn
              class="elevation-0 mx-auto"
              color="primary"
              @click="imgDialog = !imgDialog"
              >آپلود عکس</v-btn
            >
          </div>
        </div>
      </v-col>
      <!--Upload Image Dialog-->
      <v-dialog v-model="imgDialog" max-width="600" class="rounded-lg">
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
                  <!--Show uploaded image dialog-->
                  <v-dialog
                    v-if="openImgDialog"
                    v-model="openImgDialog"
                    max-width="500"
                    class="rounded-lg"
                  >
                    <v-card>
                      <v-img
                        class="rounded-lg"
                        :src="galary[i].path"
                      /> </v-card
                  ></v-dialog>
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
      <v-col cols="12" md="6">
        <h4 class="mb-6">توضیحات محصول</h4>

        <editor
          api-key="no-api-key"
          :init="{
            menubar: false,
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
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import BaseInput from '~/components/common/BaseInput.vue'
import BaseSelect from '~/components/common/BaseSelect.vue'
export default {
  components: {
    BaseInput,
    BaseSelect,
    Editor,
  },

  data() {
    return {
      imgDialog: false, // used for uploading product image
      openImgDialog: false, // used for showing uploaded image
      weights: [], // Added weights are here
      newWeight: {
        id: null,
        weight: null,
      },
      product: {
        title: '',
      },
      sizes: [
        {
          id: 1,
          title: 'کودک',
        },
        {
          id: 2,
          title: 'کوچک',
        },
        {
          id: 3,
          title: 'متوسط',
        },
        {
          id: 4,
          title: 'بزرگ',
        },
      ],
      sizesValue: [
        {
          name: 'طلایی',
          color: 'primary',
          child: 1,
          small: 1,
          medium: 1,
          large: 1,
        },
        {
          name: 'رزگلد',
          color: 'rozgold',
          child: 1,
          small: 1,
          medium: 1,
          large: 1,
        },
        {
          name: 'سفید',
          color: 'gray600',
          child: 1,
          small: 1,
          medium: 1,
          large: 1,
        },
      ],
      categories: [
        {
          id: 1,
          title: 'دسته بندی اول',
        },
        {
          id: 2,
          title: 'دسته بندی دوم',
        },
        {
          id: 3,
          title: 'دسته بندی سوم',
        },
      ],
      galary: [],
    }
  },
  methods: {
    addWeight() {
      if (this.newWeight.weight && this.newWeight.id) {
        const newValue = {
          weight: this.newWeight.weight,
          id: this.newWeight.id,
        }
        this.weights.push(newValue)
        this.newWeight.id = null
        this.newWeight.weight = null
      }
    },
    removeWeight(id) {
      const i = this.weights.findIndex((el) => el.id === id)
      this.weights.splice(i, 1)
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
    removePhoto(i) {
      this.galary.splice(i, 1)
    },
  },
}
</script>
