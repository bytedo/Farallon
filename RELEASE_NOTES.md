# Farallon 二开版 0.9.6

基于 [bigfa/Farallon](https://github.com/bigfa/Farallon) v0.9.3 二次开发（原作者已停更）。

## ✨ 功能增强

- **代码高亮**：文章页加载 highlight.js 11.9.0（VS2015 深色主题），自动识别语言，兼容 WP preformatted 纯文本代码块
- **代码复制按钮**：代码块悬停显示复制按钮，点击复制并显示成功反馈（兼容 Clipboard API 失败降级）
- **右侧固定目录导航 (TOC)**：自动提取文章 h2/h3/h4 生成侧边目录，滚动高亮当前章节，点击平滑滚动，宽屏（≥1680px）显示

## 🚀 性能优化

- 修复缩略图 `full` 尺寸导致的 `image_downsize` 全量查询瓶颈，改用 `medium_large` 缩略图
- 增加同页静态缓存，列表页不再重复计算文章缩略图/图片数
- COS 图片自动追加腾讯云 `imageMogr2` 裁剪参数（域名在主题设置中配置），列表页不再加载原图
- 清理废弃主题/插件的 autoload 选项，每请求加载量 149KB → 61KB
- 修复 `farallon_is_has_image` 缓存 bug（原实现第一篇无图后所有文章均返回 false）

## 🔒 安全加固

- 修复主题升级 AJAX 接口无权限校验（任意登录用户可覆盖主题文件 → RCE），增加 `current_user_can('update_themes')` + nonce 验证
- 修复主题设置 AJAX 接口无权限校验（可篡改全站设置 → 存储型 XSS），增加 `current_user_can('manage_options')` + nonce 验证
- 修复 REST API 接口无防护（未登录可刷赞/刷计数/发评论），写操作接口增加 `wp_rest` nonce 校验
- OG meta / TOC 标题 / 设置项输出增加转义（esc_attr / esc_html / esc_url），消除 XSS
- 主题更新检查 `sslverify` 改为 true，消除 SSRF 面

## 📦 安装

WordPress 后台 → 外观 → 主题 → 安装主题 → 上传 `Farallon-main.zip`，激活即可。
