<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
            <Affix>
                <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                    <div class="layout-logo-left"></div>
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-navigate" :size="iconSize"></Icon>
                            <span class="layout-text">导航一</span>
                        </template>
                        <MenuItem name="1-1">选项 1</MenuItem>
                        <MenuItem name="1-2">选项 2</MenuItem>
                        <MenuItem name="1-3">选项 3</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-keypad" :size="iconSize"></Icon>
                            <span class="layout-text">导航二</span>
                        </template>
                        <MenuItem name="2-1">选项 1</MenuItem>
                        <MenuItem name="2-2">选项 2</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">导航三</span>
                        </template>
                        <MenuItem name="3-1">选项 1</MenuItem>
                        <MenuItem name="3-2">选项 2</MenuItem>
                    </Submenu>
                </Menu>
            </Affix>
            </Col>
            <Col :span="spanRight">
            <Affix>
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                    <div class="layout-ceiling-main">
                        <a href="#">注册登录</a> |
                        <a href="#">帮助中心</a> |
                        <a href="#">安全中心</a> |
                        <a href="#">服务大厅</a>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">首页</BreadcrumbItem>
                        <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                        <BreadcrumbItem>某应用</BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </Affix>
            <div class="layout-content">
                <div class="layout-content-main">内容区域

<i-tabs type="card" closable @on-tab-remove="handleTabRemove">
        <i-tab-pane label="macOS" icon="social-apple">标签一的内容</i-tab-pane>
        <i-tab-pane label="Windows" icon="social-windows">标签二的内容</i-tab-pane>
        <i-tab-pane label="Linux" icon="social-tux">标签三的内容</i-tab-pane>
    </i-tabs>


                </div>





                <BackTop></BackTop>
            </div>
            <div class="layout-copy">
                2011-2016 &copy; TalkingData
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            spanLeft: 5,
            spanRight: 19
        }
    },
    computed: {
        iconSize() {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    methods: {
        toggleClick() {
            if (this.spanLeft === 5) {
                this.spanLeft = 2;
                this.spanRight = 22;
            } else {
                this.spanLeft = 5;
                this.spanRight = 19;
            }
        },
         handleTabRemove (name) {
                this['tab' + name] = false;
            }
    }
}
</script>
<style scoped>
.layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-content {
    /* max-height: 600px;*/
    min-height: 200px;
    margin: 15px;
    overflow-x: auto;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 10px;
}

.layout-menu-left {
    background: #464c5b;
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-hide-text .layout-text {
    display: none;
}

.ivu-col {
    transition: width .2s ease-in-out;
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-ceiling {
    background: #464c5b;
    padding: 10px 0;
    overflow: hidden;
}

.layout-ceiling-main {
    float: right;
    margin: 15px;
}
</style>