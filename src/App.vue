<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { getStr } from "@/apis/request-api.ts";
import TestUnit from "@/components/TestUnit.vue";

let strData = ref({});

const getFastAPI = async () => {
  const response = await getStr();
  strData.value = response.data;
};

const socket = new WebSocket('ws://127.0.0.1:8000/fws')

// 响应数据的状态
const wsData = reactive({})

// 监听 WebSocket 连接打开事件
socket.addEventListener('open', () => {
  console.log('WebSocket 连接已打开')
})

// 监听 WebSocket 接收到消息事件
socket.addEventListener('message', event => {
  wsData.text = event.data
})

// 发送消息
const sendMessage = (message: any) => {
  socket.send(message)
}

function downloadCSV() {
  // 发起下载请求
  fetch('fastapi/download')
      .then(response => {
        // 将响应转换为 Blob 对象
        return response.blob();
      })
      .then(blob => {
        // 创建 URL 对象
        const url = window.URL.createObjectURL(new Blob([blob]));

        // 创建一个 <a> 元素，模拟点击下载
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'random_data.csv');
        document.body.appendChild(link);

        // 模拟点击下载
        link.click();

        // 释放 URL 对象
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('下载失败：', error);
      });
}


onMounted(() => {
  getFastAPI();
  sendMessage('Hello, Server!')
});

onUnmounted(() => {
  socket.onclose = () => {
    console.log('WebSocket disconnected');

  }
})

</script>

<template>
  <el-container class="full-screen">
    <el-main>
      <el-row class="full center-center">
        <div class="enter-div">
          <h1>{{ strData }}</h1>
          <TestUnit :str-data="strData"></TestUnit>
          <el-button @click="downloadCSV">DownLoad Test</el-button>
<!--          <el-text type="info">{{ wsData.text }}</el-text>-->
        </div>
      </el-row>
    </el-main>

  </el-container>
</template>

<style scoped>
.enter-div {
  width: 50%;
  height: 70%;
}

.full-screen {
  width: 100vw;
  height: 100vh;
}
</style>