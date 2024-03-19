<script setup lang="ts">
import FirstScreen from "@/components/FirstScreen.vue";
import scrollIntoView from "scroll-into-view-if-needed";
import ArticlesList from "@/components/ArticlesList.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { ArrowUp } from "@element-plus/icons-vue";
const isHeaderVisible = ref(false);

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

/**
 * 跳转到文章列表
 */
const jumpToTheListOfArticles = () => {
  const node = document.querySelector("#articles-wrapper");
  const opt = {
    scrollMode: "if-needed",
    block: "start",
    inline: "start",
    behavior: "smooth",
    boundary: document.getElementById("article"),
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
  console.log(scrollTop);
  if (scrollTop >= 868) {
    isHeaderVisible.value = true; //大于480时显示元素
  }
  if (scrollTop < 868) {
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
      >
        <div class="nav-content h-full" v-show="isHeaderVisible">
          <div class="logo float-left flex items-center h-full">
            <img src="../../public/cat.svg" alt="" width="32" height="32" />
            <span>叮叮猫</span>
          </div>
          <div class="nav float-right">
            <el-menu
              :default-active="activeIndex"
              class="el-menu"
              mode="horizontal"
              :ellipsis="false"
              @select="handleSelect"
            >
              <el-menu-item index="1">博客</el-menu-item>

              <el-menu-item index="2">归档</el-menu-item>
              <el-menu-item index="3">关于</el-menu-item>
            </el-menu>
          </div>
        </div>
      </div>
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
  $articles-header-height: 64px;
  .cover-wrapper {
    height: 100%;
  }

  #articles-wrapper {
    //height: calc(100% - 64px);
    height: auto;
    background-color: #f5f5f5;
    position: relative;
    margin-top: 128px;

    .articles-header {
      height: $articles-header-height;
      width: 100%;
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      transition: all 0.3s ease;
      z-index: 1;

      .nav-content {
        .logo {
          margin-left: 20px;
          span {
            margin-left: 10px;
            line-height: $articles-header-height;
          }
        }

        .nav {
          height: 100%;
          .el-menu {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
