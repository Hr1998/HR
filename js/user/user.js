// $(function (){
//     var oTable = new TableInit();
//     oTable.init();
// });

// var TableInit = function (){
//     var oTableInit = new Object();

//     oTableInit.init = function (){
//         $('table').bootstrapTable({
//             url:'',   //请求后台url
//             method:'post',   //请求方式
//             toolbar: '#toolbar',    //启用工具栏
//             striped: true,    //是否显示行间隔色
//             pagination: true,   //是否分页
//             queryParams:  {   //传递参数
//                 pageNum:"1",
//                 pagesize:"10"
//             },
//             pageNumber: 1,    //初始化加载第一页，默认第一页
//             pageSize: 10,     //每页的记录行数（*）
//             search: true,
//             contentType: "application/x-www-form-urlencoded",
//             columns: [{
//                 checkbox: true
//             },{
//                     field:'',
//                     title:''
//                 }
//             ]
//         });
//     }
// }