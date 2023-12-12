<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <h4>عنوان محصول</h4>
        <!--Product Title-->
        <base-input
          placeholder="عنوان محصول را وارد کنید"
          :model-value="body.name"
          @update:modelValue="(newValue) => (body.name = newValue)"
        />
        <p class="fijate--text guideText">
          متن راهنما : عنوان نمایشی محصولات که با این نام جستجو میشوند .
        </p>
      </v-col>
      <v-col cols="12" md="4">
        <h4>دسته بندی محصول</h4>
        <base-select
          :items="categories"
          placeholder="انتخاب دسته بندی"
          :model-value="body.categories"
          @update:modelValue="(newValue) => (body.categories = newValue)"
        />
      </v-col>
      <v-col cols="12" md="4">
        <h4>مدل محصول</h4>
        <base-select
          :items="designs"
          placeholder="انتخاب مدل"
          :model-value="body.design_code"
          @update:modelValue="(newValue) => (body.design_code = newValue)"
        />
      </v-col>
      <v-col cols="12" md="3">
        <h4>تگ جدید</h4>
        <base-input
          placeholder="نام برچسب را وارد نمائید"
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
      <v-col cols="12" md="5">
        <h4>تگ های محصول</h4>
        <base-select
          chips
          :items="tags"
          placeholder="انتخاب برچسب"
          :model-value="body.tags"
          @update:modelValue="(newValue) => (body.tags = newValue)"
        />
      </v-col>
      <v-col cols="12" md="4">
        <h4>وضعیت موجودی</h4>
        <v-radio-group v-model="body.status">
          <div class="d-flex justify-space-between">
            <v-radio label="`ویترین" value="showcase"></v-radio>
            <v-radio label="`شگفت انگیز" value="amazing"></v-radio>
            <v-radio label="`به زودی" value="coming_soon"></v-radio>
          </div>
        </v-radio-group>
      </v-col>
      <!--Total numbers of product-->
      <v-col cols="12" md="4">
        <h4>تعداد موجودی</h4>
        <br />
        <h5 class="primary--text">تعداد موجود در انبار</h5>
        <base-input disabled :placeholder="getTotalCount" type="number" />
      </v-col>
      <!--Offers-->
      <v-col cols="12" md="8">
        <h4>درصد افزایش قیمت</h4>
        <br />
        <v-row>
          <v-col cols="4">
            <h5 class="primary--text">قو طلایی</h5>
            <base-input
              no-min
              suffix="درصد"
              type="number"
              :model-value="companies[0].amount"
              @update:modelValue="
                (newValue) => (companies[0].amount = newValue)
              "
            />
          </v-col>
          <v-col cols="4">
            <h5 class="primary--text">سایت دوم</h5>
            <base-input
              suffix="درصد"
              type="number"
              :model-value="companies[1].amount"
              @update:modelValue="
                (newValue) => (companies[1].amount = newValue)
              "
            />
          </v-col>
          <v-col cols="4">
            <h5 class="primary--text">سایت سوم</h5>
            <base-input disabled suffix="درصد" type="number" />
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
            placeholder="اندازه"
            :model-value="newWeight.id"
            @update:modelValue="(newValue) => (newWeight.id = newValue)"
          />
          <base-input
            style="margin-right: -10px"
            type="number"
            placeholder="وزن"
            suffix="گرم"
            :model-value="newWeight.weight"
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
      <!--How many items you have?-->
      <v-col cols="12" md="8">
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
                min="0"
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
                min="0"
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
                min="0"
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
                min="0"
              />
              <p class="primary--text ml-2">عدد</p>
              <p class="peydaLight">کودک</p>
            </v-col>
          </v-row>
        </v-col>
        <br />
        <h4>پکیج پیشنهادی همراه محصول</h4>
        <base-select
          :items="relatedProducts"
          placeholder="انتخاب محصول"
          :model-value="related_products"
          @update:modelValue="(newValue) => (related_products = newValue)"
        />
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
          v-model="body.description"
          api-key="lcsg3n1q3yfew7ukoivpxl8oexya132i3ukqxjuzfhrutic8"
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
      <v-col cols="12" md="4">
        <h4>متا تایتل</h4>
        <base-input
          placeholder="عنوان متا"
          :model-value="body.meta_title"
          @update:modelValue="(newValue) => (body.meta_title = newValue)"
        />
      </v-col>
      <v-col cols="12" md="4">
        <h4>متا دیسکریپشن</h4>
        <base-input
          placeholder="توضیحات متا"
          :model-value="body.meta_description"
          @update:modelValue="(newValue) => (body.meta_description = newValue)"
        />
      </v-col>
      <v-col cols="12" md="4">
        <h4>نامک</h4>
        <base-input
          placeholder="آدرس محصول"
          :model-value="body.slug"
          @update:modelValue="(newValue) => (body.slug = newValue)"
        />
      </v-col>
    </v-row>
    <v-btn
      color="primary"
      class="elevation-0 float-left"
      @click="createDialog = !createDialog"
      >ثبت محصول</v-btn
    >
    <v-dialog v-model="createDialog" max-width="300">
      <v-card class="pa-5">
        <h3 class="text-center">آیا از درخواست خود اطمینان دارید؟</h3>
        <br />
        <div class="d-flex justify-space-between">
          <v-btn
            color="primary"
            class="elevation-0"
            width="48%"
            :loading="loading"
            @click="createProduct"
            >ایجاد</v-btn
          >
          <v-btn
            color="secondary"
            class="elevation-0"
            width="48%"
            @click="createDialog = !createDialog"
            >لغو</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
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
      newTag: null,
      tags: [],
      relatedProducts: [],
      loading: false,
      related_products: [],
      body: {
        is_gold: 1,
        name: null,
        description: null,
        categories: null,
        status: null,
        design_code: null,
        meta_title: null,
        meta_description: null,
        tags: [],
        weight: {
          kid: null,
          small: null,
          medium: null,
          large: null,
        },
      },
      companies: [
        {
          id: 1,
          type: 'percentage',
          // type_action: this.amount > 0 ? 'increase' : 'decrease',
          type_action: 'increase',
          amount: null,
          status: 1,
        },
        {
          id: 2,
          type: 'percentage',
          // type_action: this.amount > 0 ? 'increase' : 'decrease',
          type_action: 'increase',
          amount: null,
          status: 1,
        },
      ],
      imgDialog: false, // used for uploading product image
      openImgDialog: false, // used for showing uploaded image
      weights: [], // Added weights are here
      createDialog: false, // Final Dialog for creating product
      newWeight: {
        id: null,
        weight: null,
      },
      product: {
        title: '',
      },
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
      categories: [],
      designs: [],
      galary: [],
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
    }
  },
  computed: {
    getTotalCount() {
      let sum = 0
      this.sizesValue.forEach((element) => {
        sum += Number(element.child)
        sum += Number(element.small)
        sum += Number(element.medium)
        sum += Number(element.large)
      })
      return sum
    },
  },
  mounted() {
    this.getCategories()
    this.getDesigns()
    this.getReleatedProducts()
  },
  methods: {
    async getDesigns() {
      const response = await this.$product.getDesigns()
      const formatted = []
      response.data.forEach((element) => {
        formatted.push({
          title: element.name,
          id: element.code,
        })
      })
      this.designs = formatted
    },
    async getCategories() {
      const response = await this.$product.getCategories()
      const arr = response.data
      const allCats = []
      arr.forEach((element) => {
        allCats.push(element)
        if (element.child)
          element.child.forEach((el) => {
            allCats.push(el)
          })
      })

      this.categories = allCats
    },
    addWeight() {
      if (this.newWeight.weight && this.newWeight.id) {
        const newValue = {
          weight: this.newWeight.weight,
          id: this.newWeight.id,
        }
        this.weights.push(newValue)
        this.setWeights(this.newWeight.weight, this.newWeight.id)
        this.newWeight.id = null
        this.newWeight.weight = null
      }
    },
    removeWeight(id) {
      const i = this.weights.findIndex((el) => el.id === id)
      this.weights.splice(i, 1)
      this.setWeights(null, id)
    },
    setWeights(value, id) {
      switch (id) {
        case 1:
          this.body.weight.kid = value
          break
        case 2:
          this.body.weight.small = value
          break
        case 3:
          this.body.weight.medium = value
          break
        default:
          this.body.weight.large = value
          break
      }
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
    async getReleatedProducts() {
      const resposne = await this.$product.getAll('?filter[name]=تست')
      resposne.data.forEach((el) => {
        this.relatedProducts.push({
          title: el.name,
          id: el.id,
        })
      })
    },
    async createProduct() {
      try {
        this.loading = !this.loading
        const form = new FormData()
        // Set defaults
        for (const item in this.body) {
          form.append(item, this.body[item])
        }
        // Set Galary Images
        for (let i = 0; i < this.galary.length; i++) {
          if (i === 0) form.append('image', this.galary[i].file)
          else
            form.append('gallery_images[' + (i - 1) + ']', this.galary[i].file)
        }
        // Set Companies
        for (let i = 0; i < this.companies.length; i++) {
          form.append(`companies[${i}][id]`, this.companies[i].id)
          form.append(`companies[${i}][type]`, this.companies[i].type)
          form.append(
            `companies[${i}][type_action]`,
            this.companies[i].type_action
          )
          form.append(
            `companies[${i}][percentage]`,
            Number(Math.abs(this.companies[i].amount))
          )
          form.append(`companies[${i}][status]`, this.companies[i].status)
        }
        // Set Available Modes
        for (let i = 0; i < this.sizesValue.length; i++) {
          form.append(`available_mode[${i}][name]`, this.sizesValue[i].name)
          form.append(
            `available_mode[${i}][count_size_large]`,
            this.sizesValue[i].large
          )
          form.append(
            `available_mode[${i}][count_size_medium]`,
            this.sizesValue[i].medium
          )
          form.append(
            `available_mode[${i}][count_size_small]`,
            this.sizesValue[i].small
          )
          form.append(
            `available_mode[${i}][count_size_kids]`,
            this.sizesValue[i].child
          )
        }
        // Set Weights
        for (let i = 0; i < this.weights.length; i++) {
          const names = [
            {
              persian: 'کودک',
              english: 'kid',
            },
            {
              persian: 'کوچک',
              english: 'small',
            },
            {
              persian: 'متوسط',
              english: 'medium',
            },
            {
              persian: 'بزرگ',
              english: 'large',
            },
          ]
          const persianName = this.sizes.find(
            (el) => el.id === this.weights[i].id
          ).title
          const englishName = names.find(
            (el) => el.persian === persianName
          ).english
          form.append(
            `weight[${englishName}]`,
            JSON.stringify(Number(this.weights[i].weight))
          )
        }
        form.append('sum_count', this.getTotalCount)
        if (this.related_products.length > 0)
          form.append('related_products', this.related_products)
        await this.$product.create(form)
        this.$router.push('/product')
        this.$toast.success('محصول با موفقیت ایجاد شد')
      } catch (error) {
        this.$toast.error('ایجاد محصول با شکست مواجه شد')
      } finally {
        this.loading = !this.loading
      }
    },
    addNewTag() {
      this.tags.push(this.newTag)
      this.newTag = null
    },
  },
}
</script>
