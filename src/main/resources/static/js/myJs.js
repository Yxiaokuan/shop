$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


$.ajaxSetup({

    //设置ajax请求结束后的执行动作
    complete : function(XMLHttpRequest, textStatus) {
        // 通过XMLHttpRequest取得响应头，REDIRECT

        var redirect = XMLHttpRequest.getResponseHeader("REDIRECT");//若HEADER中含有REDIRECT说明后端想重定向
        if (redirect == "REDIRECT") {
            var win = window;
            while (win != win.top){
                win = win.top;
            }
            //将后端重定向的地址取出来,使用win.location.href去实现重定向的要求
            win.location.href= XMLHttpRequest.getResponseHeader("CONTENTPATH");
        }
    }
});

function myProjectName() {
    //获取当前网址，如： http://localhost:8080/myproj/view/my.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： myproj/view/my.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8080
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/myproj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    //得到了 http://localhost:8080/myproj
    var realPath=localhostPaht+projectName;
    return projectName;
    //alert(realPath);
}


