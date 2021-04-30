<template>
	<header>
		<h1><router-link to="/"><img alt="Vue logo" src="../../assets/logo.png" width="80"></router-link></h1>
		<div class="menuWrap">
			<ul class="menu">
				<!-- <li><a :href="$router.resolve({name: 'list', params:{flag:1}}).href">공지사항</a></li> -->
				<!-- <li><a :href="$router.resolve({name: 'list', params:{flag:2}}).href">문의사항</a></li> -->
				<li><router-link :to="{ name: 'list', params: { flag: 1 }}" class="link">공지사항</router-link></li>
				<li><router-link :to="{ name: 'list', params: { flag: 2 }}" class="link">문의사항</router-link></li>
				<li><router-link to="/user/userList">회원리스트</router-link></li>
				<li><router-link to="/login">로그인</router-link></li>
			</ul>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
 
		}
	},
	methods: {

	},
	watch: {
		$route(to) {
			if(to.path == "/board/boardList/1"){
				this.$router.go(to.path);
			}
			if(to.path == "/board/boardList/2"){
				this.$router.go(to.path);
			}
		}
	}
}
</script>

<style scoped>
header{width:100%; text-align:center; position:relative; height:120px; border-bottom:1px solid #35495e}
header h1{position:absolute; top:0; left:100px;}
header ul.menu:after{display:block; clear:both; content:'';}
header ul.menu{position:absolute; top:20px; right:50px;}
header ul.menu li{float:left; padding:10px 20px; list-style:none;}

a{text-decoration:none; color:#333;}
</style>