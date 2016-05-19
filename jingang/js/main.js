// JavaScript Document
var color1=true;
var color2=true;
var color3=true;
var color4=true;
var color5=true;
var color6=true;
var color7=true;
var col=1;
//选择不用色车
$(".color_box").click(function(){
	var color=$(this).data("color");
	$(".gou").hide();
	$(this).find(".gou").show();
	switch(color){
		case 1:
			$(".che360 img").attr("src","../images/color1/"+img_num+".jpg");
			col=1;
			for(var i=1 ;i<=73;i++){
					aImages[i]="../images/color1/"+i+".jpg";
					//preload("images/color1/"+i+".png");
					
				}
			if(color1){
				
				color1=false;
				
			}
		break;	
		case 2:
			$(".che360 img").attr("src","../images/color2/"+img_num+".jpg");
			col=2;
			for(var i=1 ;i<=73;i++){
					aImages[i]="../images/color2/"+i+".jpg";
					//preload("images/color2/"+i+".png");
					
				}

			if(color2){
				
				loading(2);
				color2=false;
				
			}
		break;	
		case 3:
			$(".che360 img").attr("src","../images/color3/"+img_num+".jpg");
			col=3;
			for(var i=1 ;i<=73;i++){
					aImages[i]="../images/color3/"+i+".jpg";
					//preload("images/color3/"+i+".png");
					
				}
			if(color3){
				
				loading(3);
				color3=false;
				
			}
		break;	
		case 4:
			$(".che360 img").attr("src","../images/color4/"+img_num+".jpg");
			col=4;
			for(var i=1 ;i<=73;i++){
					aImages[i]="../images/color4/"+i+".jpg";
					//preload("images/color4/"+i+".jpg");
					
				}
			if(color4){
			
				loading(4);
				color4=false;
				
			}
		break;	
		case 5:
			$(".che360 img").attr("src","../images/color5/"+img_num+".jpg");
			col=5;
			for(var i=1 ;i<=73;i++){
					aImages[i]="../images/color5/"+i+".jpg";
					//preload("images/color5/"+i+".jpg");
					
				}
			if(color5){
				
				loading(5);
				color5=false;
				
			}
		break;	
		case 6:
			$(".che360 img").attr("src","../images/color6/"+img_num+".jpg");
			col=6;
			if(color6){
				for(var i=1 ;i<=73;i++){
					aImages[i]="../images/color6/"+i+".jpg";
					//preload("images/color6/"+i+".jpg");
					
				}
				loading(6);
				color6=false;
				
			}
		break;	
		case 7:
			$(".che360 img").attr("src","../images/color7/"+img_num+".jpg");
			col=7;
			for(var i=1 ;i<=73;i++){
					aImages[i]="../images/color7/"+i+".jpg";
					//preload("images/color7/"+i+".jpg");
					
				}
			if(color7){
				loading(7);
				color7=false;

			}
		break;		

	}
	
});
//车的旋转度数
$(".dunum").click(function(){
	$(".duimg").hide();
	$(this).find(".duimg").show();
	var dunum=$(this).data("du");
	switch(dunum){
		case 30:
			img_num=6;
			$(".che360 img").attr("src","../images/color"+col+"/"+img_num+".jpg");
		break;
		case 90:
			img_num=18;
			$(".che360 img").attr("src","../images/color"+col+"/"+img_num+".jpg");
		break;
		case 150:
			img_num=30;
			$(".che360 img").attr("src","../images/color"+col+"/"+img_num+".jpg");
		break;
		case 180:
			img_num=36;
			$(".che360 img").attr("src","../images/color"+col+"/"+img_num+".jpg");
		break;
		case 210:
			img_num=42;
			$(".che360 img").attr("src","../images/color"+col+"/"+img_num+".jpg");
		break;
		case 270:
			img_num=54;
			$(".che360 img").attr("src","../images/color"+col+"/"+img_num+".jpg");
		break;
		case 330:
			img_num=66;
			$(".che360 img").attr("src","../images/color"+col+"/"+img_num+".jpg");
		break;
		case 360:
			img_num=73;
			$(".che360 img").attr("src","../images/color"+col+"/"+img_num+".jpg");
		break;
	}
	});
//轮播	
$(".ld_nav").click(function(){
	 $(".ld_nav").css("background","none");
	 $(this).css("background","#fff");
	switch($(this).data("liangdian")){
		case 1:
			$(".liangdian1").show().siblings("iframe").hide();
		break;
		case 2:
			$(".liangdian2").show().siblings("iframe").hide();
		break;
		case 3:
			$(".liangdian3").show().siblings("iframe").hide();
		break;
		case 4:
			$(".liangdian4").show().siblings("iframe").hide();
		break;
		
	}
	});	
$(".mt_nav ").click(function(){
	 $(".mt_nav").css("background","none");
	 $(this).css("background","#fff");
	switch($(this).data("meitu")){
		case 2:
			$(".meitu1").show();
			$(".shipin").hide();
		break;
		case 1:
			$(".meitu1").hide();
			$(".shipin").show();
		break;
		
	}
	});		
//滚动条
$(".cs_nav").click(function(){
	var container = $('.tab1'),
    scrollTo = $('#row_'+$(this).data("canshu"));
	//container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
	 container.animate({  
            scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
        }, {  
            duration: 1000,    
        }); 
	});	
	
//回到最顶
var clos=true;
$(".uptop").click(function(){
	$("html,body").animate({scrollTop:0},500);
});	
 $(document).scroll(function() { 
 
 	if($(document).scrollTop()==0 )
	{
		$(".uptop").hide();
	}else{
		$(".uptop").show();
	}
	if($(document).scrollTop()<60){
		$(".nav").fadeIn(300);
	}else{
		$(".nav").fadeOut(300);
	}
	$(".nav,.small_form").css("left",-$(document).scrollLeft());
	//$("#name1").val($(document).height());
	//$("#name").val($(document).scrollTop()+" "+$(window).height());
	//$("#p5").offset().top - $(document).offset().top + $(document).scrollTop()
	if($(document).scrollTop()>=$("#p5").offset().top){
		$(".small_form").hide();
	}else if(clos){
		$(".small_form").show();
		}
	
	if($(document).scrollTop()>0 && $(document).scrollTop()<$("#p2").offset().top-65){
			$(".nav li ").removeClass("nav_bg");
			$(".nav ul li:nth-child(1)").addClass("nav_bg");
		}else if($(document).scrollTop()>=$("#p2").offset().top-65 && $(document).scrollTop()<$("#p3").offset().top-65){
			$(".nav li ").removeClass("nav_bg");
			$(".nav ul li:nth-child(2)").addClass("nav_bg");
		}else if($(document).scrollTop()>=$("#p3").offset().top-65 && $(document).scrollTop()<$("#p4").offset().top-65){
			$(".nav li ").removeClass("nav_bg");
			$(".nav ul li:nth-child(3)").addClass("nav_bg");
		}else if($(document).scrollTop()>=$("#p4").offset().top-65 && $(document).scrollTop()<$("#p5").offset().top-65){
			$(".nav li ").removeClass("nav_bg");
			$(".nav ul li:nth-child(4)").addClass("nav_bg");
		}else if($(document).scrollTop()>=$("#p5").offset().top-65 && $(document).scrollTop()<$("#p6").offset().top-65){
			$(".nav li ").removeClass("nav_bg");
			$(".nav ul li:nth-child(5)").addClass("nav_bg");
		}
	
	if($(document).scrollTop()==$(document).height()-$(window).height())
	{
		
		$(".nav li ").removeClass("nav_bg");
		$(".nav ul li:nth-child(6)").addClass("nav_bg");
	}
 });
 
$(".close").click(function(){
	
	clos=false;
	$(".small_form").hide();
	$(".shijia").show();
	});
	

$(".shijia").click(function(){
	
	if($(document).scrollTop()<$("#p5").offset().top){
		clos=true;
		$(".small_form").show();
		$(this).hide();
	}
	});
//导航事件
$(".nav a").click(function(){
	$(".nav li ").removeClass("nav_bg");
	$(this).parent().addClass("nav_bg");
	
	var container = $('html,body'),
    scrollTo = $('#p'+$(this).data("page"));
	//container.scrollTop(scrollTo.offset().top - container.offset().top + container.scrollTop());
	 container.animate({  
            scrollTop: scrollTo.offset().top-65
        }, {  
            duration: 1000,    
        }); 
	
	});	
$("#nav").hover(function(){
	$(".nav").fadeIn(300);
	},function(){
		if($(document).scrollTop()>60){
			$(".nav").fadeOut(300);
		}
	});	
$(".zixun_text ul li a").mouseover(function(){
	
	$(".zixun_img img").attr("src","../images/zx_img"+$(this).data('zixun')+".jpg");
	$(".zixun_text ul li a").css("color","#000");
	$(".zixun_text ul li").css("background","none");
	$(this).css("color","#3366cc");
	$(this).parent().css("background","url(../images/zxi.png) no-repeat left center");
});
$(".close2").click(function(){
	$(".zixun_list").hide();
	});
$(".more").click(function(){
	$(".zixun_list").show();
	});
//alert($(window).width());
if($(window).width()<=1400){
		$(".du").css("left","6%");
		$(".chetext ").css("left","5%");
		$(".liuzi_text").css("top","55%");
		$(".bigbox").css("width",'100%');
		$(".zixun_text ul li").css("line-height","38px");
}
if($(window).width()<=1200){
	$(".du").css("left","3%");
	$(".zixun_text ul li").css("line-height","35px");
	$(".zixun_text ul").css("margin-top","-10px");
}
if($(window).width()<=1100){
	$(".du").css("left","1%");
}

$(window).resize(function(){
	if($(window).width()<=1400){
		$(".du").css("left","6%");
		$(".chetext ").css("left","5%");
		$(".liuzi_text").css("top","55%");
		$(".bigbox").css("width",'100%');
	}
	if($(window).width()<=1200){
		$(".du").css("left","3%");
		
	}
	if($(window).width()<=1100){
		$(".du").css("left","1%");
		
	}
});
