# QA Report: V1.1 本地课堂互动页

**Date:** 2026-09-24  
**Tier:** Standard（按本地课堂工具场景调整）  
**Tester:** Codex  
**Browser:** Codex In-app Browser（Chromium）  
**Viewports:** 375×812、768×1024、1440×810

## Summary

**Overall:** Pass

五关无打字主流程、四季动态内容、投票、Agent 挑战、按钮兜底和备用文字判断均通过。未发现阻塞课堂演示的问题；控制台无错误或警告。

**Critical issues found:** 0  
**Important issues found:** 0  
**Minor issues found:** 0

## Smoke check

| Check | Pass | Notes |
|---|---|---|
| 页面标题存在 | ✓ | `南京天气变了！｜AI 中文课堂助教 V1.1` |
| Exactly one H1 | ✓ | `南京天气变了！` |
| 页面语言 | ✓ | `zh-CN` |
| Favicon | ✓ | 内嵌 SVG |
| Broken images | ✓ | 页面不依赖外部图片 |
| JavaScript syntax | ✓ | `node --check dist/app.js` |

Canonical、Open Graph、Schema 和生产安全响应头不适用于本次仅在本机运行的课堂原型，因此未作为放行条件。

## Interaction regression

| Flow | Result |
|---|---|
| Round 1 依次探索四季 | ✓ 四季视觉和词语动态变化，全部看过后解锁下一关 |
| Round 2 无打字完成 | ✓ 四季均可通过“回答正确”推进，提示按季节变化 |
| Round 3 投票 | ✓ 加票、撤销、重置、最高票读取均正常 |
| Round 3 动态理由 | ✓ 春夏秋冬各自显示匹配的天气与活动提示 |
| Round 4 挑战 Agent | ✓ 分步提示后突出两个句尾“了” |
| Final 无打字完成 | ✓ 两步提示和“回答正确”均正常 |
| 备用文字输入 | ✓ 折叠入口可判断目标答案，不影响主流程 |
| 语音不可用兜底 | ✓ 所有语音回答处同时保留教师判断按钮 |
| 控制台 | ✓ 0 error / 0 warning |

## Responsive review

| Viewport | Result |
|---|---|
| 375×812 | ✓ 无横向滚动；角色和主内容改为单列 |
| 768×1024 | ✓ 无横向滚动；投票卡片保持清晰 |
| 1440×810 | ✓ 三角色、主舞台和教师控制栏同屏；投票揭晓区基本同屏 |

## Known environment note

- SpeechSynthesis 和 SpeechRecognition 取决于实际浏览器能力与权限。
- 语音能力不是流程单点：学生可直接口头回答，老师点击“回答正确”“给一点提示”“再试一次”或“看看答案”。

## Sign-off

- [x] All critical issues resolved
- [x] Main classroom flow completed without typing
- [x] Season/activity mismatches checked

**Approved for local classroom demo:** Yes
