<template>
	<div>
		<h1>{{this.board.flag == "1" ? '공지사항':'문의사항'}}</h1> 

		<div class="listWrap">
			<table class="tbList">
				<colgroup>
					<col width="6%" />
					<col width="10%" />
					<col width="50%" />
					<col width="15%" />
				</colgroup>
				<tr>
					<th>no</th>
					<th>아이디</th>
					<th class="textCenter">제목</th>
					<!-- <th>내용</th> -->
					<th>날짜</th>
					<!-- <th>조회수</th> -->
				</tr>
				<tr v-for="(row, idx) in list" :key="idx">
					<td>{{idx + 1}}</td>
					<td>{{row.user_id}}</td>
					<td class="textCenter">
						<div :style="{paddingLeft:row.lev * 12 + 'px'}">
							<label v-if="row.lev > 0" >└</label>
							<a href="javascript:;" @click="fnView(`${row.no}`)">{{row.title}}</a>
						</div>
					</td>
					<!-- <td>{{row.content}}</td> -->
					<td>{{row.reg_date| moment('YYYY-MM-DD')}}</td>
					<!-- <td>{{row.read_cnt}}</td> -->
				</tr>

				<tr v-if="list.length == 0">
					<td colspan="6">데이터가 없습니다.</td>
				</tr>
			</table>
		</div>

		<div class="btnRightWrap">
			<a @click="fnAdd" class="btn">등록</a>
		</div>

	</div>
</template>

<script>
/* .re{text-align:left;padding-right:  this.board.flag*12px;} */
export default {
	data() { //변수생성
		return{
			list:'' //리스트 데이터
			,board: {
				flag:'' //게시판 숫자처리
			}
			,activeColor: 'red'
			,fontSize: 30
			,style1 : {textAlign:'left', paddingLeft:'100px' }
			,test : 0
		}
	}
	,created() { //페이지 시작하면은 자동 함수 실행
	}
	,mounted() { //페이지 시작하면은 자동 함수 실행
		const flag = this.$route.params.flag;
		this.board.flag = flag;
		this.fnGetList();
	}
	, methods:{
		fnGetList() { //데이터 가져오기 함수
			this.$http.post('/api/board/boardList/'+ this.board.flag)
			.then((response) => {
				this.list = response.data
				// this.flag = response.data.flag
			})

		}
		,fnAdd() {
			this.$router.push({
				name: 'write',
				query: {
					flag : this.board.flag
				}
			})
			// this.$router.push("/board/boardForm");
		}
		,fnView(idx) {
			console.log('idx', idx)
			console.log('fnView====flag', this.board.flag)
			this.$router.push({
				name: 'boardView',
				query: {
					flag : this.board.flag
					,no: idx
				}
			})
		}
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
	/* .re{text-align:left;padding-right:  this.board.flag*12px;} */

	.pagination{margin:20px 0 0 0; text-align:center;}
	.first, .prev, .next, .last{border:1px solid #666; margin:0 5px;}
	.pagination span{display:inline-block; padding:0 5px; color:#333;}
	.pagination a{text-decoration:none; display:inline-blcok; padding:0 5px; color:#666;}
	.textCenter{text-align:left;}
</style>