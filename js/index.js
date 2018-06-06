$(function(){
		
/****初始化变量****/
	var curChip = 2;//默认筹码是2， 有2,10,50,100,500
	var time = 15;//开奖间隔时间15
	var lotterytime = 18;//正在开奖时间，10s
	var waittime = 5;//空闲时间5秒
	var gametype = 0; //游戏的状态,0是可投注状态，1是正在开奖状态,2是空闲状态，3是游戏非正常状态
	var chipname = "chip0"; //筹码名称
	var chipleft = "9%";//筹码位置
	var mygold = 6000;//我的金币
	var uplimitValue = 10000;//投注上限10000
	var totalChipMoney = 0;//下注金额
	var musicBool = true;//是否开启背景音乐
	var chipdataSelf = [0,0,0,0,0,0,0,0,0,0];//10个幸运球队区域自己的投注筹码
	var chipdataTotal = [0,0,0,0,0,0,0,0,0,0];//10个幸运球队区域总的投注筹码
	var overGame = 0;//已经踢完的场次
	
	moveGame(overGame);//移动投注区域到最近的一场比赛
	
/****游戏初始化函数****/
	function init(){
		time = 15;//开奖间隔时间15
		lotterytime = 18;//正在开奖时间，10s
		waittime = 5;//空闲时间5秒
		gametype = 0; //游戏的状态,0是可投注状态，1是正在开奖状态,2是空闲状态，3是游戏非正常状态
		totalChipMoney = 0;//下注金额
		
		chipdataSelf = [0,0,0,0,0,0,0,0,0,0];//10个区域自己的投注筹码
		chipdataTotal = [0,0,0,0,0,0,0,0,0,0];//10个区域总的投注筹码
		
		game_state()
		
		/*播放开始音乐*/
		mbeigin = document.getElementById("mbegin");
		mbeigin.volume = 1;
		mbeigin.src = "./source/begin.wav"; 
		mbeigin.play();
		
		/*播放背景音乐*/
		if(musicBool)
		{
			mbg = document.getElementById("mbg");
			mbg.src = "./source/bg.wav"; 
			mbg.volume = 1;
			mbg.play();
		}	
	}

	init();
	
	//世界杯直播
	var video = document.getElementById("myVideo"); 
	$(".play").click(function(){
		$(".videoBox").addClass("db");
		video.play();
		//关闭背景音乐
		mbg = document.getElementById("mbg");
		mbg.pause();
	})
	
	$(".cloVideo").click(function(){
		video.pause();
		$(".videoBox").removeClass("db");
	})
	
	//世界杯64场球
	var gameInfo = {
		"game1":{
			"id":1,
			"team":["俄罗斯","沙特"],
			"pic":["A-1","A-2"],
			"time":"6/14 23:00 PM",
			"odds": [1.35,2.1,3.5],
			"score":[0,0],
			"chipSelf":[0,100,0],
			"chipTotal":[46000,16000,12000]
		},
		"game2":{
			"id":2,
			"team":["埃及","乌拉圭"],
			"pic":["A-3","A-4"],
			"time":"6/15 20:00 PM",
			"odds": [2.35,3.1,1.2],
			"score":[0,0],
			"chipSelf":[10,400,1000],
			"chipTotal":[16000,26000,42000]
		},
		"game3":{
			"id":3,
			"team":["摩洛哥","伊朗"],
			"pic":["B-3","B-4"],
			"time":"6/15 23:00 PM",
			"odds": [2.35,3.1,1.2],
			"score":[0,0],
			"chipSelf":[10,400,1000],
			"chipTotal":[16000,26000,42000]
		},
		"game4":{
			"id":4,
			"team":["葡萄牙","西班牙"],
			"pic":["B-1","B-2"],
			"time":"6/16 02:00 AM",
			"odds": [2.12,4.3,2.3],
			"score":[0,0],
			"chipSelf":[10000,100,0],
			"chipTotal":[26000,26000,22000]
		},
		"game5":{
			"id":5,
			"team":["法国","澳大利亚"],
			"pic":["C-1","C-2"],
			"time":"6/16 18:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game6":{
			"id":6,
			"team":["阿根廷","冰岛"],
			"pic":["D-1","D-2"],
			"time":"6/16 21:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game7":{
			"id":7,
			"team":["秘鲁","丹麦"],
			"pic":["C-3","C-4"],
			"time":"6/17 00:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game8":{
			"id":8,
			"team":["克罗地亚","尼日利亚"],
			"pic":["D-3","D-4"],
			"time":"6/17 03:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game9":{
			"id":9,
			"team":["哥斯达黎加","塞尔维亚"],
			"pic":["E-3","E-4"],
			"time":"6/17 20:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game10":{
			"id":10,
			"team":["德国","墨西哥"],
			"pic":["F-1","F-2"],
			"time":"6/17 23:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game11":{
			"id":11,
			"team":["巴西","瑞士"],
			"pic":["E-1","E-2"],
			"time":"6/18 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game12":{
			"id":12,
			"team":["瑞典","韩国"],
			"pic":["F-3","F-4"],
			"time":"6/18 20:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game13":{
			"id":13,
			"team":["比利时","巴拿马"],
			"pic":["G-1","G-2"],
			"time":"6/18 23:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game14":{
			"id":14,
			"team":["突尼斯","英格兰"],
			"pic":["G-3","G-4"],
			"time":"6/19 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game15":{
			"id":15,
			"team":["哥伦比亚","日本"],
			"pic":["H-3","H-4"],
			"time":"6/19 20:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game16":{
			"id":16,
			"team":["波兰","塞内加尔"],
			"pic":["H-1","H-2"],
			"time":"6/19 23:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game17":{
			"id":17,
			"team":["俄罗斯","埃及"],
			"pic":["A-1","A-3"],
			"time":"6/20 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game18":{
			"id":18,
			"team":["葡萄牙","摩洛哥"],
			"pic":["B-1","B-3"],
			"time":"6/20 20:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game19":{
			"id":19,
			"team":["乌拉圭","沙特"],
			"pic":["A-4","A-2"],
			"time":"6/20 23:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game20":{
			"id":20,
			"team":["伊朗","西班牙"],
			"pic":["B-4","B-2"],
			"time":"6/21 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game21":{
			"id":21,
			"team":["丹麦","澳大利亚"],
			"pic":["C-4","C-2"],
			"time":"6/21 20:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game22":{
			"id":22,
			"team":["法国","秘鲁"], 
			"pic":["C-1","C-3"],
			"time":"6/21 23:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game23":{
			"id":23,
			"team":["阿根廷","克罗地亚"],
			"pic":["D-1","D-3"],
			"time":"6/22 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game24":{
			"id":24,
			"team":["巴西","哥斯达黎加"],
			"pic":["E-1","E-3"],
			"time":"6/22 20:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game25":{
			"id":25,
			"team":["尼日利亚","冰岛"],
			"pic":["D-4","D-2"],
			"time":"6/22 23:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game26":{
			"id":26,
			"team":["塞尔维亚","瑞士"],
			"pic":["E-4","E-2"],
			"time":"6/23 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game27":{
			"id":27,
			"team":["比利时","突尼斯"],
			"pic":["G-1","G-3"],
			"time":"6/23 20:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game28":{
			"id":28,
			"team":["韩国","墨西哥"],
			"pic":["F-4","F-2"],
			"time":"6/23 23:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game29":{
			"id":29,
			"team":["德国","瑞典"],
			"pic":["F-1","F-3"],
			"time":"6/24 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game30":{
			"id":30,
			"team":["英格兰","巴拿马"],
			"pic":["G-4","G-2"],
			"time":"6/24 20:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game31":{
			"id":31,
			"team":["日本","塞内加尔"],
			"pic":["H-4","H-2"],
			"time":"6/24 23:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game32":{
			"id":32,
			"team":["波兰","哥伦比亚"],
			"pic":["H-1","H-3"],
			"time":"6/25 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game33":{
			"id":33,
			"team":["乌拉圭","俄罗斯"],
			"pic":["A-4","A-1"],
			"time":"6/25 22:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game34":{
			"id":34,
			"team":["沙特","埃及"],
			"pic":["A-2","A-3"],
			"time":"6/25 22:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game35":{
			"id":35,
			"team":["伊朗","葡萄牙"],
			"pic":["B-4","B-1"],
			"time":"6/26 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game36":{
			"id":36,
			"team":["西班牙","摩洛哥"],
			"pic":["B-2","B-3"],
			"time":"6/26 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game37":{
			"id":37,
			"team":["丹麦","法国"],
			"pic":["C-4","C-1"],
			"time":"6/26 22:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game38":{
			"id":38,
			"team":["澳大利亚","秘鲁"],
			"pic":["C-2","C-3"],
			"time":"6/26 22:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game39":{
			"id":39,
			"team":["尼日利亚","阿根廷"],
			"pic":["D-4","D-1"],
			"time":"6/27 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game40":{
			"id":40,
			"team":["冰岛","克罗地亚"],
			"pic":["D-2","D-3"],
			"time":"6/27 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game41":{
			"id":41,
			"team":["墨西哥","瑞典"],
			"pic":["F-2","F-3"],
			"time":"6/27 22:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game42":{
			"id":42,
			"team":["韩国","德国"],
			"pic":["F-4","F-1"],
			"time":"6/27 22:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game43":{
			"id":43,
			"team":["塞尔维亚","巴西"],
			"pic":["E-4","E-1"],
			"time":"6/28 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game44":{
			"id":44,
			"team":["瑞士","哥斯达黎加"],
			"pic":["E-2","E-3"],
			"time":"6/28 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game45":{
			"id":45,
			"team":["日本","波兰"],
			"pic":["H-4","H-1"],
			"time":"6/28 22:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game46":{
			"id":46,
			"team":["塞内加尔","哥伦比亚"],
			"pic":["H-2","H-3"],
			"time":"6/28 22:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game47":{
			"id":47,
			"team":["巴拿马","突尼斯"],
			"pic":["G-2","G-3"],
			"time":"6/29 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game48":{
			"id":48,
			"team":["英格兰","比利时"],
			"pic":["G-4","G-1"],
			"time":"6/29 02:00 AM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
		"game49":{
			"id":49,
			"team":["英格兰","比利时"],
			"pic":["G-4","G-1"],
			"time":"6/30 22:00 PM",
			"odds": [1.5,3.3,1.2],
			"score":[0,0],
			"chipSelf":[10200,100,0],
			"chipTotal":[36000,26000,42000]
		},
	}
	                                                                                                                                                                                                               
	for(var i=1; i<50; i++)
	{
		var theGame = gameInfo["game"+i];
		var teamHTML='<div class="team" num='+i+'>'+
		 			'<ul class="tbox">'+
		 				'<li>'+
		 					'<img src="img/'+theGame["pic"][0]+'.png">'+
		 					'<p>'+theGame["team"][0]+'</p>'+
		 				'</li>'+
		 				'<li>'+
		 					'<h1><span>'+theGame["time"]+'</span></h1>'+
		 					'<h2>'+theGame["score"][0]+' - '+theGame["score"][1]+'</h2>'+
		 					'<h3>( 第'+i+'场 )</h3>'+
		 				'</li>'+
		 				'<li>'+
		 					'<img src="img/'+theGame["pic"][1]+'.png">'+
		 					'<p>'+theGame["team"][1]+'</p>'+
		 				'</li>'+
		 			'</ul>'+
		 			'<ul class="teamChip">'+
		 				'<li><a><h3>'+theGame["team"][0]+'胜</h3><h4>'+theGame["odds"][0]+'</h4><p><span class="selfChip">'+theGame["chipSelf"][0]+'</span> / <span class="totalChip">'+theGame["chipTotal"][0]+'</span></p></a></li>'+
		 				'<li><a><h3>平</h3><h4>'+theGame["odds"][1]+'</h4><p><span class="selfChip">'+theGame["chipSelf"][1]+'</span> / <span class="totalChip">'+theGame["chipTotal"][1]+'</span></p></a></li>'+
		 				'<li><a><h3>'+theGame["team"][1]+'胜</h3><h4>'+theGame["odds"][2]+'</h4><p><span class="selfChip">'+theGame["chipSelf"][2]+'</span> / <span class="totalChip">'+theGame["chipTotal"][2]+'</span></p></a></li>'+
		 			'</ul>'+
		 		'</div>';
		$(".teamAll").append(teamHTML);
	}
	
	//切换比赛
	var oindex = overGame;
	$(".chl").click(function(){
		oindex--;
		if(oindex <= 0) oindex = 0;
		moveGame(oindex);
	})
	$(".chr").click(function(){
		oindex++;
		if(oindex >= 64) oindex = 64;
		moveGame(oindex);
	})
	
	//历史记录
	$(".hisBtn").click(function(){
		$(".history").toggleClass("db");
	})

	
	function moveGame(oi){
		$(".teamAll").animate({"marginLeft":-oi*100+"%"})
	}
 
 	/*开奖函数*/
	function winTeam(team)
	{
		$(".ball").addClass("db").animate({"left":"80%"},1200).animate({"top":"50%"},300).animate({"left":"0"},1500).animate({"top":"0"},300)
		.animate({"left":"80%"},1200).animate({"top":"50%"},300).animate({"left":"0"},1500).animate({"top":"0"},300)
		.animate({"left":"80%"},1200).animate({"top":"50%"},300).animate({"left":"0"},1500).animate({"top":"0"},300);
		
		switch (team)
		{
			case 1:
				$(".ball").animate({"left":"0"},1,function(){shake(0)});
				break;
			case 2:
				$(".ball").animate({"left":"20%"},300,function(){shake(1)});
				break;
			case 3:
				$(".ball").animate({"left":"40%"},600,function(){shake(2)});
				break;
			case 4:
				$(".ball").animate({"left":"60%"},900,function(){shake(3)});
				break;
			case 5:
				$(".ball").animate({"left":"80%"},1200,function(){shake(4)});
				break;
			case 6:
				$(".ball").animate({"left":"80%"},1200).animate({"top":"50%"},300,function(){shake(5)});
				break;
			case 7:
				$(".ball").animate({"left":"80%"},1200).animate({"top":"50%"},300).animate({"left":"60%"},300,function(){shake(6)});
				break;
			case 8:
				$(".ball").animate({"left":"80%"},1200).animate({"top":"50%"},300).animate({"left":"40%"},600,function(){shake(7)});
				break;
			case 9:
				$(".ball").animate({"left":"80%"},1200).animate({"top":"50%"},300).animate({"left":"20%"},900,function(){shake(8)});
				break;
			case 10:
				$(".ball").animate({"left":"80%"},1200).animate({"top":"50%"},300).animate({"left":"0"},1200,function(){shake(9)});
				break;	
		}
	}
	
	/*闪烁函数*/
	function shake(oind)
	{
		$(".cntCY li").eq(oind).addClass("cho");
		setTimeout(function(){
			resultShow();
		},3000)
	}
	
	
	/*结果弹窗函数*/
	function resultShow()
	{
		$(".result,.hidebg").addClass("db");
	}
	
	/*隐藏弹窗函数*/
	function resultHide()
	{
		$(".result,.hidebg").removeClass("db");
	}
	
	$(".cResult").click(function(){
		resultHide();
	});


/****游戏音效****/
	$(".bgBtn").click(function(){
		if($(this).hasClass("close"))
		{
			$(this).removeClass("close")
			musicBool =true;
			if(mbg) mbg.play(); 
		}else
		{
			$(this).addClass("close")
			musicBool = false;
			if(mbg) mbg.pause(); 
		}	
	})

/****赋值我的金币****/
	$(".qb_num").text(mygold);	
	
/****充值弹窗****/
	$(".rcg_lg").click(function(){
		showcharge();
	})
	$(".charge_wrap_close").click(function(){
		hidecharge();
	})	
	//显示充值函数
	function showcharge(){
		$(".page").addClass("db");
	}	
	//隐藏充值函数
	function hidecharge(){
		$(".page").removeClass("db");
	}

/****筹码切换****/
	$(".bottom li").on("click",function(){
		chipname = "chip" + $(this).index();//修改筹码名称
		chipleft = 9 + $(this).index()*17 + "%";//修改筹码位置
		$(this).siblings("li").find("img").removeClass("current");
		$(this).find("img").addClass("current");
		//修改筹码值
		curChip = parseInt($(this).find("span").attr("data-value")) ;
	})

/****倒计时函数****/
function game_state(){
		//状态1：正常投注倒计时
		if(gametype == 0)
		{
			$(".timer").text(changeTimeType(time));
			time--;
			$(".ts2 i").text("投注时间");
			timer1 = setInterval(function(){
				thetime = changeTimeType(time);
				$(".timer").text(thetime);
				if(time == 0)
				{
					//执行等待开奖函数,清除定时器
					clearInterval(timer1);
					setTimeout(function(){
						gametype = 1;
						game_state();
					},1000)	
				}
				time--;
			},1000)
		}

		//状态2：正在开奖中
		if(gametype == 1)
		{
			$(".timer").text(changeTimeType(lotterytime));
			lotterytime--;
			$(".history").removeClass("db");
			//游戏状态变成正在开奖
			var rand = parseInt(Math.random()*10);
			winTeam(rand);
			$(".ts2 i").text("正在开奖");
			
			timer2 = setInterval(function(){
				thetime = changeTimeType(lotterytime);
				$(".timer").text(thetime);
				
				if(lotterytime == 0){
					clearInterval(timer2);
					resultHide();
					$(".ball").removeClass("db");
					$(".ball").css({"left":0,"top":0})
					$(".cntCY li").removeClass("cho");
					$(".cntCY li p").removeClass("db");
					$(".moveChip").remove();
					setTimeout(function(){
						init();
					},1000)		
					
				}
				lotterytime--;
			},1000)
		}		
	}

/****幸运球队投注****/
	$(".cntCY li").click(function(){
		//判断游戏状态,如果是非投注状态，则不执行任何操作，直接返回
		if(gametype) return;
		
		//存储this变量
		_this = this;
		
		//点击的区域
		var tarIndex = $(this).index();//当前点击的区域索引
		chipdataSelf[tarIndex] += curChip;//更新当前区域自己总的投注数量
		
		//判断金币
		moneybool = moneyFun();//金币是否足够，返回true,false
		
		//判断投注上限
		uplimitbool = uplimit(chipdataSelf[tarIndex]); //是否单个区域达到投注上限，返回true,false
		
		//金币不足，弹出充值窗口
		if(!moneybool) {
			showcharge();
			chipdataSelf[tarIndex] -= curChip;
			return;
		//单个投注上限， 弹出上限提示窗口
		}else if(!uplimitbool){
			console.log("单个区域最高投注5000金币");
			chipdataSelf[tarIndex] -= curChip;//还原当前区域所有的投注数量
			return;
		}
		
		$(this).addClass("cli");
		setTimeout(function(){
			$(_this).removeClass("cli")
		},100)	
		
		//投注成功， 减去投注金币， 更新总的投注金额和页面余额显示
		chipdataTotal[tarIndex] += curChip;//更新当前区域所有的投注数量
		mygold -= curChip;//更新我的金币总数量
		totalChipMoney = totalChipMoney + curChip;//更新我自己当前总投注金额
		$(".qb_num").text(mygold);	//更新页面余额显示
		
		//播放下注音乐
		mcoin = document.getElementById("mbegin");
		mcoin.src = "./source/coin.mp3"; 
		mcoin.volume = 1;
 		mcoin.play();
		
		//对应区域显示投注金额
		$(this).find("p").addClass("db").find(".sChip").text(chipdataSelf[tarIndex]); //当前区域自己的投注金额
		$(this).find("p").addClass("db").find(".tChip").text(chipdataTotal[tarIndex]);//当前区域总的投注金额
		
		//创建筹码并移动
		var moveChip = '<span style="left:'+chipleft+'" class="moveChip '+chipname+'"></span>';
		var targetl = $(this).offset().left;
		var targetw = $(this).innerWidth();
		var targett = $(this).offset().top;
		var targeth = $(this).innerHeight(); 
		var disl = Math.random()*(targetw - 15);
		var dist = Math.random()*(targeth - 15);
		var t_l = targetl + disl;
		var t_t = targett + dist;
		$(moveChip).appendTo("body").animate({"left":t_l,"top":t_t},function(){
			$(this).css({"left":disl,"top":dist});
			$(_this).append($(this));
		})
	})

/****世界杯下注****/
	$(".team .teamChip li").click(function(){
		//判断游戏状态,如果是非投注状态，则不执行任何操作，直接返回
		//if(gametype) return;
		
		//存储this变量
		_this = this;
		
		//点击的比赛场次
		var gameIndex = $(this).parents(".team").attr("num");
		//点击的区域
		var tarIndex = $(this).index();

		var ogame = gameInfo["game"+gameIndex];//获取投注的比赛信息
		
		ogame["chipSelf"][tarIndex] += curChip;//更新当前区域自己总的投注数量
		//判断金币
		moneybool = moneyFun();//金币是否足够，返回true,false
		
		//判断投注上限
		uplimitbool = uplimit(ogame["chipSelf"][tarIndex]); //是否单个区域达到投注上限，返回true,false
		
		//金币不足，弹出充值窗口
		if(!moneybool) {
			showcharge();
			ogame["chipSelf"][tarIndex] -= curChip;
			return;
		//单个投注上限， 弹出上限提示窗口
		}else if(!uplimitbool){
			console.log("单个区域最高投注10000金币");
			ogame["chipSelf"][tarIndex] -= curChip;//还原当前区域所有的投注数量
			return;
		}
		
		$(this).addClass("cli");
		setTimeout(function(){
			$(_this).removeClass("cli")
		},100)	
		
		//投注成功， 减去投注金币， 更新总的投注金额和页面余额显示
		ogame["chipTotal"][tarIndex] += curChip;//更新当前区域所有的投注数量
		mygold -= curChip;//更新我的金币总数量
		$(".qb_num").text(mygold);	//更新页面余额显示
		
		//播放下注音乐
		mcoin = document.getElementById("mbegin");
		mcoin.src = "./source/coin.mp3"; 
		mcoin.volume = 1;
 		mcoin.play();
		
		//对应区域显示投注金额
		$(this).find("p").addClass("db").find(".selfChip").text(ogame["chipSelf"][tarIndex]); //当前区域自己的投注金额
		$(this).find("p").addClass("db").find(".totalChip").text(ogame["chipTotal"][tarIndex]);//当前区域总的投注金额
		
		//创建筹码并移动
		var moveChip = '<span style="left:'+chipleft+'" class="moveChip '+chipname+'"></span>';
		var targetl = $(this).offset().left;
		var targetw = $(this).innerWidth();
		var targett = $(this).offset().top;
		var targeth = $(this).innerHeight(); 
		var disl = Math.random()*(targetw - 15);
		var dist = Math.random()*(targeth - 15);
		var t_l = targetl + disl;
		var t_t = targett + dist;
		$(moveChip).appendTo("body").animate({"left":t_l,"top":t_t},function(){
			$(this).css({"left":disl,"top":dist});
			$(_this).append($(this));
			$(this).remove();
		})
	})

/****判断金币是否足够****/
	function moneyFun(){
		if(mygold < curChip){
			return false;
		}else{
			return true;
		}
	}
	
/****判断是否达到投注上限****/
	function uplimit(value){
		if(value > uplimitValue){
			return false;
		}else {
			return true;
		}
	}

/****撤销****/
	$(".clear_con").on("click",function(){
		if(gametype) return; //非投注状态不能撤销
		$(".revokets").addClass("db");
	})
	
	$(".cancelBtn").click(function(){
		$(".revokets").removeClass("db");
	})
	$(".sureBtn").click(function(){
		$(".revokets").removeClass("db");
		mygold += totalChipMoney;
		$(".qb_num").text(mygold);
		clearChip();
	})
	
/****清除筹码下注****/
	function clearChip(){
		$(".moveChip").remove();
		$(".sChip").text("0");
		//更新总的投注数组
		for(var i=0;i<8;i++)
		{
			chipdataTotal[i]-=chipdataSelf[i];
			//如果当前区域总的投注为0 ，那么隐藏投注数据显示
			if(chipdataTotal[i]==0)
			{
				$(".chipTable div").eq(i).find("p").removeClass("db");
			}
		}
		//更新我的总投注金币数量
		totalChipMoney = 0;
		//更新自己的投注数组
		chipdataSelf = [0,0,0,0,0,0,0,0];//自己8个区域的投注筹码
		//调用更新投注数据显示函数
		showChipData();
	}

/****更新投注数据的显示****/
	function showChipData(){
		for(var i=0;i<8;i++)
		{
			$(".chipTable div").eq(i).find(".sChip").text(chipdataSelf[i]);
			$(".chipTable div").eq(i).find(".tChip").text(chipdataTotal[i]);
		}
	}
	
/****时间格式转换(不足10秒的前面补0)****/
	function changeTimeType(time){
		if(time<10) return "0" + time;
		return time;
	}

/**菜单栏弹出**/
	$(".note").click(function(){
		$(".note_in22").toggleClass("db")
	})

	$(document).click(function(e){
		if(e.target.className == "note"){
			return
		}else{
			$(".note_in22").removeClass("db")
		}
		
	})
	
	//游戏规则
	$(".game_rule").click(function(){
		$(".rule").addClass("db");
	})
	
	$(".pop_close,.btn_return").click(function(){
		$(".rule").removeClass("db");
	})
	
	//投注记录
	$(".record").click(function(){
		$(".record_content").addClass("db");
	})
	$(".pop_close,.btn_return").click(function(){
		$(".record_content").removeClass("db");
	})
	
	$(".record_con").click(function(){
		$(this).next(".record_more2").toggleClass("db")
	})

/****第一次进游戏提示****/
	$(".guide_one").addClass("db")
	$(".next_step").click(function(){
		$(".guide_one").removeClass("db")
		$(".guide_two").addClass("db")
	})
	$(".next_step2").click(function(){
		$(".guide_two").removeClass("db")
		$(".guide_three").addClass("db")
	})
	$(".return_step").click(function(){
		$(".guide_three").removeClass("db")
	})
 

})