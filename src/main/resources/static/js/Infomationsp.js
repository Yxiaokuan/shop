var pageContext = '';

$(document).ready(function () {
    if (undefined != $("#PageContext").val()) {
        pageContext = $("#PageContext").val();
    }

});

function del() {
    var checkbox = $('input[name=checkbox1]:checked').val([]);
    var names = "";
    var status=false;
    for (var i = 0; i < checkbox.length; i++) {
        if(checkbox[i].title!=0){
            status=true;
        }
        if (i == 0) {
            names += checkbox[i].value
        }
        else {
            names += "," + checkbox[i].value
        }
    }
    if (names == "") {
        alert("请选要删除的事项");
        return;

    }
    // else if(status){
    //     alert("删除的事项必须是未申报的事项，请重新选择");
    //     return;
    // }
    else {
        $.ajax({
            type: 'post',
            url: pageContext + "/delete",
            async: false,
            dataType: "json",
            data: {params: names}
        }).success(function (data) {
            alert("删除成功");
            window.location.reload();
        }).error(function () {
            alert("数据异常");
        });
    }
}



function getInfo(img, show, num, ID, YWSXBM) {
    var imgid = img + num;
    var showid = show + num;
    var x = $("#" + imgid)[0].src;
    if (x.indexOf("down2") == -1) {
        $("#" + imgid).attr("src", "img/down2.png");
        $('#' + showid).html('');
    }
    else {
        $.ajax({
            type: 'get',
            url: pageContext + "/ProjectapprovalInfo/" + ID,
            async: false,
            dataType: "json",
            data: {}
        }).success(function (data) {
            if (x.indexOf("down2") != -1) {
                var GCLB=$("#GCLB").val();
                $("#" + imgid).attr("src", "img/up2.png");
                if (YWSXBM.indexOf("项目备案") != -1 || YWSXBM.indexOf("项目核准") != -1 || YWSXBM.indexOf("审批") != -1) {
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="ghtdyjs_data1" >' +
                        '<td class="td_title">批文名称</td>' +
                        '<td colspan="3" align="left" style="width: 80%;">' + (data.bumf_TITLE == null ? '' : data.bumf_TITLE) + '</td>' +
                        '</tr>' +
                        '<tr id="ghtdyjs_data2" >' +
                        '<td class="td_title">批文文号</td>' +
                        '<td>' + (data.bumf_SERIALNO == null ? '' : data.bumf_SERIALNO) + '</td>' +
                        '<td class="td_title"></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '<tr id="xmkxx_data3" >' +
                        '<td class="td_title" style="width: 15%;">批复机关</td>' +
                        '<td style="width: 35%;">' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title" style="width: 15%;">批复日期</td>' +
                        '<td style="width: 35%;">' + (data.APPROVAL_TIME == null ? '' : data.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="xmkxx_data5" >' +
                        '<td class="td_title">总投资（万元）</td>' +
                        '<td>' + (data.pro_TOTAL == null ? '' : data.pro_TOTAL) + '</td>' +
                        '<td></td>' +
                        '</tr>' +
                        '<tr id="xmkxx_data8" >' +
                        '<td class="td_title">建设地址</td>' +
                        '<td colspan="3" align="left">' + (data.pro_ADDRESS == null ? '' : data.pro_ADDRESS) + '</td>' +
                        '</tr>' +
                        '</table>' +
                        '</td>');
                }
                else if (YWSXBM.indexOf("项目节能审查") != -1) {
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc3_data1">' +
                        '<td class="td_title" width="15%">批文名称</td>' +
                        '<td  width="35%">' + (data.bumf_TITLE == null ? '' : data.bumf_TITLE) + '</td>' +
                        '<td class="td_title" width="15%">批文文号</td>' +
                        '<td width="35%">' + (data.bumf_SERIALNO == null ? '' : data.bumf_SERIALNO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc3_data3" >' +
                        '<td class="td_title">批复机关</td>' +
                        '<td>' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title">批复日期</td>' +
                        '<td>' + (data.APPROVAL_TIME == null ? '' : data.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc3_data4" >' +
                        '<td class="td_title">有效期<br>（截止日期）</td>' +
                        '<td>' + (data.approval_JZRQ == null ? '' : data.approval_JZRQ) + '</td>' +
                        '<td class="td_title"></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '<tr id="jsgc3_data5" >' +
                        '<td style="vertical-align: middle;" rowspan="5" align="center" class="td_title">年用能规模</td>\n' +
                        '<td class="td_title" colspan=2>综合能耗当量值(吨标准煤)计算</td>' +
                        '<td>' + (data.zhnhdlz == null ? '' : data.zhnhdlz) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc3_data6" >' +
                        '<td class="td_title" colspan=2>其中:电力(万千瓦时)</td>' +
                        '<td >' + (data.electric == null ? '' : data.electric) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc3_data7" >' +
                        '<td class="td_title" colspan=2>其中:天然气(千立方米)</td>' +
                        '<td>' + (data.gas == null ? '' : data.gas) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc3_data8">' +
                        '<td class="td_title" colspan=2>其中:其他(吨标准煤)</td>' +
                        '<td>' + (data.qt == null ? '' : data.qt) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc3_data9" >' +
                        '<td class="td_title" colspan=2>综合能耗等价值(吨标准煤)</td>' +
                        '<td>' + (data.zhnhdjz == null ? '' : data.zhnhdjz) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc3_data10" >' +
                        '<td style="vertical-align: middle;" rowspan="5" align="center" class="td_title">单耗</td>' +
                        '<td class="td_title" colspan=2>数值</td>' +
                        '<td >' + (data.dh == null ? '' : data.dh) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc3_data11">' +
                        '<td class="td_title" colspan=2>单位</td>' +
                        '<td> 吨标准煤 </td>' +
                        '</tr>' +
                        '</table></td>');
                }
                else if (YWSXBM.indexOf("规划土地意见书") != -1) {
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;">' +
                        '<table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="ghtdyjs_data1">' +
                        '<td class="td_title">批文名称</td>' +
                        '<td colspan="3" align="left" style="width: 80%;">' + (data.bumf_TITLE == null ? '' : data.bumf_TITLE) + '</td>' +
                        '</tr>' +
                        '<tr id="ghtdyjs_data2">' +
                        '<td class="td_title" style="width: 15%;">批文文号</td>' +
                        '<td width="35%">' + (data.bumf_SERIALNO == null ? '' : data.bumf_SERIALNO) + '</td>' +
                        '<td class="td_title" style="width: 15%;">证书编号</td>' +
                        '<td width="35%">' + (data.cert_NO == null ? '' : data.cert_NO) + '</td>' +
                        '</tr>' +
                        '<tr id="ghtdyjs_data3" >' +
                        '<td class="td_title">批复机关</td>' +
                        '<td>' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title">批复日期</td>' +
                        '<td>' + (data.APPROVAL_TIME == null ? '' : data.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="ghtdyjs_data4" >' +
                        '<td class="td_title">有效期<br>（截止日期）</td>' +
                        '<td>' + (data.approval_JZRQ == null ? '' : data.approval_JZRQ) + '</td>' +
                        '<td class="td_title"></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '<tr id="ghtdyjs_data5">' +
                        '<td class="td_title">申请用地性质</td>' +
                        '<td>' + (data.ydxz == null ? '' : data.ydxz) + '</td>' +
                        '<td class="td_title">项目拟选位置</td>' +
                        '<td>' + (data.pro_ADDRESS == null ? '' : data.pro_ADDRESS) + '</td>' +
                        '</tr>' +
                        '<tr id="ghtdyjs_data6" style="display:none;">' +
                        '<td class="td_title">拟用地面积</td>' +
                        '<td>' + (data.pro_LAND_AREA == null ? '' : data.pro_LAND_AREA) + '</td>' +
                        '<td class="td_title">拟建建设规模</td>' +
                        '<td>' + (data.pro_SCALE == null ? '' : data.pro_SCALE) + '</td>' +
                        '</tr>' +
                        '</table></td>');
                }
                else if (YWSXBM.indexOf("建设用地规划许可证") != -1) {
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;" >' +
                        '<table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover"> ' +
                        '<tr id="jsndghxkz_data1" style="display:none;">' +
                        '<td class="td_title">批文名称</td>' +
                        '<td colspan=3 align="left" style="width: 80%;">' + (data.bumf_TITLE == null ? '' : data.bumf_TITLE) + '</td>' +
                        '</tr>' +
                        '<tr id="ghtdyjs_data2" >' +
                        '<td class="td_title" style="width: 15%;">批文文号</td>' +
                        '<td style="width: 35%;">' + (data.bumf_SERIALNO == null ? '' : data.bumf_SERIALNO) + '</td>' +
                        '<td class="td_title" style="width: 15%;">证书编号</td>' +
                        '<td style="width: 35%;">' + (data.cert_NO == null ? '' : data.cert_NO) + '</td>' +
                        '</tr>' +
                        '<tr id="ghtdyjs_data3" >' +
                        '<td class="td_title">批复机关</td>' +
                        '<td>' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title">批复日期</td>' +
                        '<td>' + (data.APPROVAL_TIME == null ? '' : data.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="ghtdyjs_data4" >' +
                        '<td class="td_title">有效期<br>（截止日期）</td>' +
                        '<td>' + (data.approval_JZRQ == null ? '' : data.approval_JZRQ) + '</td>' +
                        '<td class="td_title"></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '<tr id="jsndghxkz_data5" >' +
                        '<td class="td_title">批准用地机关</td>' +
                        '<td>' + (data.approval_LAND_ORGAN == null ? '' : data.approval_LAND_ORGAN) + '</td>' +
                        '<td class="td_title">批准用地文号</td>' +
                        '<td>' + (data.bumf_LAND_SERIALNO == null ? '' : data.bumf_LAND_SERIALNO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsndghxkz_data6">' +
                        '<td class="td_title">用地位置</td>' +
                        '<td>' + (data.pro_ADDRESS == null ? '' : data.pro_ADDRESS) + '</td>' +
                        '<td class="td_title">用地面积</td>' +
                        '<td>' + (data.pro_LAND_AREA == null ? '' : data.pro_LAND_AREA) + '</td>' +
                        '</tr>' +
                        '<tr id="jsndghxkz_data7">' +
                        '<td class="td_title">土地用途</td>' +
                        '<td>' + (data.ydxz == null ? '' : data.ydxz) + '</td>' +
                        '<td class="td_title">建设规模</td>' +
                        '<td>' + (data.pro_SCALE == null ? '' : data.pro_SCALE) + '</td>' +
                        '</tr>' +
                        '<tr id="jsndghxkz_data8">' +
                        '<td class="td_title">土地取得方式</td>' +
                        '<td>' + (data.land_TYPE == null ? '' : data.land_TYPE) + '</td>' +
                        '<td class="td_title"></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '</table></td>');
                }
                else if (YWSXBM.indexOf("建设工程设计方案") != -1) {
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc1_data1" >' +
                        '<td class="td_title">批文名称</td>' +
                        '<td colspan=3 align="left" style="width: 80%;">' + (data.bumf_TITLE == null ? '' : data.bumf_TITLE) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc1_data2" >' +
                        '<td class="td_title" style="width: 15%;">批文文号</td>' +
                        '<td style="width: 35%;">' + (data.bumf_SERIALNO == null ? '' : data.bumf_SERIALNO) + '</td>' +
                        '<td class="td_title" style="width: 15%;">证书编号</td>' +
                        '<td style="width: 13%;">' + (data.cert_NO == null ? '' : data.cert_NO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc1_data3" >' +
                        '<tr id="ghtdyjs_data3" >' +
                        '<td class="td_title">批复机关</td>' +
                        '<td>' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title">批复日期</td>' +
                        '<td>' + (data.APPROVAL_TIME == null ? '' : data.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc1_data4" >' +
                        '<td class="td_title">有效期<br>（截止日期）</td>' +
                        '<td>' + (data.approval_JZRQ == null ? '' : data.approval_JZRQ) + '</td>' +
                        '<td class="td_title"></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '<tr id="jsgc1_data5" >' +
                        '<td class="td_title">项目位置</td>' +
                        '<td>' + (data.pro_ADDRESS == null ? '' : data.pro_ADDRESS) + '</td>' +
                        '<td class="td_title">建设用地面积</td>' +
                        '<td>' + (data.pro_LAND_AREA == null ? '' : data.pro_LAND_AREA) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc1_data6" >' +
                        '<td class="td_title">规划用地性质</td>' +
                        '<td>' + (data.ydxz == null ? '' : data.ydxz) + '</td>' +
                        '<td class="td_title">总建筑面积（㎡）</td>' +
                        '<td>' + (data.pro_BUILD_AREA == null ? '' : data.pro_BUILD_AREA) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc1_data7" >' +
                        '<td class="td_title">地上建筑面积（㎡）</td>' +
                        '<td>' + (data.pro_UP_AREA == null ? '' : data.pro_UP_AREA) + '</td>' +
                        '<td class="td_title">地下建筑面积（㎡）</td>' +
                        '<td>' + (data.pro_DOWN_AREA == null ? '' : data.pro_DOWN_AREA) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc1_data8" >' +
                        '<td class="td_title">计容建筑面积（㎡）</td>' +
                        '<td>' + (data.capacity_BUILDAREA == null ? '' : data.capacity_BUILDAREA) + '</td>' +
                        '<td class="td_title">容积率</td>' +
                        '<td>' + (data.plotratio == null ? '' : data.plotratio) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc1_data9" >' +
                        '<td class="td_title">建筑高度控制要求（m）</td>' +
                        '<td>' + (data.height_CONTROL == null ? '' : data.height_CONTROL) + '</td>' +
                        '<td class="td_title"></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '</table></td>');
                }
                else if (YWSXBM.indexOf("建设工程规划许可证") != -1) {
                    var data1 = JSON.parse(data.by12);
                    var tmp= '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data1" >' +
                        '<td class="td_title">批文名称</td>' +
                        '<td  colspan=3 align="left" style="width: 80%;">' + (data.bumf_TITLE == null ? '' : data.bumf_TITLE) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data2" >' +
                        '<td class="td_title" style="width: 15%;">批文文号</td>' +
                        '<td style="width: 35%;">' + (data.bumf_SERIALNO == null ? '' : data.bumf_SERIALNO) + '</td>' +
                        '<td class="td_title" style="width: 15%;">证书编号</td>' +
                        '<td style="width: 35%;">' + (data.cert_NO == null ? '' : data.cert_NO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data3" >' +
                        '<td class="td_title">批复机关</td>' +
                        '<td>' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title">批复日期</td>' +
                        '<td>' + (data.APPROVAL_TIME == null ? '' : data.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data4">' +
                        '<td class="td_title">有效期<br>（截止日期）</td>' +
                        '<td>' + (data.approval_JZRQ == null ? '' : data.approval_JZRQ) + '</td>' +
                        '<td class="td_title">项目位置</td>' +
                        '<td>' + (data.pro_ADDRESS == null ? '' : data.pro_ADDRESS) + '</td>' +
                        '</tr>';
                    if(GCLB!=4){
                        tmp+= '<tr id="jsgc2_data5">' +
                            '<td class="td_title">建设用地面积</td>' +
                            '<td>' + (data.pro_LAND_AREA == null ? '' : data.pro_LAND_AREA) + '</td>' +
                            '<td class="td_title">规划用地性质</td>' +
                            '<td>' + (data.ydxz == null ? '' : data.ydxz) + '</td>' +
                            '</tr>' +
                            '<tr id="jsgc2_data6" >' +
                            '<td class="td_title">建设规模</td>' +
                            '<td>' + (data.pro_SCALE == null ? '' : data.pro_SCALE) + '</td>' +
                            '<td class="td_title">地上建筑面积（㎡）</td>' +
                            '<td>' + (data.pro_UP_AREA == null ? '' : data.pro_UP_AREA) + '</td>' +
                            '</tr>' +
                            '<tr id="jsgc2_data7" >' +
                            '<td class="td_title">地下建筑面积（㎡）</td>' +
                            '<td>' + (data.pro_DOWN_AREA == null ? '' : data.pro_DOWN_AREA) + '</td>' +
                            '<td class="td_title">计容建筑面积（㎡）</td>' +
                            '<td>' + (data.capacity_BUILDAREA == null ? '' : data.capacity_BUILDAREA) + '</td>' +
                            '</tr></table></td>'
                    }else {
                        tmp+= '</table></td>'
                    }
                    $('#' + showid).append(tmp);
                } else if (YWSXBM.indexOf("挖掘城市道路许可") != -1) {
                    console.log(data.by12)
                    var data1 = JSON.parse(data.by12);
                    $('#' + showid).append('<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data2" >' +
                        '<td class="td_title" style="width: 15%;">证书编号</td>' +
                        '<td style="width: 35%;">' + (data1.CERT_NO == null ? '' : data1.CERT_NO) + '</td>' +
                        '<td class="td_title">批复机关</td>' +
                        '<td>' + (data1.APPROVAL_ORGAN == null ? '' : data1.APPROVAL_ORGAN) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data3" >' +
                        '<td class="td_title">批复日期</td>' +
                        '<td>' + (data1.APPROVAL_TIME == null ? '' : data1.APPROVAL_TIME) + '</td>' +
                        '<td class="td_title">有效期<br>（截止日期）</td>' +
                        '<td>' + (data1.APPROVAL_JZRQ == null ? '' : data1.APPROVAL_JZRQ) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data4">' +
                        '<td class="td_title">项目位置</td>' +
                        '<td>' + (data1.PRO_ADDRESS == null ? '' : data1.PRO_ADDRESS) + '</td>' +
                        '<td class="td_title">道路名称</td>' +
                        '<td>' + (data1.ROAD_NAME == null ? '' : data1.ROAD_NAME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data5">' +
                        '<td class="td_title">建设规模</td>' +
                        '<td  colspan=3 align="left" style="width: 80%;">' + (data1.INFO_NOTE == null ? '' : data1.INFO_NOTE) + '</td>' +
                        '</tr>'+
                        '</table></td>');
                }
                else if (YWSXBM.indexOf("建筑工程施工许可证") != -1) {
                    var data1 = JSON.parse(data.by1);
                    var data2 = data1.jsdw;
                    var data3 = '';
                    if (data2 != '') {
                        for (var i = 0; i < data2.length; i++) {
                            data3 += '<tr><td>' + data2[i].dwlx + '</td><td>' + data2[i].dwmc + '</td><td>' + data2[i].xmfzr + '</td></tr>'
                        }
                    }
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data1" >' +
                        '<td class="td_title">工程名称</td>' +
                        '<td  colspan=3 align="left" style="width: 80%;">' + (data1.gcmc == null ? '' : data1.gcmc) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data2">' +
                        '<td class="td_title">建设地址</td>' +
                        '<td colspan=3 align="left">' + (data1.jsdz == null ? '' : data1.jsdz) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data3" >' +
                        '<td class="td_title" style="width: 15%;">固定资产投资项目代码</td>' +
                        '<td style="width: 35%;">' + (data1.xmdm == null ? '' : data1.xmdm) + '</td>' +
                        '<td class="td_title" style="width: 15%;">施工许可证号</td>' +
                        '<td style="width: 35%;">' + (data1.sgxkz == null ? '' : data1.sgxkz) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data4" >' +
                        '<td class="td_title">报建编号</td>' +
                        '<td>' + (data1.bjgh == null ? '' : data1.bjgh) + '</td>' +
                        '<td class="td_title">合同工期(日历天)</td>' +
                        '<td>' + (data1.htgq == null ? '' : data1.htgq) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data5" >' +
                        '<td class="td_title">发证机关</td>' +
                        '<td>' + (data1.fzjg == null ? '' : data1.fzjg) + '</td>' +
                        '<td class="td_title">施工许可日期</td>' +
                        '<td>' + (data1.sgxkrq == null ? '' : data1.sgxkrq) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data6" >' +
                        '<td class="td_title">建设规模（建筑面积㎡）</td>' +
                        '<td>' + (data1.jsgm == null ? '' : data1.jsgm) + '</td>' +
                        '<td class="td_title">合同价格（万元）</td>' +
                        '<td>' + (data1.htjg == null ? '' : data1.htjg) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data7">' +
                        '<td class="td_title">备注</td>' +
                        '<td colspan=3 align="left">' + (data1.bz == null ? '' : data1.bz) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data8">' +
                        '<td class="td_title">施工许可范围</td>' +
                        '<td><a target="_blank" href="' + (data1.sgxkfw == '' ? 'javascript:;' : data1.sgxkfw) + '">点击查看</a></td>' +
                        '<td class="td_title">施工许可证电子证照</td>' +
                        '<td><a target="_blank" href="' + (data1.sgxkdzzz == '' ? 'javascript:;' : data1.sgxkdzzz) + '">点击查看</a></td>' +
                        '</tr>' +
                        '</table>' +
                        '<table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data8">' +
                        '<td class="td_title">单位类型</td>' +
                        '<td class="td_title">单位名称</td>' +
                        '<td class="td_title">项目联系人</td>' +
                        '</tr>' +
                        data3 +
                        '</table>' +
                        '</td>');
                }
                else if (YWSXBM.indexOf("建设工程竣工验收备案") != -1) {
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data1" >' +
                        '<td class="td_title">批文名称</td>' +
                        '<td  colspan=3 align="left" style="width: 80%;">' + (data.bumf_TITLE == null ? '' : data.bumf_TITLE) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data2" >' +
                        '<td class="td_title" style="width: 15%;">批文文号</td>' +
                        '<td style="width: 35%;">' + (data.bumf_SERIALNO == null ? '' : data.bumf_SERIALNO) + '</td>' +
                        '<td class="td_title" style="width: 15%;">证书编号</td>' +
                        '<td style="width: 35%;">' + (data.cert_NO == null ? '' : data.cert_NO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data3" >' +
                        '<td class="td_title">批复机关</td>' +
                        '<td>' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title">批复日期</td>' +
                        '<td>' + (data.APPROVAL_TIME == null ? '' : data.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data4">' +
                        '<td class="td_title">有效期<br>（截止日期）</td>' +
                        '<td>' + (data.approval_JZRQ == null ? '' : data.approval_JZRQ) + '</td>' +
                        '<td class="td_title"></td>' +
                        '<td></td>' +
                        '</tr>' +
                        '</table></td>');
                } else if (YWSXBM.indexOf("建设项目开工放样复验或备案") != -1) {
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data1" >' +
                        '<td class="td_title">项目名称</td>' +
                        '<td  colspan=3 align="left" style="width: 80%;">' + (data.pro_NAME == null ? '' : data.pro_NAME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data2" >' +
                        '<td class="td_title">建设单位名称</td>' +
                        '<td colspan=3 align="left">' + (data.pro_ENNAME == null ? '' : data.pro_ENNAME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data3" >' +
                        '<td class="td_title" style="width: 15%;">审批机关</td>' +
                        '<td style="width: 35%;">' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title" style="width: 15%;">开工复验日期</td>' +
                        '<td style="width: 35%;">' + (data.APPROVAL_TIME == null ? '' : data.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data4">' +
                        '<td class="td_title">开工附言结论单编号</td>' +
                        '<td>' + (data.kgfy_NO == null ? '' : data.kgfy_NO) + '</td>' +
                        '<td class="td_title">建设工程规划许可证号</td>' +
                        '<td>' + (data.jsgcgh_NO == null ? '' : data.jsgcgh_NO) + '</td>' +
                        '</tr>' +
                        '</table></td>');
                } else if (YWSXBM.indexOf("竣工规划资源验收") != -1) {
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data1" >' +
                        '<td class="td_title">项目名称</td>' +
                        '<td  colspan=3 align="left" style="width: 80%;">' + (data.pro_NAME == null ? '' : data.pro_NAME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data2" >' +
                        '<td class="td_title">建设单位名称</td>' +
                        '<td colspan=3 align="left">' + (data.pro_ENNAME == null ? '' : data.pro_ENNAME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data3">' +
                        '<td class="td_title" style="width: 15%;">审批机关</td>' +
                        '<td style="width: 35%;">' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title" style="width: 15%;">批文文号</td>' +
                        '<td style="width: 35%;">' + (data.bumf_SERIALNO == null ? '' : data.bumf_SERIALNO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data4">' +
                        '<td class="td_title">竣工验收合格证编号</td>' +
                        '<td>' + (data.jgyshz_NO == null ? '' : data.jgyshz_NO) + '</td>' +
                        '<td class="td_title">建设工程规划许可证号</td>' +
                        '<td>' + (data.jsgcgh_NO == null ? '' : data.jsgcgh_NO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data5">' +
                        '<td class="td_title">验收建筑面积</td>' +
                        '<td>' + (data.yszz_AREA == null ? '' : data.yszz_AREA) + '</td>' +
                        '<td class="td_title">验收用地面积</td>' +
                        '<td>' + (data.ysyd_AREA == null ? '' : data.ysyd_AREA) + '</td>' +
                        '</tr>' +
                        '</table></td>');
                }
                else if (YWSXBM.indexOf("公路工程施工许可") != -1 || YWSXBM.indexOf("市政交通工程施工许可") != -1 || YWSXBM.indexOf("港口工程施工许可") != -1) {
                    var data1 = JSON.parse(data.by1);
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;">' +
                        '<table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data1">' +
                        '<td class="td_title" >项目名称</td>' +
                        '<td colspan=3 align="left" style="width: 80%;">' + (data1.GMMC == null ? '' : data1.GMMC) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data2" >' +
                        '<td class="td_title" style="width: 15%;">发证机关</td>' +
                        '<td style="width: 35%;">' + (data.approval_ORGAN == null ? '' : data.approval_ORGAN) + '</td>' +
                        '<td class="td_title" style="width: 15%;">施工许可证号</td>' +
                        '<td style="width: 35%;">' + (data.cert_NO == null ? '' : data.cert_NO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data3">' +
                        '<td class="td_title">工程位置</td>' +
                        '<td colspan=3 align="left" >' + (data1.WORKADDRESS == null ? '' : data1.WORKADDRESS) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data4">' +
                        '<td class="td_title">工程建设内容</td>' +
                        '<td colspan=3 align="left">' + (data1.CSYW == null ? '' : data1.CSYW) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data5">' +
                        '<td class="td_title">投资概算</td>' +
                        '<td>' + (data1.INVESTMENT == null ? '' : data1.INVESTMENT) + '</td>' +
                        '<td class="td_title">合同价格</td>' +
                        '<td>' + (data1.CONTRACTPRICE == null ? '' : data1.CONTRACTPRICE) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data6">' +
                        '<td class="td_title">施工单位</td>' +
                        '<td>' + (data1.SJDW == null ? '' : data1.SJDW) + '</td>' +
                        '<td class="td_title">监理单位</td>' +
                        '<td>' + (data1.JLDW == null ? '' : data1.JLDW) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data7">' +
                        '<td class="td_title">合同工期</td>' +
                        '<td>' + (data1.CONTRACT_PERIOD == null ? '' : data1.CONTRACT_PERIOD) + '</td>' +
                        '<td class="td_title">发证日期</td>' +
                        '<td>' + (data.APPROVAL_TIME == null ? '' : data.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data8">' +
                        '<td class="td_title">报建编号</td>' +
                        '<td>' + (data1.BJBH == null ? '' : data1.BJBH) + '</td>' +
                        '<td class="td_title">法律规定</td>' +
                        '<td>' + (data1.FLGD == null ? '' : data1.FLGD) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data8">' +
                        '<td class="td_title">备注</td>' +
                        '<td colspan=3 align="left" >' + (data1.BZ == null ? '' : data1.BZ) + '</td>' +
                        '</tr>' +
                        '</table></td>');
                } else if (YWSXBM.indexOf("建设用地批准书") != -1) {
                    var data1 = JSON.parse(data.by1);
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data1" >' +
                        '<td class="td_title" >项目名称</td>' +
                        '<td colspan=3 align="left" style="width: 80%;">' + (data1.PRO_NAME == null ? '' : data1.PRO_NAME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data2" >' +
                        '<td class="td_title" >用地单位名称</td>' +
                        '<td colspan=3 align="left" style="width: 80%;">' + (data1.YDDWM == null ? '' : data1.YDDWM) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data2" >' +
                        '<td class="td_title" style="width: 15%;">批复机关</td>' +
                        '<td style="width: 35%;">' + (data1.APPROVAL_ORGAN == null ? '' : data1.APPROVAL_ORGAN) + '</td>' +
                        '<td class="td_title" style="width: 15%;">批准书编号</td>' +
                        '<td style="width: 35%;">' + (data1.CERT_NO == null ? '' : data1.CERT_NO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data3" >' +
                        '<td class="td_title">批复日期</td>' +
                        '<td>' + (data1.APPROVAL_TIME == null ? '' : data1.APPROVAL_TIME) + '</td>' +
                        '<td class="td_title">截止日期</td>' +
                        '<td>' + (data1.APPROVAL_JZRQ == null ? '' : data1.APPROVAL_JZRQ) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data4" >' +
                        '<td class="td_title">批准用地面积</td>' +
                        '<td>' + (data1.PZYDMJ == null ? '' : data1.PZYDMJ) + '</td>' +
                        '<td class="td_title">土地使用权限</td>' +
                        '<td>' + (data1.TDSYQXZ == null ? '' : data1.TDSYQXZ) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data5">' +
                        '<td class="td_title">土地取得方式</td>' +
                        '<td>' + (data1.TDQDFS == null ? '' : data1.TDQDFS) + '</td>' +
                        '<td class="td_title">土地用途</td>' +
                        '<td>' + (data1.TDYT == null ? '' : data1.TDYT) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data6">' +
                        '<td class="td_title">土地坐落</td>' +
                        '<td>' + (data1.TDZL == null ? '' : data1.TDZL) + '</td>' +
                        '<td class="td_title">测绘成果号</td>' +
                        '<td>' + (data1.CHCGH == null ? '' : data1.CHCGH) + '</td>' +
                        '</tr>' +
                        '</table></td>');
                } else if (YWSXBM.indexOf("划拨决定书") != -1) {
                    var data1 = JSON.parse(data.by1);
                    $('#' + showid).append(
                        '<td colspan="8" class="td_2" style="padding:0px;"><table width="100" border="0" cellspacing="0" cellpadding="0" class="table table-bordered work-table-0 table-hover">' +
                        '<tr id="jsgc2_data1" >' +
                        '<td class="td_title" >项目名称</td>' +
                        '<td colspan=3 align="left" style="width: 80%;">' + (data1.PRO_NAME == null ? '' : data1.PRO_NAME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data2" >' +
                        '<td class="td_title" style="width: 15%;">批文文号</td>' +
                        '<td style="width: 35%;">' + (data1.BUMF_SERIALNO == null ? '' : data1.BUMF_SERIALNO) + '</td>' +
                        '<td class="td_title" style="width: 15%;">决定书编号</td>' +
                        '<td style="width: 35%;">' + (data1.CERT_NO == null ? '' : data1.CERT_NO) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data3" >' +
                        '<td class="td_title">批复机关</td>' +
                        '<td>' + (data1.APPROVAL_ORGAN == null ? '' : data1.APPROVAL_ORGAN) + '</td>' +
                        '<td class="td_title">批复日期</td>' +
                        '<td>' + (data1.APPROVAL_TIME == null ? '' : data1.APPROVAL_TIME) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data4" >' +
                        '<td class="td_title">使用权人</td>' +
                        '<td>' + (data1.SYQR == null ? '' : data1.SYQR) + '</td>' +
                        '<td class="td_title">宗地坐落</td>' +
                        '<td>' + (data1.ZDZL == null ? '' : data1.ZDZL) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data5">' +
                        '<td class="td_title">宗地总面积</td>' +
                        '<td>' + (data1.ZDZMJ == null ? '' : data1.ZDZMJ) + '</td>' +
                        '<td class="td_title">划拨宗地面积</td>' +
                        '<td>' + (data1.HBZJMJ == null ? '' : data1.HBZJMJ) + '</td>' +
                        '</tr>' +
                        '<tr id="jsgc2_data6">' +
                        '<td class="td_title">土地用途</td>' +
                        '<td>' + (data1.TDYT == null ? '' : data1.TDYT) + '</td>' +
                        '<td class="td_title">测绘成果号</td>' +
                        '<td>' + (data1.CHCGH == null ? '' : data1.CHCGH) + '</td>' +
                        '</tr>' +
                        '</table></td>');
                }
            }
        }).error(function () {
            alert("数据异常");
        });
    }
}


function getSj(img, show, num, ID) {
    var imgid = img + num;
    var showid = show + num;
    var x = $("#" + imgid)[0].src;
    if (x.indexOf("down2") == -1) {
        $("#" + imgid).attr("src", "img/down2.png");
        $('#' + showid).html('');
    }
    else {
        $("#" + imgid).attr("src", "img/up2.png");
        $.ajax({
            type: "GET",
            url: pageContext+"/getstatusLog/"+ID,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: false,
            data: {},
            dataType: "json",
            success: function (data) {//请求成功
                var tmp = '<td colspan="8" ><div class="time-line">' +
                    '<div class="time-box"><ul>';
                // 正式提交，收件（若有），受理，评估（若有），批复
                var name;
                var length=data.length;
                    if(data.length==1){
                        tmp += '<li class="active"><h5>'+ dateFormat(data[0].CREATEDATE) + '&nbsp;&nbsp;' + data[0].STATUS_NAME + '</h5></li>' +
                            '<li class="active1"><h5>收件</h5></li><li class="active1"><h5>项目受理</h5></li>'+
                            '<li class="active1"><h5>评估</h5></li><li class="active1"><h5>项目批复</h5></li>'
                    }
                    else if(data.length==2) {
                        tmp += '<li class="active1"><h5>'+ dateFormat(data[0].CREATEDATE) + '&nbsp;&nbsp;' + data[0].STATUS_NAME + '</h5></li>' +
                            '<li class="active1"><h5>收件</h5></li><li class="active">'+ dateFormat(data[1].CREATEDATE) + '&nbsp;&nbsp;' + data[1].STATUS_NAME + '</h5></li>'+
                            '<li class="active1"><h5>评估</h5></li><li class="active1"><h5>项目批复</h5></li>'
                    }
                    else if(data.length==3){
                        tmp += '<li class="active1"><h5>'+ dateFormat(data[0].CREATEDATE) + '&nbsp;&nbsp;' + data[0].STATUS_NAME + '</h5></li>' +
                            '<li class="active1"><h5>收件</h5></li><li class="active1">'+ dateFormat(data[1].CREATEDATE) + '&nbsp;&nbsp;' + data[1].STATUS_NAME + '</h5></li>'+
                            '<li class="active1"><h5>评估</h5></li><li class="active">'+ dateFormat(data[2].CREATEDATE) + '&nbsp;&nbsp;' + data[2].STATUS_NAME + '</h5></li>'
                    }

                tmp += '</div></div></td>';
                $('#' + showid).append(tmp)
            },
            complete: function (XMLHttpRequest, textStatus) {//请求完成

            },
            error: function (data) {//错误处理
                layer.alert('请求失败，稍后再试', {icon: 5});
            }
        });

    }

    $(function () {
        var timeLength = $('.time-box li').length,
            timeliWidth = $('.time-box li').outerWidth();

        var index = 0;

        $('.time-box ul').width(timeLength * timeliWidth);

        function slideOne(i) {
            var scrollVal = i * timeliWidth; //每次切换的数量
            $('.time-box').stop().animate({
                scrollLeft: scrollVal
            }, 300);
        }

        $('.right-btn').click(function () {
            index = index >= (timeLength - 4) ? 0 : index + 1;
            slideOne(index);
        })

        $('.left-btn').click(function () {
            index = index <= 0 ? (timeLength - 4) : index - 1;
            slideOne(index);
        })

    })

    function dateFormat(date) {
        var d = new Date(date);
        var times=d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        return times
    }
}

