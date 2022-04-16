# @aomao/plugin-quote

引用样式插件

## 安装

```bash
$ yarn add @aomao/plugin-quote
```

添加到引擎

```ts
import Engine, { EngineInterface } from '@aomao/engine';
import Quote from '@aomao/plugin-quote';

new Engine(...,{ plugins:[Quote] })
```

## 可选项

### 快捷键

默认快捷键为 `mod+shift+u`

```ts
//快捷键
hotkey?: string | Array<string>;
//使用配置
new Engine(...,{
    config:{
        "quote":{
            //修改快捷键
            hotkey:"快捷键"
        }
    }
 })
```

### Markdown

默认支持 markdown，传入`false`关闭

Quote 插件 markdown 语法为`>`回车后触发

```ts
markdown?: boolean;//默认开启，false 关闭
//使用配置
new Engine(...,{
    config:{
        "quote":{
            //关闭markdown
            markdown:false
        }
    }
 })
```

## 命令

```ts
//使用 command 执行插件、并传入所需参数
engine.command.execute('quote');
//使用 command 执行查询当前状态，返回 boolean | undefined
engine.command.queryState('quote');
```
