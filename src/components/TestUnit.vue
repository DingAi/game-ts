<template>
  <div class="full z-0" style="height: 400px; width: 400px; background:#fafafa;" id="main1">
    <h1>{{ props.strData }}</h1>
  </div>
  <div class="full z-1" style="height: 400px; width: 400px; background:#fafafa;" id="main2">
    <h1>{{ props.strData }}</h1>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import 'echarts-gl';
import { onMounted } from "vue";
import * as THREE from 'three';


onMounted(() => {
  let container = document.getElementById('main2');

  // 创建一个场景
  const scene = new THREE.Scene();
  // 创建一个透视相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  // 创建一个渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(400, 400);
  // 将渲染器的输出添加到指定的容器中
  // const container = document.getElementById('main');
  container.appendChild(renderer.domElement);
  // 创建一个金字塔的几何体
  const geometry = new THREE.ConeGeometry(2, 4, 4);
  // 创建一个材质
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  // 创建一个网格对象，将几何体和材质结合起来
  const pyramid = new THREE.Mesh(geometry, material);
  // 将金字塔对象添加到场景中
  scene.add(pyramid);
  // 创建一个循环以持续渲染场景
  const animate = function () {
    requestAnimationFrame(animate);
    // 使金字塔绕着自己的轴旋转
    pyramid.rotation.y += 0.01;
    // 渲染场景
    renderer.render(scene, camera);
  };
  // 启动动画循环
  animate();


  const chart = echarts.init(document.getElementById('main1'));
  chart.setOption({
    grid3D: {},
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    series: [{
      type: 'scatter3D',
      symbolSize: 50,
      data: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
      itemStyle: {
        opacity: 1
      }
    }]
  })
})

const props = defineProps({
  strData: Object,
})

</script>

<style lang="less" scoped></style>