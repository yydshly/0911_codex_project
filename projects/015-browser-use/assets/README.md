# Browser-use 配图说明

| 文件 | 内容 | 性质 |
| --- | --- | --- |
| [understanding-map.svg](understanding-map.svg) | 1800×3200 完整理解图 | 本地原创矢量示意，生成自 app/build.py |
| [understanding-map.png](understanding-map.png) | 同图高清栅格版本 | 对 SVG 的实际渲染，非上游软件截图 |

图中完整展示：模型与程序、CDP 和浏览器的分工；网页结构、语义、布局与截图；模型动作；元素映射；滚动和坐标定位；CDP 鼠标移动、左键按下、松开；页面反馈；动作能力；同类差异；应用与边界。

图中坐标 `(420, 180)`、商品和页面状态均是教学示意。鼠标图标或“移动”文字指浏览器输入事件，不保证桌面系统指针移动。原理依据固定研究提交 `50f2055`，详见上一级完整理解文档。

渲染命令：

```powershell
node projects/015-browser-use/app/scripts/render-map.cjs
python projects/015-browser-use/app/build.py
```

PNG 渲染使用 Sharp；文字边界检查使用 Playwright 与 Chromium／Chrome。可以通过 `SHARP_MODULE` 和 `PLAYWRIGHT_MODULE` 指定对应模块绝对路径，通过 `BROWSER_EXECUTABLE` 指定浏览器；这些环境变量仅用于生成本地图片，不进入网页。本次仅渲染并检查原创 SVG，不把它当作站点浏览器 QA 或上游实测。
