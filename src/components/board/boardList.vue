<template>
	<div>
		<h1>{{this.board.flag == "1" ? '공지사항':'문의사항'}}</h1> 
		<!-- <h1>start_page : {{paging.start_page}}</h1> 
		<h1>total_page : {{paging.total_page}}</h1> 
		<h1>end_page : {{paging.end_page}}</h1> 
		<h1>page : {{paging.page}}</h1> 
		<h1>totalCount : {{paging.totalCount}}</h1> 
		<h1>start_row : {{paging.start_row}}</h1> 
		<h1>total_page : {{paging.total_page}}</h1>  -->

		<div class="searchWrap">
			<label class="bold">검색 대상</label>
			<select v-model="board.searchKey">
				<option value="title">제목</option>
				<option value="content">내용</option>
			</select>
			<label class="bold">검색 키워드</label>
			<input type="text" v-model="board.searchValue" @keyup.enter="fnSearch" placeholder="검색 키워드를 입력하세요."/><a href="javascript:;" @click="fnSearch" class="btnSearch btn">검색</a>
		</div>
		<div class="btnRightWrap">Total : {{paging.totalCount}} [{{paging.page}} /{{paging.total_page}}]</div>
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
					<th>날짜</th>
				</tr>
				<tr v-for="(row, idx) in list" :key="idx">
					<td class="text-center">{{paging.totalCount - ((paging.page-1) * 15 + idx)}}</td>    
					<td>{{row.user_id}}</td>
					<td class="textCenter">
						<div :style="{paddingLeft:row.lev * 12 + 'px'}">
							<label v-if="row.lev > 0" >└</label>
							<a href="javascript:;" @click="fnView(`${row.no}`)">{{row.title}}</a>
						</div>
					</td>
					<td>{{row.reg_date| moment('YYYY-MM-DD')}}</td>
				</tr>

				<tr v-if="list.length == 0">
					<td colspan="6">데이터가 없습니다.</td>
				</tr>
			</table>
		</div>

		<!-- 번호누르기 -->
		<div class="pagination" v-if="paging.totalCount > 0">
			<a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
			<a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"  class="prev">&lt;</a>
			<template v-for=" (n,index) in paginavigation()">
				<template v-if="paging.page==n">
					<strong :key="index">{{n}}</strong>
				</template>
				<template v-else>
					<a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{n}}</a>
				</template>
			</template>
			<!-- 맨끝 -->
			<a href="javascript:;" v-if="paging.total_page > paging.end_page" @click="fnPage(`${paging.end_page+1}`)"  class="next">&gt;</a>  
			<!-- 맨앞 -->
			<a href="javascript:;" @click="fnPage(`${paging.total_page}`)" class="last">&gt;&gt;</a>
		</div>


		<div class="btnRightWrap">
			<a @click="fnAdd" class="btn">등록</a>
		</div>

	</div>
</template>

<script>
export default {
	data() { //변수생성
		return{
			list:'' //리스트 데이터
			,board: {
				flag:'' //게시판 숫자처리
				,searchValue:this.$route.query.searchValue
				,searchKey: 'title'
				,page:this.$route.query.page ? this.$route.query.page:1
				,totalCount:''
			}
			,paging:'' //페이징 데이터
			,start_page:'' //시작페이지
			,page:this.$route.query.page ? this.$route.query.page:1
			,paginavigation:function() { //페이징 처리 for문 커스텀
				var pageNumber = [];
				var start_page = this.paging.start_page;
				var end_page = this.paging.end_page;
				for (var i = start_page; i <= end_page; i++) pageNumber.push(i);
				return pageNumber;
			}
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
			console.log('searchValue', this.board.searchValue)
			console.log('searchKey', this.board.searchKey);
			console.log('page', this.board.page);
			//카운트를 먼저 구하기
			this.$http.post('/api/board/selectBoardCount/'+ this.board.flag,{
					board: this.board
			})
			//페이징처리를 위해 카운트를 list api로 보내기			
			.then((response) => {
				this.board.totalCount=response.data[0].cnt;
				this.board.page=this.page;
				this.$http.post('/api/board/boardList/'+ this.board.flag,{
						board: this.board
				})
				.then((response) => {
					//데이터 입혀주기
					console.log('받아온 데이터',response.data.rows)
					console.log('받아온 페이징 데이터',response.data.paging)
					this.list = response.data.rows
					this.paging = response.data.paging;
				})
			})
		}
		,fnAdd() {
			this.$router.push({
				name: 'write',
				query: {
					flag : this.board.flag
				}
			})
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
		,fnSearch() { //검색
			this.fnGetList();
		}
		,fnPage(n) {//페이징 이
			if(this.page != n) {
				this.page = n;
				this.fnGetList();
			}
		}
	}
}
</script>

<style scoped>
	.searchWrap{border:1px solid rgba(136, 136, 136, 0.836); border-radius:5px; text-align:center; padding:1px 0; margin-bottom:40px; text-align:center; background-color: #f8f9fa}
	.searchWrapRight{border:1px solid #888; border-radius:5px; text-align:center; padding:20px 0; margin-bottom:40px;text-align:right;}
	.searchWrap input{width:80%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888; margin-left:10px;}
	.searchWrap select{height:36px; border-radius:3px; padding:0 10px; border:1px solid #888; margin-left:10px; font-size: medium; margin:10px;}
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
	.bg-light {background-color: #f8f9fa !important;}
	.bold {font-weight: bold}
</style>