<template>
    <div class="am-u-lg-12 am-cf">
        <div class="am-fr">
            <ul  class="am-pagination tpl-pagination">
                <li style="float:left;list-style:none;padding:10;" :class="[(pages[0]==1)?'am-disabled':'']"><a href="javascript:;" v-on:click="prevClick()">«</a></li>
                <li style="float:left;list-style:none;padding:10;" v-for="index in pages" :class="[(pageData.pageNo == index)?'am-active':'']">
                    <a href="javascript:;" v-on:click="btnClick(index)">{{ index }}</a>
                </li>
                <li style="float:left;list-style:none;padding:10;" :class="[(pages[pages.length-1]==pageData.totalPages)?'am-disabled':'']">
                    <a href="javascript:;" v-on:click="nextClick()">»</a></li>
                <li style="float:left;list-style:none;padding:10;"><a>共<i>{{pageData.totalPages}}({{pageData.pageNo}})</i>页/共<i>{{pageData.totalRecords}}</i>条</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
export default {
    name: 'pagePlugin',
    props: {
        pageData: Object,
        goto: Function
    },
    data() {
        return {
            pages: []
        }
    },
    methods: {
        getData: function(event) {
            this.pages = [];
            let startNo = 1,
                endNo = 1;
            if (this.pageData.pageNo < 4) {
                endNo = this.pageData.totalPages;
            } else if (this.pageData.pageNo + 4 > this.pageData.totalPages) {
                endNo = this.pageData.totalPages;
                if (this.pageData.totalPages > 6) {
                    startNo = this.pageData.totalPages - 5
                }
            } else {
                startNo = this.pageData.pageNo - 5, endNo = this.pageData.pageNo + 4;
            }
            for (let i = startNo; i <= endNo; i++) {
                this.pages.push(i);
            }
        },
        prevClick: function(event) {
            let newPages = [];
            let arrInxSize = this.pages.length - 1;
            for (let a = 0; a < 11; a++) {
                if ((this.pages[0] - a) > 0) {
                    newPages.push(this.pages[0] - a);
                } else {
                    for (let aa = 1; aa <= this.pages.length - a; aa++) {
                        newPages.push(this.pages[0] + aa);
                    }
                    break;
                }
            }
            if (newPages) {
                this.pages = newPages.sort(function(a, b) {
                    return a - b;
                });
            }
        },
        btnClick: function(index) {
            this.goto(index);
        },
        nextClick: function(event) {
            let newPages = [];
            let arrInxSize = this.pages.length - 1;
            for (let a = 1; a < 11; a++) {
                if ((this.pages[arrInxSize] + a) <= this.pageData.totalPages) {
                    newPages.push(this.pages[arrInxSize] + a);
                } else {

                    if (newPages != []) {
                        for (let aa = arrInxSize; aa >= a - 1; aa--) {
                            newPages.push(this.pages[aa]);
                        }
                        break;
                    }
                }
            }
            if (newPages) {
                this.pages = newPages.sort(function(a, b) {
                    return a - b;
                });
            }
        }
    },
    watch: {
        "pageData.pageNo": 'getData',
        "pageData.pageSize": 'getData'
    },
    mounted: function() {
            this.getData();
        }
        /*,
            created() {
                bus.$on('toggleLoading', (show) => {
                    this.toShow = show;
                });
            }*/
}
</script>