<template>
	<div>
		<h1>{{this.$route.query.flag == 1 ? '공지사항':'문의사항'}} {{no !== '' && this.action !== "reply" ? '수정':'등록'}}</h1> 

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>제목</th>
						<td><input type="text" v-model="board.title" ref="title" /></td>
					</tr>
					<tr>
						<th>내용</th>
						<td><textarea v-model="board.content" ref="content"></textarea></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
			<a href="javascript:;" @click="fnList" class="btn">목록</a>
			<button @click="no !== undefined && action !== 'reply' ? fnMod() : fnAddProc()" class="btnAdd btn">{{no !== undefined && action !== "reply" ? '수정' : '등록'}}</button>
		</div>	
	</div>
</template>
 
<script>
export default {
	mounted() {  //수정일 때 데이터 가져오기
		if(this.board.no !== undefined){
			this.fnGetView();
		}
	},
    methods: {
		fnGetView() {
			console.log('Update this.no', this.no)
            this.$http.post('/api/board/boardView/'+ this.no, { 
            board: this.board
            })
            .then((res) => {
				if(this.action == undefined){
					this.board = res.data[0]
				}else{
					this.board = res.data[0]
					this.board.title = "re :" + res.data[0].title 
					this.board.content = ""
				}
            })
            .catch(function () {
            alert('error')
            })
		},
		fnList(){ //목록
             this.$router.push('/board/boardList/'+ this.board.flag) 
		},
		fnAddProc: function () {
			console.log('등록')

			if(!this.board.title) {
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			if(!this.board.content) {
				alert("내용을 입력해 주세요");
				this.$refs.content.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			if(this.action == undefined){
				//fid 번호가져오는 쿼리
				this.$http.post('/api/board/selectBoardFid/'+ this.board.flag)
				.then((res) => {
					//콜백 안에다가 write넣기
					console.log(">>>>>>>>>",res.data[0].fid)
					this.board.fid = res.data[0].fid
					//등록 쿼리
					this.board.lev = 0
					this.board.stp = 1
					this.$http.post('/api/board/write', { 
						board: this.board
					})
					.then((res) => {
					if (res.data.success == true) {
						alert(res.data.message);
						this.$router.push('/board/boardList/' + this.board.flag) 
					}
					if (res.data.success == false) {
						alert(res.data.message);
					}
					})
					.catch(function () {
						alert('error')
					})
	
				})
				.catch(function () {
					alert('error')
				})
			}else{
				console.log('댓글 등록')
				//fid, +1,+1
				this.$http.post('/api/board/selectBoardReply/'+ this.no,{
					board: this.board
				})
				.then((res) => {
					//콜백 안에다가 write넣기
					this.board.fid = res.data[0].fid
					this.board.lev = res.data[0].lev
					this.board.stp = res.data[0].stp
					


					//stp 업데이트 한번 해주기
					this.$http.post('/api/board/updateBoardReplyStp', { 
						board: this.board
					})
					.then(() => {
						//등록 쿼리
						console.log('등록콜백')
						this.$http.post('/api/board/write', { 
							board: this.board
						})
						.then((res) => {
						if (res.data.success == true) {
							alert(res.data.message);
							this.$router.push('/board/boardList/' + this.board.flag) 
						}
						if (res.data.success == false) {
							alert(res.data.message);
						}
						})
						.catch(function () {
							alert('error')
						})
					})
					.catch(function () {
						alert('error')
					})

	
				})
				.catch(function () {
					alert('error')
				})
			}
		},
		fnMod(){
			console.log('수정')
			if(!this.board.title) {
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			if(!this.board.content) {
				alert("내용을 입력해 주세요");
				this.$refs.content.focus(); //방식으로 선택자를 찾는다.
				return;
			}

			this.$http.post('/api/board/boardUpdate/'+ this.no, { 
				board: this.board
			})
			.then(() => {
			this.$router.push({
				name: 'boardView',
				query: {
					no: this.no,
					flag : this.board.flag
				}
			})

			})
			.catch(function () {
			alert('error')
			})
		}
    },

    data: function () {
		const no = this.$route.query.no;
		const flag = this.$route.query.flag;
		const action = this.$route.query.action;
		this.action = action;
		return {
			board: {
			no: no,
			fid: '',
			lev: '',
			stp: '',
			title: '',
			content: '',
			flag:flag,
			},
			no:no,
			action:action,
		}
    }
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbAdd td{padding:10px 10px; box-sizing:border-box;}
	.tbAdd td input{width:100%; min-height:30px; box-sizing:border-box; padding:0 10px;}
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
</style>