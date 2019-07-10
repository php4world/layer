# 指南

## 安装

#### yarn

```shell
yarn add @php4world/layer
```

#### npm

```shell
npm i @php4world/layer
```

#### 使用插件

```	js
// main.js
import Layer from '@php4world/layer';
Vue.use(Layer);

// demo.vue
// ...
<script>
    export default {
		mounted() {
            this.$layer.open({
                content: 'Hello world'
            });
        }
	};
</script>
// ...
```

## 参数

### type - 层类型

类型：`Number`，默认：`0`

Layer提供4种层类型。可传入的值为：0（信息框，默认）1（页面层）2（iframe层）3（加载层）。

若采用 `this.$layer.open()` 方法调用，则 `type` 为必填项（信息框除外）

### title - 标题

类型：`String/Array/Boolean`，默认：`'信息'`

`title`支持三种类型的值，若你传入的是普通的字符串，如`title: '我是标题'`，那么只会改变标题文本；

若你还需要自定义标题区域样式，那么你可以`title: ['我是标题', 'font-size:18px;']`，数组第二项可以写任意css样式；

如果你不想显示标题栏，你可以`title: false`

### content - 内容

类型：`String/DOM/Array`，默认：`''`

content可传入的值是灵活多变的，不仅可以传入普通的html内容，还可以指定DOM，更可以随着type的不同而不同。譬如：

```js{3,9,15}
// 0 信息框
this.$layer.open({
    content: '我是内容'
});

// 1 页面层
this.$layer.open({
	type: 1,
    content: this.$refs.refName
});

// 2 iframe层
this.$layer.open({
	type: 2,
	content: 'https://www.kancloud.cn' // 如果要屏蔽滚动条 ['https://www.kancloud.cn', 'no']
});
```

### area - 宽高

类型：`String/Array`，默认：`'auto'`

在默认状态下，`layer`是宽高都自适应的.

但当你只想定义宽度时，你可以`area: '500px'`，高度仍然是自适应的。

当你宽高都要定义时，你可以`area: ['500px', '300px']`

### offset - 坐标

类型：`String/Array`，默认：垂直水平居中

`offset`默认情况下不用设置。

但如果你不想垂直水平居中，你还可以进行以下赋值：

| 参数值                    | 说明                        |
| ------------------------- | --------------------------- |
| offset: 'auto'            | 默认坐标，即垂直水平居中    |
| offset:'100px'            | 只定义top坐标，水平保持居中 |
| offset: ['100px', '50px'] | 同时定义top、left坐标       |
| offset: 't'               | 快捷设置顶部坐标            |
| offset: 'r'               | 快捷设置右边缘坐标          |
| offset: 'b'               | 快捷设置底部坐标            |
| offset: 'l'               | 快捷设置左边缘坐标          |
| offset: 'lt'              | 快捷设置左上角              |
| offset: 'lb'              | 快捷设置左下角              |
| offset: 'rt'              | 快捷设置右上角              |
| offset: 'rb'              | 快捷设置右下角              |

### icon - 图标，信息框和加载层的私有参数

类型：`Number`，默认：-1（信息框）/ 0（加载层）

信息框默认不显示图标。

当你想显示图标时，默认皮肤可以传入`0-6`

如果是加载层，可以传入`0-2`。

```js
// eg1
this.$layer.alert('酷毙了', {icon: 1});
// eg2
this.$layer.msg('不开心。。', {icon: 5});
// eg3
this.$layer.load(1); //风格1的加载
```

### btn - 按钮

类型：`String/Array`，默认：`'确认'`

信息框模式时，`btn`默认是一个确认按钮，其它层类型则默认不显示，加载层无效。

当您只想自定义一个按钮时，你可以`btn: '我知道了'`，

当你要定义两个按钮时，你可以`btn: ['yes', 'no']`。

当然，你也可以定义更多按钮，比如：`btn: ['按钮1', '按钮2', '按钮3', …]`，

按钮1的回调是yes，而从按钮2开始，则回调为btn2，以此类推。

```js
this.$layer.open({
    content: '我是内容',
    btn: ['按钮1', '按钮二', '按钮三'],
    yes() {
        // 按钮1回调
    },
    btn2() {
        // 按钮2回调
    },
    btn3() {
        // 按钮3回调
    },
    cancel() {
        // 右上角关闭回调
    }
});
```

### btnAlign - 按钮排列

类型：`String`，默认：`'r'`

你可以快捷定义按钮的排列位置，`btnAlign`的默认值为`'r'`，即右对齐。该参数可支持的赋值如下：

| 参数值        | 说明                         |
| ------------- | ---------------------------- |
| btnAlign: 'r' | 按钮右对齐。默认值，不用设置 |
| btnAlign: 'l' | 按钮左对齐                   |
| btnAlign: 'c' | 按钮居中对齐                 |

### closeBtn - 关闭按钮

类型：`String/Boolean`，默认：`1`

layer提供了两种风格的关闭按钮，可通过配置`1`和`2`来展示，如果不显示，则`closeBtn: 0`

### shade - 遮罩

类型：`String/Array/Boolean`，默认：`0.3`

即弹层外区域。默认是`0.3`透明度的黑色背景（'#000'）。

如果你想定义别的颜色，可以`shade: [0.8, '#393D49']`；

如果你不想显示遮罩，可以`shade: false`

### shadeClose - 是否点击遮罩关闭

类型：`Boolean`，默认：`false`

如果你的shade是存在的，那么你可以设定`shadeClose`来控制点击弹层外区域关闭。

### time - 自动关闭所需毫秒
类型：`Number`，默认：`0`

默认不会自动关闭。

当你想自动关闭时，可以`time: 5000`，即代表5秒后自动关闭，注意单位是毫秒（1秒=1000毫秒）

### anim - 弹出动画

类型：`Number`，默认：`0`

我们的出场动画全部采用CSS3。这意味着除了ie6-9，其它所有浏览器都是支持的。

目前`anim`可支持的动画类型有`0-6` 如果不想显示动画，设置 `anim: -1` 即可。

| 参数值  | 说明             |
| ------- | ---------------- |
| anim: 0 | 平滑放大。默认   |
| anim: 1 | 从上掉落         |
| anim: 2 | 从最底部往上滑入 |
| anim: 3 | 从左滑入         |
| anim: 4 | 从左翻滚         |
| anim: 5 | 渐显             |
| anim: 6 | 抖动             |

outAnim- 关闭动画

类型：`Boolean`，默认：`true`

默认情况下，关闭层时会有一个过度动画。如果你不想开启，设置 `outAnim: false` 即可