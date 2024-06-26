<template>
	<el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" default-active="2"
		class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose" router>
		<div class="title">后台管理系统</div>
		<template v-for="subItem in menus" :key="subItem.path">
			<!-- 两层 -->
			<el-sub-menu v-if="subItem.children" :index="subItem.path">
				<template #title>
					<el-icon>
						<component :is="subItem.meta.icon"></component>
					</el-icon>
					<span>{{ subItem.meta.title }}</span>
				</template>
				<template v-for="item in subItem.children" :key="item.path">
					<el-menu-item :index="item.path">
						<el-icon>
							<component :is="item.meta.icon"></component>
						</el-icon>
						<template #title>
							<span>{{ item.meta.title }}</span>
						</template>
					</el-menu-item>
				</template>
			</el-sub-menu>
			<!-- 一层 -->
			<el-menu-item v-else :index="subItem.path">
				<el-icon>
					<component :is="subItem.meta.icon"></component>
				</el-icon>
				<template #title>
					<span>{{ subItem.meta.title }}</span>
				</template>
			</el-menu-item>
		</template>
 
	</el-menu>
</template>
 
<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter();
	const top = ref(true)
	const menus = computed(() => {
		let menu = router.options.routes.filter((item) => item.children);
		return menu[0].children
	})
	import { layoutStore } from '@/store/layout.js'
	const store = layoutStore();
	// const isCollapse = ref(false)
	const isCollapse = computed(() => {
		return store.isCollapse;
	})
	const handleOpen = (key : string, keyPath : string[]) => {
		console.log(key, keyPath)
	}
	const handleClose = (key : string, keyPath : string[]) => {
		console.log(key, keyPath)
	}
</script>
 
<style lang="scss " scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
 
	.el-menu {
		border-right: 0;
	}
 
	.title {
		font-size: 18px;
		display: flex;
		justify-content: center;
		top: 5px;
		margin-top: 15px;
	}
</style>