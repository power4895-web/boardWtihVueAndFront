<template>
		<div class="listWrap">
			<table class="tbList">
				<colgroup>
					<col width="6%" />
					<col width="*" />
					<col width="10%" />
					<col width="15%" />
				</colgroup>
				<tr>
					<th>no</th>
					<th>아이디</th>
					<th>이름</th>
					<th>날짜</th>
				</tr>
				<tr v-for="(row, idx) in users" :key="idx">
					<td>{{idx + 1}}</td>
					<td><a href="javascript:;">{{row.userid}}</a></td>
					<td>{{row.name}}</td>
					<td>{{row.create_date| moment('YYYY-MM-DD')}}</td>
				</tr>
				<tr v-if="users.length == 0">
					<td colspan="4">데이터가 없습니다.</td>
				</tr>
			</table>
		</div>
</template>

<script>
export default {
    data () {
  return {
    users: []
  }
},
created () {
  this.$http.get('/api/users')
    .then((response) => {
      this.users = response.data
    })
}
}
</script>
<style scoped>
	.searchWrap{border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;}
	.searchWrap input{width:60%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
	.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
	.tbList th{border-top:1px solid #888;}
	.tbList th, .tbList td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbList td.txt_left{text-align:left;}
	.btnRightWrap{text-align:right; margin:10px 0 0 0;}

	.pagination{margin:20px 0 0 0; text-align:center;}
	.first, .prev, .next, .last{border:1px solid #666; margin:0 5px;}
	.pagination span{display:inline-block; padding:0 5px; color:#333;}
	.pagination a{text-decoration:none; display:inline-blcok; padding:0 5px; color:#666;}
</style>