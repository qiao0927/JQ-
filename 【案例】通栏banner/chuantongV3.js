function chuantongV3(lunboshijian,jiangeshijian) {
	var nowimg = 0;
	//复制一个开头的图片
	//clone()就表示克隆一个元素。克隆的元素，必须使用appentTo追加到一个元素中。
	$(".chuantong .imagelist li:first").clone().appendTo(".chuantong .imagelist");

	/*定时器*/
	var timer =	setInterval(rightButFunc,jiangeshijian);

	$(".chuantong").mouseenter(function(){
		clearInterval(timer);
	});

	$(".chuantong").mouseleave(function(){
		clearInterval(timer);
		timer =	setInterval(rightButFunc,jiangeshijian);
	});
	/*定时器*/

	//右按钮
	$(".chuantong .buttons .rightBut").click(rightButFunc);
	function rightButFunc(){
		if(!$(".chuantong .imagelist").is(":animated")){
			if(nowimg < $(".chuantong .imagelist li").length - 2){
				nowimg++;
				//当前没有到最后一张，所以就是往-100%的信号量倍数上拉。
				$(".chuantong .imagelist").animate({"left":-100 * nowimg + "%"},lunboshijian);
			}else{
				nowimg = 0;
				//当前已经到了最后一张，所以就是要多拉一个-100%，然后瞬间移动到0：
				$(".chuantong .imagelist").animate({"left":-100 *($(".chuantong .imagelist li").length - 1) + "%"},lunboshijian,function(){
					$(".chuantong .imagelist").css("left",0);
				})
			}
			$(".chuantong .imgnav li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
		}
	}
	//左按钮
	$(".chuantong .buttons .leftBut").click(
		function(){
			if(!$(".chuantong .imagelist").is(":animated")){
				$(".chuantong .imagelist").stop(true); //防止动画积累

				if(nowimg > 0){
					nowimg --;
					//当前没有到第1张，所以就是往-100%的信号量倍数上拉
					$(".chuantong .imagelist").animate({"left":-100*nowimg+"%"},lunboshijian);
				}else{
					nowimg = $(".chuantong .imagelist li").length - 2;
					//瞬间替换为假的狮子，然后拉动
					$(".chuantong .imagelist").css("left",-100*($(".chuantong .imagelist li").length - 1) + "%");
					$(".chuantong .imagelist").animate({"left":-100*nowimg+"%"},lunboshijian);
				}

				$(".chuantong .imgnav li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
			}
		}
	);

	$(".chuantong .imgnav li").click(
		function(){
			$(".chuantong .imagelist").stop(true); //防止动画积累
			nowimg = $(this).index();
			$(".chuantong .imagelist").animate({"left":-tupiankuandu*nowimg},lunboshijian);
			$(".chuantong .imgnav li").eq(nowimg).addClass("cur").siblings().removeClass("cur");
		}
	);
}	