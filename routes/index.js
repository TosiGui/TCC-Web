var express = require('express');
var router = express.Router();
var User = require('../models/user');
let global = {};
var axios = require('axios');

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});

router.get('/buttonPanic', function (req, res) {

	const data = JSON.stringify({name: "sam"});
	const options = {
		headers: {"content-type": "application/json"}
	}
	axios.post("http://127.0.0.1:8000/webhook", data, options);
	res.send('Função executada com sucesso');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;

	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf,
							keyword: '',
							url: '',
							token: '',
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else {
								console.log('Success');
							}
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

router.get('/login', function (req, res) {
	return res.render('login.ejs');
});

router.post('/qrCode', async function (req, res) {
	console.log(req.session.userId);
	console.log(req.body);
	await User.findOneAndUpdate({unique_id:req.session.userId}, { keyword: req.body.keyword, url: req.body.url, token: req.body.token });
	res.send({"Success":"Success!"});
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else {
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

router.get('/profile', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		if(!data){
			res.redirect('/');
		}else{
			return res.render('data.ejs', {"name":data.username,"email":data.email});
		}
	});
});



router.get('/logout', function (req, res, next) {
	console.log("logout")
	if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
    	if (err) {
    		return next(err);
    	} else {
    		return res.redirect('/');
    	}
    });
}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

module.exports = router;