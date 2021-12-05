const express = require('express')

const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: true}))
router.use(express.json())

// 목록조회
// localhost:5001/boards?type=list
// { post방식으로 넘겨줄 것}
// 저장
// localhost:5001/boards?type=insert
// 수정
// localhost:5001/boards?type=update
// 삭제
// localhost:5001/boards?type=delete

router.post('/', (req, res, next) => {
  console.log('TYPE: ', req.query.type)
  // GET 방식은 req.query로 받음
  // POST 방식은 req.body로 받음
  const type = req.query.type
  if ('list' === type) {
    const dbconnect_Module = require('./dbconnect_module')

    // mybatis (xml 파일을 만들지 않으면 쿼리문을 여기에 작성해야 한다. 그래서 쿼리를 작성할 영역을 나누는 것이 좋다.) -> id, namespace만 잘 넘기면 됨 
    req.body.mapper = 'BoardMapper' // 파일명 정의
    req.body.crud = 'select' // select, insert, update, delete 중 하나
    req.body.mapper_id = 'selectBoardList'

    router.use('/', dbconnect_Module)
    next('route')
  } else if ('insert' === type) {
    const dbconnect_Module = require('./dbconnect_module')

    // mybatis (xml 파일을 만들지 않으면 쿼리문을 여기에 작성해야 한다. 그래서 쿼리를 작성할 영역을 나누는 것이 좋다.) -> id, namespace만 잘 넘기면 됨 
    req.body.mapper = 'BoardMapper' // 파일명 정의
    req.body.crud = 'insert' // select, insert, update, delete 중 하나
    req.body.mapper_id = 'insertBoard'

    router.use('/', dbconnect_Module)
    next('route')
  } else if ('update' === type) {
    const dbconnect_Module = require('./dbconnect_module')

    // mybatis (xml 파일을 만들지 않으면 쿼리문을 여기에 작성해야 한다. 그래서 쿼리를 작성할 영역을 나누는 것이 좋다.) -> id, namespace만 잘 넘기면 됨 
    req.body.mapper = 'BoardMapper' // 파일명 정의
    req.body.crud = 'update' // select, insert, update, delete 중 하나
    req.body.mapper_id = 'updateBoard'

    router.use('/', dbconnect_Module)
    next('route')
  } else if ('delete' === type) {
    const dbconnect_Module = require('./dbconnect_module')

    // mybatis (xml 파일을 만들지 않으면 쿼리문을 여기에 작성해야 한다. 그래서 쿼리를 작성할 영역을 나누는 것이 좋다.) -> id, namespace만 잘 넘기면 됨 
    req.body.mapper = 'BoardMapper' // 파일명 정의
    req.body.crud = 'delete' // select, insert, update, delete 중 하나
    req.body.mapper_id = 'deleteBoard'

    router.use('/', dbconnect_Module)
    next('route')
  }
})

module.exports = router


