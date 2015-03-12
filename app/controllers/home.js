var express = require('express'),
	router = express.Router(),
  	Article = require('../models/article');

//------------- MySQL-----------------//
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : "175.126.56.188",
    port : 3306,
    user : "nyb",
    password : "Skp02466",
    database : "courspick"
});
//-------------------------------------//
module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];

    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
});


//hyperlink to Login page
router.get('/login', function (req, res, next) {
  var articles = [new Article(), new Article()];

    res.render('login', {
      title: 'Generator-Express MVC',
      articles: articles
    });
});


//hyperlink to Signup page
router.get('/signup', function (req, res, next) {
  var articles = [new Article(), new Article()];

    res.render('signup', {
      title: 'Generator-Express MVC',
      articles: articles
    });
});



//추가된 router
router.get('/users', function (req, res, next) {
	var name = req.param('name');
	var price = req.param('price');
  	res.send('name : '+name + ', price: ' + price);// 받은 값을 다시 넘겨주기
});

router.post('/users', function (req, res, next) {
	var name = req.param('name');
	var price = req.param('price');
	var item={
		name: name,
		price: price
	};

	// //// select 
	// var query = connection.query('select * from User', function (err, rows) {
	//     if(err){
	//         connection.release();
	//         throw err;
	//     }
	//     console.log(rows);
	// });
	// /////

  	res.send({ 
  		message:'데이터를 추가했습니다.', 
  		data: item
  	});
});


// DB 접근이 필요한 router
// 1. select
router.get('/dbSelect', function (req, res, next) {
	var user_cd = req.param('user_cd');
	var user_id;	
	// user_cd로 DB에서 SELECT수핼
	var sql = 'select * from User where User_Cd=?';
	var query = connection.query(sql, [ user_cd ], 
		function (err, rows) {
	    if(err){
	        connection.release();
	        throw err;
	    }
	    console.log(rows);

	    user_id = rows[0].User_Id; // rows[id] 접근!
		res.send(user_id);
	});

});

// 2. insert
router.post('/signup', function (req, res, next) {
	var user_id = req.param('user_id');
	var user_pwd = req.param('user_pwd');
	var user_type_cd = req.param('user_type_cd');

	console.log('start insert');
	//// select 
	var sql = 'insert into User(user_id, user_pwd, user_type_cd) VALUES(?, ?, ?)';
	var query = connection.query(sql, [user_id, user_pwd, user_type_cd], 
		function (err, rows) {
	    if(err){
	        connection.release();
	        throw err;
	    }
	    console.log(rows);
  	});
});

// 3. delete
router.get('/dbDelete', function (req, res, next) {
	var user_cd = req.param('user_cd');

	// user_cd로 DB에서 SELECT수핼
	var sql = 'delete from User where User_Cd=?';
	var query = connection.query(sql, [ user_cd ], 
		function (err, rows) {
	    if(err){
	        connection.release();
	        throw err;
		//	res.send('delete fail!');//처리해주어야..
	    }
	//    console.log(rows);

		res.send('delete success!');
	});

});