<template>
  <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
      <a-input :value="value" @click="edit" @change="handleChange" @pressEnter="check" style="margin-right: 100px"/>
    </div>
    <span v-else class="editable-cell-text-wrapper" >
      {{ value || ' ' }}
      <a-icon type="edit" class="editable-cell-icon" @click="edit"/>
    </span>
  </div>
</template>

<script>
export default {
  name: "EditCell",
  props: {
    text: String,
  },
  data() {
    return {
      oldName: '',
      value: this.text,
      editable: false,
    };
  },
  mounted() {
    this.oldName = this.value;
  },
  methods: {
    handleChange(e) {
      const value = e.target.value;
      this.value = value;
    },
    check() {
      this.editable = false;
      if (this.value.trim() === '') {
        this.$notification['warning']({
          message: `操作失败`,
          description: `操作失败,容器名称不能为空`
        });
        this.value = this.oldName;
        return
      }

      this.$emit('change', this.value);
    },
    edit() {
      this.editable = true;
    },
  },
}
</script>

<style scoped>
.editable-cell-icon{
  padding-left: 20px;
}

</style>