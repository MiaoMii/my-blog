<script lang="ts" setup>
import { defineProps, nextTick, ref } from "vue";
import { Articles } from "@/types/articles";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "github-markdown-css";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
    highlight(code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);
const articleContent = ref<HTMLElement | null>(null);

const test = marked.parse(`
# Hello World
*Write* \`your\` **Markdown** here.

> 测试引用

\`\`\`javascript
console.log("Hello World");
\`\`\`
`);

nextTick(() => {
  if (typeof test === "string") {
    articleContent.value?.insertAdjacentHTML("beforeend", test);
  }
});

interface Props {
  articleData: Array<Articles>;
}

const props = withDefaults(defineProps<Props>(), {
  articleData: () => [],
});
</script>
<template>
  <article class="w-full h-full">
    <section class="meta-wrapper flex items-center flex-col">
      <div class="item-wrapper">
        <div class="title text-center">
          <p class="font-black text-xl">测试标题</p>
        </div>
        <div class="article-content markdown-body" ref="articleContent"></div>
        <div class="meta"></div>
        <div class="date">
          <p class="text-center">5月</p>
          <p class="text-center">29</p>
        </div>
      </div>
    </section>
    <section class="meta-wrapper flex items-center flex-col">
      <div class="item-wrapper">
        <div class="title text-center">
          <p class="font-black text-xl">测试标题</p>
        </div>
        <div class="meta"></div>
        <div class="date">
          <p class="text-center">5月</p>
          <p class="text-center">29</p>
        </div>
      </div>
    </section>
    <section class="meta-wrapper flex items-center flex-col">
      <div class="item-wrapper">
        <div class="title text-center">
          <p class="font-black text-xl">测试标题</p>
        </div>
        <div class="meta"></div>
        <div class="date">
          <p class="text-center">5月</p>
          <p class="text-center">29</p>
        </div>
      </div>
    </section>
  </article>
</template>

<style scoped lang="scss">
.meta-wrapper {
  width: 100%;

  .item-wrapper {
    background: #ffffff;
    margin: 20px;
    padding: 10px;
    border-radius: 3px;
    width: 60%;
    position: relative;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.09),
      0 3px 1px -2px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.12);

    &:first-child {
      margin-top: 60px;
    }

    .date {
      background: #589ef8;
      position: absolute;
      top: -25px;
      left: -25px;

      width: 64px;
      height: 64px;
      border-radius: 50%;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.09),
        0 3px 1px -2px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.12);

      .text-center {
        color: #ffffff;

        &:first-child {
          font-size: 18px;
          margin-top: 5px;
        }
      }
    }

    .title {
      p {
        color: #555555;
      }
    }

    .meta {
      height: 300px;
    }
  }
}
</style>
