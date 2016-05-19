var pageHeight = $(window).height();
var pageWidth = $(window).width();
var $pages = $('.page');
var $gForm = $('#gForm');
var $items = $('.item');
var $note = $('.page2_note');
var $declare = $('.page2_declare');
var btn1 = document.getElementById('button1');
var btn2 = document.getElementById('button2');
var btn3 = document.getElementById('number');
var gForm = document.getElementById('gForm');
var gName = document.getElementById('gName');
// var gGenderBoy = document.getElementById('gGenderBoy');
// var gGenderGirl = document.getElementById('gGenderGirl');
var gTel = document.getElementById('gTel');
var gType = document.getElementById('gCarTypes');
var gProvinces = document.getElementById('gProvinces');
var gCities = document.getElementById('gCities');
var gProviders = document.getElementById('gProviders');
var btn3 = document.getElementById('number');
var re = /^1\d{10}$/;
var pageIndex = 1;
var $arrows = $('.arrow');

function showPage(pageNum) {
    $pages.hide().eq(pageNum-1).show();
}
console.log(pageHeight)

var getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var smtid = getUrlParam('smtid') ? getUrlParam('smtid') : 'wifi';

showPage(1);

$pages.css('height', pageHeight);
$arrows.css({
    height: pageHeight * 0.3225 / 12 + 'px',
})
$items.css({
    height: (pageHeight * 0.3225 - 6) / 6 + 'px',
    'line-height': (pageHeight * 0.3225 - 6) / 6  + 'px'
})
$('.page2_time').css({
    height: pageHeight * 0.0415 + 'px',
    'line-height': pageHeight * 0.0415 + 'px'
})

var noteHeight = pageHeight * 0.2927 - 3;
if (pageWidth >= 1106) {
    $note.css({
        'line-height': noteHeight / 5 + 'px'
    });
    $('.note h3').css({
        'line-height': noteHeight / 5 + 'px'
    });
}else if (pageWidth >= 635) {
    $note.css({
        'line-height': noteHeight / 6 + 'px'
    });
    $('.note h3').css({
        'line-height': noteHeight / 6 + 'px'
    });
}else if (pageWidth >= 566) {
    $note.css({
        'line-height': noteHeight / 7 + 'px'
    });
    $('.note h3').css({
        'line-height': noteHeight / 7 + 'px'
    });
}else if (pageWidth >= 404) {
    $note.css({
        'line-height': noteHeight / 8 + 'px'
    });
    $('.note h3').css({
        'line-height': noteHeight / 8 + 'px'
    });
}else if (pageWidth >= 386) {
    $note.css({
        'line-height': noteHeight / 9 + 'px'
    });
    $('.note h3').css({
        'line-height': noteHeight / 9 + 'px'
    });
}else if (pageWidth >= 332) {
    $note.css({
        'line-height': noteHeight / 10 + 'px'
    });
    $('.note h3').css({
        'line-height': noteHeight / 10 + 'px'
    });
}else if (pageWidth >= 296) {
    $note.css({
        'line-height': noteHeight / 11 + 'px'
    });
    $('.note h3').css({
        'line-height': noteHeight / 11 + 'px'
    });
};

console.log(pageWidth)
var declareHeight = pageHeight * 0.07;
if (pageWidth >= 616) {
    $declare.css({
        'line-height': declareHeight / 1 + 'px'
    });
}else if (pageWidth >= 316) {
    $declare.css({
        // height: declareHeight + 'px',
        'line-height': declareHeight / 2 + 'px'
    });
};

$('.check').click(function() {
    $(this).parent().find('label').trigger('click');
});
$('.arrow').click(function() {
    console.log('clicked')
    $(this).parent().find('select').trigger('click');
});

btn1.onclick = function(event) {
    event.preventDefault();
    console.log('btn1 is clicked');
    showPage(2);
    pageIndex = 2;
    _smq.push(['custom','预约试驾','预约试驾']);
};

btn2.onclick = function(event) {
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
    } else if (gTel.value.length == 11 && !re.test(gTel.value)) {
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
            // f_sex : gGender.val(),
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
            f_ua : 'mobile',
            f_name : gName.value,
            // f_sex : gGender.val(),
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
btn3.onclick = function() {
    _smq.push(['custom','预约试驾','预约电话']);
}


var startX, startY, endX, endY, distance, pathX, pathY;
function load (){
    document.addEventListener('touchstart',touch, false);
    document.addEventListener('touchmove',touch, false);
    document.addEventListener('touchend',touch, false);
     
    function touch (event){
        var event = event || window.event;
        switch(event.type){
            case "touchstart":
                startX = event.touches[0].pageX;
                startY = event.touches[0].pageY;
                break;
            case "touchend":
                endX = event.changedTouches[0].pageX;
                endY = event.changedTouches[0].pageY;
                pathX = endX - startX;
                pathY = endY - startY;
                distance = Math.sqrt(pathX*pathX + pathY*pathY);
                if (distance >= 100) {
                    console.log('distance is more than 100!');
                    if(pageIndex == 1) {
                        showPage(2);
                        pageIndex = 2;
                    }else{
                        showPage(1);
                        pageIndex = 1;
                    };
                };
                break;
            case "touchmove":
                event.preventDefault();
                break;
        }
    }
}
window.addEventListener('load',load, false);


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