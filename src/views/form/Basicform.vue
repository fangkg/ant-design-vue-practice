<template>
  <a-form :layout="formLayout" :form="form">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group default-value="horizontal" @change="handleFormLayoutChange">
        <a-radio-button value="horizontal">
          Horizontal
        </a-radio-button>
        <a-radio-button value="vertical">
          Vertical
        </a-radio-button>
        <a-radio-button value="inline">
          Inline
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <!-- 手动校验 -->
    <!-- <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validateStatus="fieldAStatus"
      :help="fieldAHelp"
    > -->
    <!-- 控件内校验 -->
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- 双向绑定 -->
      <!-- <a-input v-model="fieldA" placeholder="input placeholder" /> -->
      <a-input v-decorator="['fieldA', {
        initialValue: fieldA,
        rules: [{required: true, min: 6, message: '必须大于5个字符！' }]
      }]" placeholder="input placeholder" />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- <a-input v-model="fildB" placeholder="input placeholder" /> -->
      <a-input v-decorator="['fieldB']"/>
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createform(this)
    return {
      formLayout: "horizontal",
      fieldA: "hello",
      // fieldAStatus: "",
      // fieldAHelp: "",
      fieldB: ""
    };
  },
  // watch: {
  //   fieldA(val) {
  //     if(val.length <= 5) {
  //       this.fieldAStatus = "error";
  //       this.fieldAHelp = "必须大于5个字符！";
  //     } else {
  //       this.fieldAStatus = "";
  //       this.fieldAHelp = "";
  //     }
  //   }
  // },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      this.form.validate((error, value) => {
        if (!error) {
          console.log("校验通过：", value)
          // 后台校验通过 数据可以同步给其它组件使用
          // this.fieldA = value.fieldA
          Object.assign(this, value)
        }
      })
      // if(this.fieldA.length <= 5) {
      //   this.fieldAStatus = "error";
      //   this.fieldAHelp = "必须大于5个字符！";
      // } else {
      //   console.log({
      //     fieldAStatus: this.fieldAStatus,
      //     fieldAHelp: this.fieldAHelp
      //   })
      // }
    }
  },
  mounted() {
    setTimeout(() => {
      this.form.setFieldsValue({fieldA: "hello world!"})
    }, 3000)
  }
};
</script>