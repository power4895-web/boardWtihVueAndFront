<template>
	<div>
		<h1>{{this.$route.query.flag == 1 ? "공지사항 상세" : "문의사항 상세"}}</h1>

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="" />
						<col width="*" />
					</colgroup>

					<tr>
						<td >admin<span style="font-size:12px;color:gray;">{{board.reg_date| moment('YYYY-MM-DD')}}</span></td>
						<td style="border-top:none;text-align:right;font-size:12px"> 조회 : {{board.read_cnt}}</td>
					</tr>

					<tr>
						<td>{{board.title}}</td>
						<td></td>
					</tr>
					<tr>
						<td class="txt_cont">{{board.content}}</td>
						<td></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap"  >
			<a href="javascript:;" @click="fnList" style="float:left" class="btn">목록</a>
			<a href="javascript:;" @click="fnMod" style="float:left" class="btnAdd btn">수정</a>
			<a href="javascript:;" @click="fnReply" style="float:left" class="btnAdd btn">댓글</a>
			<a @click="fnDelete" style="float:right" class="btnAdd btn">삭제</a>
		</div>	
	</div>
</template>

<script>
export default {
	data() {
		var no = this.$route.query.no;

		return {
            board:{
                no : no,
                read_cnt : null,
            },
		}
	}
	,mounted() {
		this.fnGetView();
	}
	,methods:{
		fnGetView() {
			this.$http.post('/api/board/updateBoardRead/' + this.board.no, { 
			})
            this.$http.post('/api/board/boardView/'+ this.board.no, { 
            })
            .then((res) => {
            this.board = res.data[0]
            })
            .catch(function () {
            alert('error')
            })
		}
		,fnList(){
            this.$router.push("/board/boardList/" + this.board.flag);
		}
		,fnMod() {
			console.log('this.board.no', this.board.no)
			console.log('this.board.no', this.board.flag)
			console.log('this.board.no', this.board.title)
			this.$router.push({
				name: 'update',
				query: {
					no: this.board.no,
					flag: this.board.flag
				}
			})
		}
		,fnReply() {
			console.log('this.board.no', this.board.no)
			console.log('this.board.no', this.board.flag)
			this.$router.push({
				name: 'reply',
				query: {
					no: this.board.no,
					flag: this.board.flag,
					title: '',
					action: 'reply'
				}
			})
		}
		,fnDelete() {
            this.$http.post('/api/board/boardDelete/'+ this.board.no, { 
            })
            .then(() => {
                this.$router.push("/board/boardList/" + this.board.flag);
            })
            .catch(function () {
            alert('error')
            })
		}
	}
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; margin: 10px; padding: 20px   }
	.tbAdd td{padding:10px 10px; box-sizing:border-box; text-align:left; padding: 20px; margin: 10%;}
	.tbAdd td.txt_cont{height:300px; vertical-align:top;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
</style>