<template>
  <div>
    <h1>File Monitor Example</h1>
    <p>{{ fileContent }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

let fileContent = ref('')


const readFileContent = () => {
  // Read the file content using the `fs` module
  const fs = require('fs')
  const content = fs.readFileSync('E:/chengliu/work/vue3/sha.txt', 'utf8')
  console.log('content', content)
  // Update the file content in the Vue component
  fileContent.value = content
}
onMounted(() => {
  readFileContent()
})

</script>