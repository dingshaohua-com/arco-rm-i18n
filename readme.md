# 移除Arco Design Pro国际化

## 背景
官方曾经承诺提供像 antd pro那样的一键移除命令，但是迟迟放鸽子，已经好几年了。

但是手动移除太麻烦了，要改几十个文件的几百处地方，所以这里提供一种自动化的方式。

[项目地址在这里，点击查看](https://github.com/dingshaohua-com/arco-rm-i18n)。


## Bun


<img src="https://img.dingshaohua.com/book-fe/202412152326535.svg" width="100"/>

如果你的node v23，则可以忽略此步，否则这个脚本则需要使用 [bun](https://bun.sh) 来运行，原因如下：

### 直接支持ts
因为需要读取项目内国际化语言 ts 配置文件内容，从而替换掉国际化配置。

node是在 Node.js v22.6.0 版本后支持直接运行 ts 文件，而 bun 则直接一开始就支持，比目前nodejs才支持的能力还更好！

### 直接支持esm
bun 直接支持 esm，无需修改原项目的 `type: module`，从而对原项目造成不必要的副作用。

### 支持短连接等配置
bun 直接支持短连接等配置，node目前不支持 或支持的有问题。

### 安装 bun 
让我们来安装 bun 
```shell
# macOS
curl -fsSL https://bun.sh/install | bash
```

执行完，先别关闭窗口，看看提示 --> 需要简单的配置一下环境变量~



## 复制脚本到项目
将本项目中的所有文件拷贝到你的项目中，建议是 `bin/rm-i18n`。
然后创建 bun 的配置文件 `bunfig.toml` 
``` 
[alias]
"@" = "../src"
```

## 执行脚本
如果你是node v23，则可以直接运行此脚本！
```shell
node ./bin/rm-i18n/index.ts
```

否则，则使用 bun
```
bun run ./bin/rm-i18n/index.ts
```
运行完，即可看到效果~

如果你是


## 注意事项
* 会重写 App.vue 文件，如果你有改动，请注意备份。
* 会删除菜单文件 `components/navbar/index.vue` 切换语言菜单代码那固定行数代码部分，如果你有改动，请留意。
