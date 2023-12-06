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
      <v-col cols="12" md="2">
        <h4>تعداد موجودی</h4>
        <br />
        <h5 class="primary--text">تعداد موجود در انبار</h5>
        <base-input placeholder="عدد" type="number" />
      </v-col>
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
      <v-col cols="12" md="4">
        <h4>وزن محصول</h4>
        <div class="d-flex">
          <base-select
            style="max-width: 150px"
            :items="sizes"
            :model-value="newWeight.id"
            @update:modelValue="(newValue) => (newWeight.id = newValue)"
          />
          <base-input
            style="margin-right: -10px"
            type="number"
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
        </div>
        <div
          v-for="(i, weight) in weights"
          :key="i"
          class="d-flex backgroundColor pa-1 rounded-lg my-1"
        >
          <p class="mt-2 mr-5 grey800--text"></p>
          <p class="mt-2 grey800--text mr-8 peydaLight">{{ weight.weight }}</p>
          <v-btn
            color="backgroundColor"
            height="48"
            class="elevation-0 rounded-lg"
            style="margin-right: 100px"
            @click="removeWeight"
            ><v-icon color="primary">mdi-close</v-icon></v-btn
          >
        </div>
      </v-col>
    </v-row>
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
      weights: [], // Added weights are here
      newWeight: {},
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
    }
  },
  methods: {
    addWeight() {
      console.log('NEW WEIGHT IS : ', this.newWeight)
      if (this.newWeight.weight && this.newWeight.id) {
        const newValue = {
          weight: this.newWeight.weight,
          id: this.newWeight.id,
        }
        this.weights.push(newValue)
        this.newWeight.weight = null
        this.newWeight.id = null
        console.log('THIS>WEIGHTS : ', this.weights)
      }
    },
    removeWeight(id) {
      const i = this.weights.findIndex((el) => el.id === id)
      this.weights.splice(i, 1)
    },
    setValues(value) {
      this.newWeight.weight = value
    },
  },
}
</script>
