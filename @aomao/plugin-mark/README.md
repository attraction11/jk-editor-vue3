# @aomao/plugin-mark

标记样式插件

## 安装

```bash
$ yarn add @aomao/plugin-mark
```

添加到引擎

```ts
import Engine, { EngineInterface } from '@aomao/engine';
import Mark from '@aomao/plugin-mark';

new Engine(...,{ plugins:[Mark] })
```

## 可选项

### 快捷键

默认快捷键无，以数组形式传入多个快捷键

```ts
//快捷键，
hotkey?: string | Array<string>;

//使用配置
new Engine(...,{
    config:{
        "mark":{
            //修改快捷键
            hotkey:"快捷键"
        }
    }
 })
```

### Markdown

默认支持 markdown，传入`false`关闭

Mark 插件 markdown 语法为`==`

```ts
markdown?: boolean;//默认开启，false 关闭
//使用配置
new Engine(...,{
    config:{
        "mark":{
            //关闭markdown
            markdown:false
        }
    }
 })
```

## 命令

```ts
engine.command.execute('mark');
//使用 command 执行查询当前状态，返回 boolean | undefined
engine.command.queryState('orderedlist');
```
