<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <span>{{dicMsg}}</span>
        <button @click.stop='resource()'>resource</button>
        <button @click.stop='ajax()'>ajax</button>
        <button @click.stop='addDic()'>addDic</button>
        <button @click.stop='getDic1()'>getDic1</button>
        <button @click.stop='getDic2()'>getDic2</button>

        <span v-example="pageData"></span>


<ul>
      <li v-for="product in products">
       {{ product.name }} - {{ product.price| discount(25)}}
      </li>
</ul>

<div v-test></div>

        <br>
        <page-plugin :pageData="pageData" :goto="goto"></page-plugin>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome',
            dicMsg: {},
            pageData: {
                'pageNo': 1,
                'totalPages': 10,
                'totalRecords': 100,
                'pageSize': 10
            },
            products:[
{'name':"abc",
'price':1},{'name':'bb',
'price':3}

            ]

        }
    },
     created () {
　　      this.msg = 'Bye Spec'
　　    },
    methods: {


goto:function(data){
console.log(data);
},

        addDic: function() {
            this.msg = this.msg + " " + this.msg;
            var n = this.msg.match(/Welcome/g) || [];
            this.$store.commit("addDic", {
                'code': n.length,
                'lable': this.msg
            });
        },
        getDic1: function() {
            this.dicMsg = this.$store.state.dic;
        },
        getDic2: function() {
            this.dicMsg = this.$store.getters.getDic('key');
        },

        resource: function() {
            this.$http.post(
                'https://cnodejs.org/api/v1/topics', {
                    emulateJSON: true,
                    emulateHTTP: true,
                    data: {
                        'page': 1,
                        'tab': 'job',
                        'limit': 2,
                        'mdrender': true
                    }
                }).then((res) => {
                // this.items=res.body.data;
                // this.$set(this.$data, 'items', res.body.data);
                console.log(res.body.data);
            }, (res) => {
                console.log(res);
            }).catch((res) => {
                console.log(res)
            });
        },
        ajax: function() {
            var isEmpty = function(object) {
                for (var name in object) {
                    return false;
                }
                return true;
            }
            var param = {
                'page': 1,
                'tab': 'job',
                'limit': 2,
                'mdrender': true
            };
            var data = {};
            var trimStr = function(key, value) {
                if (typeof(value) === 'string') {
                    return $.trim(value);
                }
                return value;
            }
            if (Object.keys(param).length > 0) {
                var obj = Object.keys(param).length === 1 ? param[Object.keys(param)[0]] : param;
                data = {
                    // data: typeof(obj) === 'string' ? trimStr(obj) : JSON.stringify(obj, trimStr)
                    data: typeof(obj) === 'string' ? obj : JSON.stringify(obj)
                }
            }
            var converEmptyProperty = function(object) {
                for (var i in object) {
                    var value = object[i];
                    // Object.prototype.toString.call(object) == '[object Null]'   '[object Undefined]')
                    if (typeof value === 'object') {
                        if (Array.isArray(value)) {
                            if (value.length == 0) {
                                //   delete object[i];
                                console.log(i);
                                object[i] = [];
                                continue;
                            }
                        } else if (Object.prototype.toString.call(value) == '[object Null]') {
                            object[i] = '';
                        } else if (Object.prototype.toString.call(value) == '[object Undefined]') {
                            object[i] = '';
                        } else if (isEmpty(value)) {
                            object[i] = {};
                        }
                        converEmptyProperty(value);

                    } else {
                        if (value === '' || value === null || value === undefined) {
                            object[i] = '';
                        } else {
                            // console.log('check ', i, value);
                        }
                    }
                }
            }

            var urlEncode = function(param, key, encode) {
                if (param == null) return '';
                var paramStr = '';
                var t = typeof(param);
                if (t == 'string' || t == 'number' || t == 'boolean') {
                    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
                } else {
                    for (var i in param) {
                        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                        paramStr += urlEncode(param[i], k, encode);
                    }
                }
                return paramStr;
            };

            $.ajax($.extend({}, '', {
                url: 'https://cnodejs.org/api/v1/topics',
                type: 'GET',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                beforeSend: function(jqXHR, settings) {
                    //请求前数据处理
                    if (settings.type == 'GET') {
                        settings.url = settings.url.replace(/\:/g, '=').replace(/,\"/g, '&').replace(/[{}"]/g, "").replace("https=//", "https://");
                    } else {
                        if (settings.data) {
                            settings.data = JSON.stringify(JSON.parse(settings.data), trimStr);
                        }
                    }
                    return true;
                },
                dataFilter: function(data, type) {
                    // 返回的数据处理
                    var preData = JSON.parse(data)
                    converEmptyProperty(preData);
                    return JSON.stringify(preData)
                }
            })).error(function(jx) {
                console.log(jx);
            });
        }
    }
}
</script>