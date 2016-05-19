var $logo = $('#page1 .logo');
var pageWidth = $(window).width();
var gForm = document.getElementById('redForm');
console.log(pageWidth);


var getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var smtid = getUrlParam('smtid') ? getUrlParam('smtid') : 'wifi';
// console.log(smtid);

//当屏幕宽度小于800px时，跳转到为手机设备写的页面
if (pageWidth < 1024) { //for ipad
    $('meta[name="viewport"]').attr({
        content: 'width=1024'
    })
};

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    // var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if ( bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM ){
        var currentLocationHref = location.href.split('qczwifi/')[0] + 'qczwifi/';
        window.location.href = currentLocationHref + 'mobile.html?smtid=' + smtid;
    }
}
browserRedirect();




//点击logo跳转到吉利主页http://www.geely.com/welcome/index.html
$logo.click(function() {
    location.href='http://www.geely.com/welcome/index.html';
    _smq.push(['custom','首页','吉利汽车']);
})
$('.mini').click(function() {
    _smq.push(['custom','首页','预约试驾']);
})

$('#configuration').change(function() {
	$('.table').hide();
	$('#' + $(this).val()).show();
})
// var isVideoClicked = 0;
// $('#videoContent').click(function() {
//     isVideoClicked = 1;
//     console.log('clicked')
// })
// $('#videoWrapper').hover(function() {
//     //console.log(isVideoClicked);
//     if (1) {
//         $('#videoContent').attr({
//             'height': '100%'
//         });
//     };
// }, function() {
//     $('#videoContent').attr('height', '130%');
// })
$('#bigger').click(function() {
    $('#biggerVideo').show();
})
$('#biggerVideo').hover(function() {
    $('#cover').hide();
}, function() {
    $('#cover').show();
})
$(document).click(function(e) {
    var obj = e.srcElement || e.target;
    if (obj.id != 'biggerVideo' && obj.id != 'bigger') {
        $('#biggerVideo').hide();
        isBiggerVideo = 0;
    };
})
// 幻灯片
var picIndex = 1;
$('#arrLeft, #arrLeft2').click(function() {
	picIndex--;
	if (picIndex == 0) {
		picIndex = 4;
	};
	$('.pic').hide();
	$('#pic' + picIndex).show();
    $('#pic1' + picIndex).show();
    $('.points .point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
    $('.points2 .point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
})
$('#arrRight, #arrRight2').click(function() {
	picIndex++;
	if (picIndex == 5) {
		picIndex = 1;
	};
	$('.pic').hide();
    $('#pic1' + picIndex).show();
	$('#pic' + picIndex).show();
    $('.points .point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
    $('.points2 .point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
})
var timer = setInterval(function() {
	picIndex++;
	if (picIndex == 5) {
		picIndex = 1;
	};
	$('.pic').hide();
	$('#pic' + picIndex).show();
    $('#pic1' + picIndex).show();
    $('.points .point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
    $('.points2 .point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
}, 3000)
$('.points .point').each(function(index, element) {
    $(this).click(function() {
        picIndex = index + 1;
        // console.log(picIndex);
        $('.pic').hide();
        $('#pic' + picIndex).show();
        $('.point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
        $('.points2 .point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
    })
})
$('.points2 .point').each(function(index, element) {
    $(this).click(function() {
        picIndex = index + 1;
        // console.log(picIndex);
        $('.pic').hide();
        $('#pic1' + picIndex).show();
        $('.point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
        $('.points2 .point').css('background', '#acb3ba').eq(picIndex - 1).css('background', '#fffffe');
    })
})
var isBigGallery = 0;
$('#pic1, #pic2, #pic3, #pic4').click(function() {
    console.log('test')
    $('#bigGallery').show();
    isBigGallery = 1;

})
$(document).click(function(e) {
    // console.log('why')
    var obj = e.srcElement || e.target;
    if (obj.id != 'pic1' && obj.id != 'pic2' && obj.id != 'pic3' && obj.id != 'pic4' && obj.id != 'pic11' && obj.id != 'pic12' && obj.id != 'pic13' && obj.id != 'pic14' && obj.id != 'arrLeft2' && obj.id != 'arrRight2' && obj.id != 'bigGallery') {
        if (isBigGallery == 1) {
            $('#bigGallery').hide();
            isBigGallery = 0;
            console.log('test2')
        };
    };
})


$('.check').click(function() {
	$(this).parent().find('label').trigger('click');
})

var gName = document.getElementById('gName');
var gTel = document.getElementById('gTel');
var gType = document.getElementById('gCarTypes');
var gProvinces = document.getElementById('gProvinces');
var gCities = document.getElementById('gCities');
var gProviders = document.getElementById('gProviders');

// 表单验证
var submitBtn = document.getElementById('submitBtn');
submitBtn.onclick = function(event) {
    _smq.push(['custom','预约试驾','立即预约']);

    if (gName.value.length == 0) {
        alert('请输入姓名！');
        gName.focus();
        return false;
    } else if (gTel.value.length == 0) {
        alert('请输入手机号！');
        gTel.focus();
        return false;
    } else if (gTel.value.length !== 11) {
        alert('您输入的手机号不是11位数字');
        gTel.focus();
        return false;
    } else if (gTel.value.length == 11 && ! /^1\d{10}$/.test(gTel.value)) {
        alert('手机号无效');
        gTel.focus();
        return false;
    } else if (gType.value == '') {
    	alert('请选择意向车型！');
        return false;
    } else if (gProvinces.value == '') {
        alert('请选择省份！');
        return false;
    } else if (gCities.value == '') {
        alert('请选择城市！');
        return false;
    } else if (gProviders.value == '') {
        alert('请选择经销商！');
        return false;
    }

    var gGender = $('input[name=gGender]:checked');

    if(smtid == 'wifi'){
        $.post('api/lms_user.php?act=form',{
            f_name : gName.value,
            f_sex : gGender.val(),
            f_phone : gTel.value,
            f_type : gType.value,
            f_province : gProvinces.value,
            f_city : gCities.value,
            f_company : gProviders.value,
        },function(res){
            if(res.success == 1){
                gForm.reset();
                 _smq.push(['custom','预约试驾','预约成功',res.f_id]);
                 alert('预约成功');
            }else{
                alert(res.message);
            }
        },'json');
    }else{
        $.post('api/user.php?act=form',{
            f_ua : 'pc',
            f_name : gName.value,
            f_sex : gGender.val(),
            f_phone : gTel.value,
            f_type : gType.options[gType.selectedIndex].text,
            f_province : gProvinces.options[gProvinces.selectedIndex].text,
            f_city : gCities.options[gCities.selectedIndex].text,
            f_company : gProviders.options[gProviders.selectedIndex].text,
        },function(res){
            if(res.code == 1){
                gForm.reset();
                 _smq.push(['custom','预约试驾','预约成功',res.f_id]);
                 alert('预约成功');
            }else{
                alert(res.msg);
            }
        },'json');
    }
    return false;
};


var province, city;
function getProvince(){
    var ele = $('#gProvinces');
    $.getJSON('api/lms_store.php?act=province',function(res){
        if(res.success == 1){
            ele.html('<option value="" selected>请选择</option>');
            $.each(res.body.data,function(i,e){
                ele.append('<option value="' + e.id + '">' + e.name + '</option>');
            });
        }else{
            alert(res.message);
        }
    });
}
function getCity(province){
    var ele = $('#gCities');
    $.getJSON('api/lms_store.php?act=city&province=' + province, function(res){
        if(res.success == 1){
            ele.html('<option value="" selected>请选择</option>');
            $.each(res.body.data,function(i,e){
                ele.append('<option value="' + e.id + '">' + e.name + '</option>');
            });
        }else{
            alert(res.message);
        }
    });
}
function getStore(province, city){
    var ele = $('#gProviders');
    $.getJSON('api/lms_store.php?act=store&province=' + province + '&city=' + city, function(res){
        if(res.success == 1){
            ele.html('<option value="" selected>请选择</option>');
            $.each(res.body.data,function(i,e){
                if(e.dealerid != '123456' && e.dealerid != '999999' && e.dealerid != '210011'){
                    ele.append('<option value="' + e.dealerid + '">' + e.dealerfullname + '</option>');
                }
            });
        }else{
            alert(res.message);
        }
    });
}
getProvince();

$('#gProvinces').on('change',function(){
    province = $(this).val();
    getCity(province);
});
$('#gCities').on('change',function(){
    city = $(this).val();
    getStore(province, city);
});