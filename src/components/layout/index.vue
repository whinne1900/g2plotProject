<template>
	<div class="common-layout">
	    <el-container>
	      <el-aside style="width:fit-content;" class="aside">
			  <Aside></Aside>
			  </el-aside>
	      <el-container>
	        <el-header class="header">
				<Header></Header>
				</el-header>
	        <el-main>
				<router-view></router-view>
			</el-main>
	      </el-container>
	    </el-container>
	  </div>
</template>
 
<script setup lang="ts">
import Aside from './aside.vue'
import Header from './header.vue'
 
</script>
 
<style lang="scss" scoped>
	.aside{
		height: 100vh;
		background-color: #545c64;
	}
	.header{
			background-color: #fff;
			border-bottom: 1px solid #c9c6c6;
	}
</style>