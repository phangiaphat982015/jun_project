<template>
	<v-app id="inspire">
		<v-navigation-drawer fixed
												 expand-on-hover
												 permanent
												 app
												 v-model="drawer">
			<v-list-item>
				<v-list-item> SeaShop </v-list-item>
			</v-list-item>

			<v-divider></v-divider>

			<v-list>
				<v-list-group v-for="(item, i) in items"
											:key="i"
											:prepend-icon="item.icon"
											no-action
											click>
					<template v-slot:activator>
						<v-list-item>
							<v-list-item-title v-text="item.title"></v-list-item-title>
						</v-list-item>
					</template>

					<v-list-group color="primary">
						<v-list-item v-if="item.items"
												 v-for="(subItem, index) in item.items"
												 :key="index"
												 @click="changRoute(subItem.route)">
							<v-list-item>
								<v-list-item-title>{{ subItem.title }}</v-list-item-title>
							</v-list-item>
						</v-list-item>
					</v-list-group>
				</v-list-group>
				<router-link to="/data">Go to Home</router-link>
				<div @click="handleOpenMenu(1, $event)">
					hihihi
					<div v-if="isShowMenu[1]">
						<div>
							<router-link to="/your-link-1">Link 1</router-link>
						</div>
						<div>
							<router-link to="/your-link-2">Link 2</router-link>
						</div>
					</div>
				</div>

				<div @click="handleOpenMenu(2, $event)">
					hihihi
					<div v-if="isShowMenu[2]">
						<div>
							hihihi 1
						</div>
						<div>
							hihihi 2
						</div>
					</div>
				</div>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>
<script>
import { ref } from 'vue';
export default {
	data: () => ({
		breadcrumbs: [],
		mini: true,
		drawer: null,
		menuActive: 1,
		subActive: false,
		fab: false,
	}),
	setup() {
		const isShowMenu = ref({});
		const handleOpenMenu = (index, e) => {
			if (e.target.tagName !== 'A') isShowMenu.value[ index ] = !isShowMenu.value[ index ];
		};

		isShowMenu.value[ 1 ] = false;
		isShowMenu.value[ 2 ] = false;
		return {
			isShowMenu,
			handleOpenMenu,
		};
	},
	computed: {
		items() {
			return [
				{
					icon: "mdi-home",
					title: "Trang chủ",
					show: true,
				},
				{
					icon: "mdi-database",
					title: "Dữ liệu đầu vào",
					show: true,
					items: [
						{
							title: "Quản lý đơn hàng",
							route: "admin_orders",
							show: true,
						},
						{
							title: "Nguồn đơn hàng",
							route: "admin_sources",
							show: true,
						},
					],
				},
			];
		},
		pageTitle() {
			return "Admin";
		},
	},

	mounted() { },

	methods: {
		changRoute(name) { },
	},
};
</script>
