const db_config = require("../config/db-config.json");
var express = require("express");
var router = express.Router();
// mysql 패키지를 사용하겠다
const mysql = require("mysql");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 요청이 들어올때마다 접속했다 끊었다 해줌 -> 연결고리를 만들 필요가 없음 - 사용자가 많아지면 문제가 생길 수 있음
// => 실무에서 잘 사용하지 않음
// mysql 서버 접속 정보
// const connection = mysql.createConnection({
//   host: "react-study.c7cdinatbebd.ap-northeast-2.rds.amazonaws.com",
//   port: "3306",
//   database: "react",
//   user: "admin",
//   password: "admin1234",
// });


// 사용자 수를 제한하고 순서대로 사용함 (현업에서 많이 씀)
const pool = mysql.createPool({
  connectionLimit: db_config.connectionLimit,
  waitForConnections: db_config.waitForConnections,
  host: db_config.host,
  port: db_config.port,
  database: db_config.database,
  user: db_config.user,
  password: db_config.password,
});

// mybatis 호출 로직(boardRouter에서 next() 다음 이어지는 로직)
router.post("/", (req, res) => {
  const mybatisMapper = require("mybatis-mapper");
  const param = req.body;
  console.log(param);
  // mybatis mapper경로 설정
  // /moels/SwToolsMapper.xml
  const mapperXml = "./model/" + param.mapper + ".xml";
  console.log(param, mapperXml);
  mybatisMapper.createMapper([mapperXml]);
  var time = new Date();
  console.log("## " + time + " ##");
  console.log("\n Called Mapper Name  = " + param.mapper);

  var format = { language: "sql", indent: "  " };
  //mysql 쿼리 정보 세팅
  var query = mybatisMapper.getStatement(
    param.mapper,
    param.mapper_id,
    param,
    format
  );
  console.log("\n========= Node Mybatis Query Log Start =========");
  console.log(
    "* mapper namespce : " + param.mapper + "." + param.mapper_id + " *\n"
  );
  console.log(query + "\n");

  pool.getConnection(function (err, connection) {
    connection.query(query, function (error, results) {
      if (error) {
        console.log("db error************* : " + error);
      }
      var time2 = new Date();
      console.log("## " + time2 + " ##");
      console.log("## RESULT DATA LIST ## : \n", results);

      if (results) {
        string = JSON.stringify(results);
        var json = JSON.parse(string);
        // crud 타입에 따라 response 값을 다르게 정의한다.
        if ("select" === param.crud) {
          res.send({ json });
        } else { // insert, update, delete
          res.send("success");
        }
      } else {
        res.send("error");
      }
      // 반드시해줘야함 pool 사용시엔 => 없으면 서버가 정상작동하지 않게됨
      connection.release();
      console.log("========= Node Mybatis Query Log End =========\n");
    });
  });
});

module.exports = router;
