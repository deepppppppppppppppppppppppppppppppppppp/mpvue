<template>
    <div>
        <ul>
            <li>111111</li>
            <li>222222</li>
        </ul>
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
