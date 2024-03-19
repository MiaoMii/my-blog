<script setup lang="ts">
import { reactive, ref, defineEmits, defineExpose } from "vue";

import {
  Search,
  Promotion,
  Connection,
  ChatSquare,
  Camera,
  ArrowDownBold,
} from "@element-plus/icons-vue";


const navList = ref([
  { title: "留言板", icon: "ChatSquare" },
  { title: "相册", icon: "Camera" },
  { title: "友链", icon: "Connection" },
  { title: "GIT", icon: "Promotion" },
]);

const emit = defineEmits(["jumpToTheListOfArticles"]);

// 直接引用组件会将组件修改为响应式导致不必要的性能损耗，故而改为使用映射
const comMapping = {
  Connection,
  ChatSquare,
  Camera,
  Promotion,
};

const searchValue = ref("");

const arrowClick = () => {
  emit("jumpToTheListOfArticles");
};
</script>

<template>
  <div class="firstScreen-wrapper justify-center flex relative">
    <div class="content-wrapper mt-56">
      <div class="title text-5xl text-center">叮叮猫</div>

      <div class="sub-title text-center text-xs mt-2">I Want To Get Rich</div>
      <div class="search-input mt-12 flex justify-center">
        <el-input
          v-model="searchValue"
          class="rounded-full"
          placeholder=""
          :prefix-icon="Search"
          size="large"
        />
      </div>
      <ul class="nav flex justify-center">
        <li
          v-for="(nav, n) in navList"
          :key="n"
          class="nav-item p-2 flex items-center cursor-pointer"
        >
          <span class="pl-1 text-sm flex">
            <i class="flex items-center pr-1">
              <el-icon>
                <component :is="comMapping[nav.icon]" />
              </el-icon>
            </i>
            {{ nav.title }}
          </span>
        </li>
      </ul>
    </div>
    <div
      class="
        absolute
        w-full
        h-16
        arrow-down-wrapper
        flex
        justify-center
        items-center
        bottom-0
        cursor-pointer
      "
      @click="arrowClick"
    >
      <el-icon>
        <ArrowDownBold class="arrow-down animate-bounce" />
      </el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/mixin";

.firstScreen-wrapper {
  height: 100%;
  background-image: url("@/assets/images/firstScreen.jpeg");
  background-size: 100% 100%;

  //@include utils-flex;

  .content-wrapper {
    width: 400px;
    height: 500px;
    color: #555555;
    font-family: "PingFang SC", "Microsoft YaHei", Helvetica, Arial, Menlo,
      Monaco, monospace, "Lucida Console", sans-serif;

    .title {
    }

    .nav {
      .nav-item {
        span {
          position: relative;

          &::after {
            width: 0;
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px;
          }

          &:hover::after {
            width: 100%;
            height: 2px;
            background-color: #555555;
            transition: all 0.3s;
          }
        }
      }
    }
  }

  .arrow-down-wrapper {
    .arrow-down {
      color: #ffffff;
      position: absolute;
    }
  }

  & :global(.el-input) {
    width: 80%;
  }

  & :global(.el-input__wrapper) {
    border-radius: 50px;
  }
}
</style>
