<template>
    <div class="footer-wrap">
        <div class="footer">
            <div class="left">
                <div class="title">关于我们</div>
                <p>hi！大家好啊，我们是南阳理工学院的毕业生，软件工程218宿舍。这是我的毕业设计，很荣幸你能使用，有什么不对的地方请多多指教</p>
            </div>
            <div class="right">
                <div class="title">合作链接</div>
                <ul>
                    <li>qq:165xxxx783</li>
                    <li>phone:13460xxxx46</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
.footer-wrap {
    background-color: #333333;
    padding-bottom: 50px;
    .footer {
        width: 1200px;
        margin: 0 auto;
        color: #999;
        display: flex;
        justify-content: space-between;
        .left {
            width: 500px;
            padding: 20px;
        }
        .right {
            width: 500px;
            padding: 20px;
        }
    }
}
</style>