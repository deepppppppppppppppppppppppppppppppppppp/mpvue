<template>
    <div>
        <p>测试</p>
    </div>
</template>

<script>
    export default {
      components: {},

      data() {
        return {
          logs: []
        };
      }
    };
</script>

<style lang="less" scoped>
    .log-list {
      display: flex;
      flex-direction: column;
      padding: 40rpx;
    }

    .log-item {
      margin: 10rpx;
    }
</style>
