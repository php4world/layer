# 指南

## 安装

#### yarn

```js
yarn add @php4world/layer
```

#### npm

```js
npm i @php4world/layer
```

#### 使用插件

```	js
// main.js
import Layer from '@php4world/layer';
Vue.use(Layer);
// 设置全局默认配置
// Vue.use(Layer, {...});

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
	content: 'https://www.kancloud.cn'
	// 如果要屏蔽滚动条 ['https://www.kancloud.cn', 'no']
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

### outAnim- 关闭动画

类型：`Boolean`，默认：`true`

默认情况下，关闭层时会有一个过度动画。如果你不想开启，设置 `outAnim: false` 即可

### maxmin - 最大最小化。

类型：`Boolean`，默认：`false`

该参数值对`type:1`和`type:2`有效。默认不显示最大小化按钮。需要显示配置`maxmin: true`即可

### fixed - 固定
类型：`Boolean`，默认：`true`

即鼠标滚动时，层是否固定在可视区域。如果不想，设置`fixed: false`即可

### resize - 是否允许拉伸
类型：`Boolean`，默认：`true`

默认情况下，你可以在弹层右下角拖动来拉伸尺寸。如果对指定的弹层屏蔽该功能，设置`false`即可。该参数对`loading`无效

### scrollbar - 是否允许浏览器出现滚动条
类型：`Boolean`，默认：`true`

默认允许浏览器滚动，如果设定`scrollbar: false`，则屏蔽

### maxWidth - 最大宽度
类型：`Number`，默认：`360`

请注意：只有当`area: 'auto'`时，`maxWidth`的设定才有效。

### maxHeight - 最大高度
类型：`Number`，默认：`无`

请注意：只有当高度自适应时，`maxHeight`的设定才有效。

### zIndex - 层叠顺序
类型：`Number`，默认：`19920215`（作者生日:joy:）

一般用于解决和其它组件的层叠冲突。

### move - 触发拖动的元素
类型：`String/Boolean`，默认：`'.vue-layer-title'`

默认是触发标题区域拖拽。

如果你想单独定义，指向元素的选择器或者DOM即可。如`move: '.mine-move'`。

你还配置设定`move: false`来禁止拖拽

### moveOut - 是否允许拖拽到窗口外
类型：`Boolean`，默认：`false`

默认只能在窗口内拖拽，如果你想让拖到窗外，那么设定`moveOut: true`即可

### success - 层弹出后的成功回调方法

类型：`Function`，默认：`null`

当你需要在层创建完毕时即执行一些语句，可以通过该回调。

```js
this.$layer.open({
    content: '我有回调',
    success() {
        // 弹出成功后执行
    }
});
```

### yes - 按钮1回调方法

类型：`Function`，默认：`null`

```js
this.$layer.open({
    content: '我有按钮',
    yes() {
        // 弹出成功后执行
    }
});
```

### cancel - 右上角关闭按钮回调方法

类型：`Function`，默认：`null`

```js
this.$layer.open({
    content: '我有关闭',
    cancel() {
        // 右上角关闭执行
    }
});
```

### end - 层销毁后触发的回调

类型：`Function`，默认：`null`

无论是确认还是取消，只要层被销毁了，`end`都会执行。

### full/min/restore -分别代表最大化、最小化、还原 后触发的回调

类型：`Function`，默认：`null`



## 内置方法

### open(options) - 核心方法

核心方法，不管是使用哪种方式创建层，都是走`open()`方法。

创建任何类型的弹层都会返回一个当前层索引，上述的`options`即是基础参数。

### alert(content, options, yes) - 普通信息框

它的弹出似乎显得有些高调，一般用于对用户造成比较强烈的关注，类似系统`alert`，但却比`alert`更灵便。

它的参数是自动向左补齐的。通过第二个参数，可以设定各种你所需要的基础参数，但如果你不需要的话，直接写回调即可。

```js
// eg1
this.$layer.alert('只想简单的提示');  

// eg2
this.$layer.alert('加了个图标', {icon: 1});
//这时如果你也还想执行yes回调，可以放在第三个参数中。

// eg3
this.$layer.alert('全部参数', {icon: 2}, function() {
    // ...
});

// eg4
this.$layer.alert('有了回调', function() {
	// ...
});
```

### confirm(content, options, yes, cancel) - 询问框

类似系统`confirm`，但却远胜`confirm`，另外它 **不是和系统的`confirm`一样阻塞** 你需要把交互的语句放在回调体中。

同样的，它的参数也是自动补齐的。

```js
// eg1
this.$layer.confirm('is not?', {icon: 3, title:'提示'}, function() {
	// ...
});

// eg2
this.$layer.confirm('is not?', function() {
	// ...
});
```

### msg(content, options, end) - 提示框

默认`3`秒后**自动消失**。

```js
// eg1
this.$layer.msg('只想弱弱提示');

// eg2
this.$layer.msg('有表情地提示', {icon: 6});

// eg3
this.$layer.msg('关闭后想做些什么', function() {
	// ...
});

// eg
this.$layer.msg('同上', {
	icon: 1,
	time: 2000 //2秒关闭（如果不配置，默认是3秒）
}, function(){
	// ...
});
```

### load(icon, options) - 加载层

`type: 3`的深度定制。

`load`并不需要你传太多的参数，但如果你不喜欢默认的加载风格，你还有选择空间。icon支持传入`0-2`如果是0，无需传。

另外特别注意一点：**`load`默认是不会自动关闭的**，因为你一般会在ajax回调体中关闭它。

```js
// eg1
let index = this.$layer.load();

// eg2
let index = this.$layer.load(1); //换了种风格

// eg3
let index = this.$layer.load(2, {time: 10 * 1000});
//又换了种风格，并且设定最长等待10秒

// 关闭
this.$layer.close(index);   
```

