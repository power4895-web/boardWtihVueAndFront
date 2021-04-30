import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/login'
import BaordView from '@/components/board/boardView'
import SignUp from '@/components/SignUp'
import login from '@/components/login'
import userList from '@/components/user/userList'
import List from '@/components/board/boardList'; //게시판 리스트 
import Write from '@/components/board/boardForm'; //등록
import Update from '@/components/board/boardForm'; //수정
import Reply from '@/components/board/boardForm'; //댓글

Vue.use(Router)
export const router = new Router({
 mode: 'history',
 routes: [
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/user/userList',
    name: 'userList',
    component: userList
  },
  {
    path:'/board/boardList/:flag?'
    ,name:'list'
    ,component:List
  },
  {
    path: '/board/boardView/:flag?',
    name: 'boardView',
    component: BaordView
  },
  {
    path:'/board/boardForm/:no?'
    ,name:'write'
    ,component:Write
  },
  {
    path:'/board/boardUpdateForm/:flag?'
    ,name:'update'
    ,component:Update
  },
  {
    path:'/board/boardReplyForm/:flag?'
    ,name:'reply'
    ,component:Reply
  },
  {
     path: '/',
     name: 'index',
     component: Index
  },

 ]
})