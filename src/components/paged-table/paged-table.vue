<template>
  <div>
    <Table ref="tableRef" :loading="loading" :columns="columns" :data="rows" v-bind="restProps" v-on="eventHandlers"/>
    <Page ref="pageRef" :total="total" :page-size="pageSize" @on-change="onChange" :show-total="isShowTotal"
          class="paging"/>
  </div>
</template>
<style scoped>
  .paging {
    float: right;
    margin-top: 10px;
  }
</style>

<script>
/**
   * 分页表格组件
   */
export default {
  props: {
    /**
       * 是否异步加载分页数据
       */
    async: { type: Boolean, default: false },
    /**
       * 列选项
       */
    columns: { type: Array },
    /**
       * 数据
       */
    dataSource: { type: Array },
    /**
       * 页大小
       */
    pageSize: { type: Number, default: 10 },
    /**
       * 总页数
       */
    total: { type: Number },
    /**
       * 正在加载数据
       */
    loading: { type: Boolean, default: false },
    /**
       * 异步加载分页数据的函数，输入为页数（从1开始）
       */
    load: { type: Function },
    /**
       * 其他要绑定到 Table 组件的属性
       */
    restProps: {
      type: Object,
      default: () => {
      }
    },
    /**
       * 其他要绑定到 Table 组件的事件处理器
       */
    eventHandlers: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    /**
       * 展示当前页数据
       */
    rows () {
      return this.async ? this.dataSource : this.dataSource.slice((this.index - 1) * this.pageSize, this.index * this.pageSize)
    },
    isShowTotal () {
      return !this.async
    }
  },
  data () {
    return { index: 1 }
  },
  methods: {
    /**
       * 页数变化
       */
    onChange (index) {
      if (this.async) {
        this.load(index, this.pageSize)
      } else {
        this.index = index
      }
    }
  }
}
</script>
