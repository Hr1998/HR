$(function () {
    $('form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '学号验证失败',
                validators: {
                    notEmpty: {
                        message: '学号不能为空',
                    }/* ,
                    stringLength: {
                        min: 8,
                        max: 8,
                        message: '学号为8位数字'
                    },
                    regexp: {
                        regexp: /^[0-9_]+$/,
                        message: '请输入正确学号'
                        } */
                    
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    }/* ,
                    stringLength: {
                        min: 2,
                        max: 18,
                        message: '密码长度应在2~18之间'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '密码只能为大小写字母以及数字'
                    } */
                }
            }
        }
    });
});
//输入框中有值时动画不会缩回
(function () {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
        (function () {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }

    [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
        // in case the input is already filled..
        if (inputEl.value.trim() !== '') {
            classie.add(inputEl.parentNode, 'input--filled');
        }

        // events:
        inputEl.addEventListener('focus', onInputFocus);
        inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
        classie.add(ev.target.parentNode, 'input--filled');
    }

    function onInputBlur(ev) {
        if (ev.target.value.trim() === '') {
            classie.remove(ev.target.parentNode, 'input--filled');
        }
    }
})();
//打开模态框
function resetPassword() {
    $("#myModal").modal('show');
    
}
function validateEmail() {
    $("#myModal").modal('hide');
    $("#mySecondModal").modal('show');
}
//点击修改返回修改邮箱
function backToSetEmail(){
    $("#myModal").modal('show');
    $("#mySecondModal").modal('hide');
}
//开始登录
function login(){
    UTIL.ajax({
        url:'http://47.102.210.73:8080/waken/dorm/user/login',
        data:{
            resourceType: 1,
            userName: $("#login-name").val(),
            password: $("#login-pass").val()

        },
        success:function (result){
            if(result.code == 0){
                //获取资源成功
                //开始格式化资源菜单
                console.log(result);
                // var formatedMenuData = formatedMenu(result.data);
                if(!result.data || result.data.length <=0){
                    swal({
                        title: "您没有权限",
                        text: "管理员还未配置权限",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "好的",
                      },
                      function(){
                        
                      });
                }
                // swal("Good job!", "You clicked the button!", "success")
                UTIL.setCookie('userName', result.data.userName);
                UTIL.setCookie('userType', result.data.userType);
                UTIL.setCookie('userId',result.data.userId);
                UTIL.setCookie('status',result.data.status);
                console.log(result.data.userName);
                top.window.location.href = 'file:///D:/vs2017workspace/dorm2.0/dormIndex.html'
                    
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log('error' + '-' + textStatus);
        }
        
    })
}