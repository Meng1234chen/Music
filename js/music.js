/*
	分析：
	1. 获取li的index()
	2. 更换背景图片
	3. 更换播放器的图片和文本
	4. 更换播放按钮及title为暂停
	5. 图片旋转
	6. 歌曲播放
	
	其他： 
	1. 暂停/播放
	2. 上一首/下一首
	3. 播放器可以显示/隐藏
	
 */

// 准备工作，收集数据
var index = 0; //初始索引
var li = $(".banner ul li");//获取所有的li元素
var img = $(".music .m-imag img");//获取播放器的img元素
var text = $(".music .m-text");//获取播放器的文本
var prev = $(".music .m-btn .m-prev");//获取播放器上一首a元素的按钮
var play = $(".music .m-btn .m-play");//获取播放器暂停/播放a元素的按钮
var next = $(".music .m-btn .m-next");//获取播放器下一首a元素的按钮
var mp3 = $(".music .m-mp3"); //获取媒体元素
var flag = false; //歌曲是否播放的标记，true播放，false暂停
var close = true;// 播放器是否显示，true显示，false隐藏

// 获取点击的li索引
li.click(function(){
	
	// 获取当前的li索引
	// console.log($(this).index())
	index = $(this).index();
	
	// 播放歌曲
	show();
	
	
});


// 封装一个函数，方便上一首/下一首调用
function show() {
	// 更换背景图片 +1是因为索引是从0开始而图片名称是从1开始的
	change_bg(index+1);
	
	// 更换播放器的图片和文本
	change_img_text(index+1);
	
	// 更换播放按钮及title为暂停
	change_btn_title();
	
	// 图片旋转
	img_rotate();
	
	// 播放歌曲
	play_mp3();
}

//更换背景图片的方法
function change_bg(idx) {
	$("body").css({
		"background":"url(img/"+ idx +"_bg.jpg) no-repeat",
		"background-size": "cover"
	})
}

// 更换播放器的图片和文本
function change_img_text(idx) {
	img.attr("src","img/"+ idx +".jpg");//更换播放器图片
	text.html(li.eq(index).attr("title"));//获取li的title属性，然后替换
}

// 更换播放按钮及title为暂停
function change_btn_title() {
	play.removeClass("m-play"); // 移除原有的播放样式
	play.addClass("m-pause");// 添加新的暂停样式
	play.attr("title","暂停");// 更换暂停
}

// 图片旋转
function img_rotate() {
	//移除所有的img的图片旋转样式
	li.children().removeClass("img_rotate");
	// 给当前点击的图片添加旋转样式
	li.eq(index).children().addClass("img_rotate");
}

// 播放歌曲
function play_mp3() {
	// 获取选中的li的datasrc属性
	mp3.attr("src",li.eq(index).attr("datasrc"));
	mp3.get(0).play();// 播放歌曲
	// 修改歌曲是否播放的标记  true播放，false暂停
	flag = true;
}


// 暂停或者播放歌曲
play.click(function () {
	/*
	 * 如果播放歌曲：
	 * 1. 暂停歌曲
	 * 2. 图片旋转停止
	 * 3. 暂停按钮更换为播放
	 * 4. title更换为播放
	 */
	if(flag) {
		mp3.get(0).pause();//暂停歌曲
		li.eq(index).children().removeClass("img_rotate");//移除图片旋转
		// 暂停按钮变为播放按钮，title更换为播放
		play.removeClass("m-pause").addClass("m-play").attr("title","播放");
		flag = false;
	}else{
		/*
		 * 如果播放暂停：
		 * 1. 播放歌曲
		 * 2. 图片旋转
		 * 3. 播放按钮更换为暂停
		 * 4. title更换为暂停
		 */
		mp3.get(0).play();//播放歌曲
		li.eq(index).children().addClass("img_rotate");//图片旋转
		// 3. 播放按钮更换为暂停,title更换为暂停
		play.removeClass("m-play").addClass("m-pause").attr("title","暂停");
		flag = true;
		
		// 第一次进入页面点击播放按钮时的背景处理
		change_bg(index + 1);
	}
});

// 上一首
prev.click(function () {
	index--;
	if(index < 0){
		index = li.length - 1;
	}
	show();
})

// 下一首
next.click(function () {
	index++;
	if(index > li.length-1){
		index = 0;
	}
	show();
});

// 播放器可以隐藏和显示
$(".m-close").click(function () {
	if(close){
		// 如果显示则隐藏
		$(this).addClass("m-open");
		// 添加向左移动样式1秒完成
		$(".music").animate({"left":"-510px"},500);
		close = false;// 修改播放器显示标志
	}else{
		// 如果隐藏则显示，移除样式
		$(this).removeClass("m-open");
		// 添加向右移动样式，恢复默认值
		$(".music").animate({"left":"0"},500);
		close = true;
	}
})