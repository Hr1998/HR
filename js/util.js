var UTIL =(function (win) {
    var util = {
        is_dev: true,
        regymdzz: 'YYYY|MM|DD|hh|mm|ss|zz',
        regymd: 'YYYY|MM|DD|hh|mm|ss|zz'.replace('|zz', '')
    };
    util.ajax = function (params) {
        //url, params, type, callback, needconfig, needloading, needCheckLogin
        var url = params.url;
        var type = params.type || 'POST';
        var dataType = params.dataType || 'json';
        var isasync = !((typeof  params.async === 'boolean') && params.async === true);
        var needloading = ((typeof  params.needloading === 'boolean') && params.needloading === true);
        var successCallback = params.success || null;
        var errorCallback = params.error || null;
        
        if ( needloading ) {
            UTIL.loadingModal.open();
        }
        
        $.ajax({
            contentType: 'application/json',
            type: type,
            url: url,
            async: isasync,
            data: type.toLowerCase() == 'post' ? JSON.stringify(params.data) : params.data,
            dataType: dataType,
            success: function (data) {
                
                UTIL.loadingModal.close();
                
                if ( data === '' || data === null ) {
                    
                    if ( successCallback && typeof successCallback == 'function' ) {
                        successCallback(false);
                    }
                    
                } else {
                    if ( successCallback && typeof successCallback == 'function' ) {
                        successCallback(data);
                    }
                    
                }
            },
            error: function (data) {
                
                UTIL.loadingModal.close();
                if ( errorCallback && typeof errorCallback == 'function' ) {
                    errorCallback(data);
                }
            }
        });
        
    };
    /**
     * 获取cookie
     * @param name
     * @returns {any}
     */
    util.getCookie = function (name) {
        var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        if ( arr != null ) return unescape(arr[2]);
        return null;
        
    };
    
    /**
     * 设置cookie
     * @param key
     * @param value
     */
    util.setCookie = function (key, value) {
        document.cookie = key + '=' + value;
    };

    util.loadingModal = {
        autohide: true,
        params: {},
        $modalDom: {},
        timer: {},
        /**
         * 打开
         * @param autohide 是否自动隐藏
         * @param params
         */
        open: function (autohide, params) {
            
            var $self = this;
            clearTimeout(this.timer);
            
            var params = {
                needloading: params ? (!(params && (typeof  params.needloading === 'boolean') && params.needloading === false)) : false,
                tip: (params && params.tip) || '加载中...'
            };
            
            this.autohide = params.needloading;
            
            this.picker = (params && params.picker && typeof params.picker === 'string') ? params.picker : '#ldsModal';
            this.$modalDom = $(top.document).find(this.picker);
            
            if ( this.$modalDom.length <= 0 ) {
                var $loadingModal = $('<div id="ldsModal" class="ldsModal">' +
                    '<div class="lds-con">' +
                    '<img class="lds" src="/pages/img/loading-default.gif">' +
                    '<div class="lds-txt" style="display: none;">' + (params && params.tip ? params.tip : '加载中...') + '</div>' +
                    '</div>' +
                    '</div>');
                $loadingModal.appendTo($('body'));
                this.$modalDom = $loadingModal;
            }
            this.$modalDom.show().addClass('open');
            
            //加载完成先关闭loading
            setTimeout(function () {
                if ( $self.autohide ) {
                    $self.close();
                }
            }, 500);
        },
        /**
         * 关闭
         */
        close: function () {
            this.$modalDom = this.picker ? $(this.picker) : $(top.document).find('#ldsModal');
            
            var $self = this;
            if ( !$self.$modalDom.removeClass ) {
                return;
            }
            $self.$modalDom.removeClass('open');
            this.timer = setTimeout(function () {
                $self.$modalDom.hide();
                clearTimeout($self.timer);
            }, 200);
        }
    };

    return util;
})();