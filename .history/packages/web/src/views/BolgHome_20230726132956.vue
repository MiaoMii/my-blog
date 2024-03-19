<script setup lang="ts">
import FirstScreen from "@/components/FirstScreen.vue";
import scrollIntoView from "scroll--view-if-needed";
import ArticlesList from "@/components/ArticlesList.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { ArrowUp } from "@element-plus/icons-vue";
const isHeaderVisible = ref(false);

/**
 * 跳转到文章列表
 */
const jumpToTheListOfArticles = () => {
  const node = document.querySelector("#articles-wrapper");
  const opt = {
    scrollMode: "if-needed",
    block: "nearest",
    inline: "nearest",
    behavior: "smooth",
  };
  //@ts-ignore
  node && scrollIntoView(node, opt);
};

onMounted(() => {
  /* 监听滚动 */
  window.addEventListener("scroll", watchingScroll);
});

onUnmounted(() => {
  /* 移除监听 */
  window.removeEventListener("scroll", watchingScroll);
});

function watchingScroll() {
  //获取操作元素最顶端到页面顶端的垂直距离
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  if (scrollTop >= 1000) {
    isHeaderVisible.value = true; //大于480时显示元素
  }
  if (scrollTop < 1000) {
    isHeaderVisible.value = false; //小于480时隐藏元素
  }
}
</script>
<template>
  <div class="h-full home">
    <div class="cover-wrapper">
      <FirstScreen @jump-to-the-list-of-articles="jumpToTheListOfArticles" />
    </div>
    <div id="articles-wrapper" class="articles-wrapper h-full w-full">
      <div
        :style="{ height: isHeaderVisible ? '64px' : 0 }"
        class="articles-header"
      />
      <ArticlesList />
    </div>
    <el-backtop :right="50" :bottom="50">
      <template #default>
        <el-icon :size="20">
          <ArrowUp />
        </el-icon>
      </template>
    </el-backtop>
  </div>
</template>

<style scoped lang="scss">
.home {
  height: 100vh;

  .cover-wrapper {
    height: 100%;
  }

  #articles-wrapper {
    height: calc(100% - 64px);
    background-color: #f5f5f5;
    position: relative;

    .articles-header {
      height: 64px;
      width: 100%;
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      transition: all 0.3s ease;
    }
  }
}
</style>
