# Farallon

![Wordpress Theme Farallon](https://static.fatesinger.com/2023/06/u1ak8xgmyn9ec24r.png)

Farallon is a simple single column wordpress theme with perfect performace and elegance design.

[中文说明](https://github.com/bigfa/Farallon/blob/develop/README_CN.md)

> **二开声明 (Fork Notice)**
>
> 本仓库是基于 [bigfa/Farallon](https://github.com/bigfa/Farallon) v0.9.3 的二次开发版本。
> 原作者 [bigfa](https://fatesinger.com/) 已停止更新（最后提交 2025-08）。
> 本分支在保留原作者全部功能的基础上，进行了性能优化、功能增强与安全加固，并已投入生产环境使用。
> 遵循原项目 GPL 开源协议，感谢原作者的优秀作品。

## 二开版本 (Forked Version)

latest version : `0.9.6-fork`

### 二开更新日志 (Fork Changelog)

### 0.9.6-fork (2026-08-11)

**安全加固 (Security)**
- 修复主题升级 AJAX 接口无权限校验漏洞（任意登录用户可覆盖主题文件 → RCE），增加 `current_user_can('update_themes')` + nonce 验证
- 修复主题设置 AJAX 接口无权限校验漏洞（任意登录用户可修改全站设置 → 存储型 XSS），增加 `current_user_can('manage_options')` + nonce 验证
- 修复 REST API 接口无防护漏洞（未登录可刷赞/刷计数/发评论），like/archive/comment 接口增加 `wp_rest` nonce 校验
- OG meta / TOC 标题 / 设置项输出增加转义（esc_attr / esc_html / esc_url），消除 XSS
- 主题更新检查接口 `sslverify` 从 false 改为 true，消除 SSRF 面

**性能优化 (Performance)**
- 修复 `farallon_get_background_image` 使用 full 尺寸触发 `image_downsize` 全量查询的性能瓶颈，改用 medium_large 缩略图
- 增加同页静态缓存，避免列表页重复计算文章缩略图/图片数量
- COS 图片自动追加腾讯云 `imageMogr2` 裁剪参数（域名在主题设置中配置），列表页不再加载原图
- 清理废弃主题/插件的 autoload 选项（每请求加载量 149KB → 61KB）
- 修复 `farallon_is_has_image` static 缓存 bug（原实现第一篇无图后所有文章都返回 false）

**功能增强 (Features)**
- 代码高亮：文章页加载 highlight.js 11.9.0（VS2015 深色主题），自动识别语言
- 代码块复制按钮：悬停显示、点击复制、成功反馈（兼容 Clipboard API 失败降级 execCommand）
- 右侧固定目录导航 (TOC)：自动提取 h2/h3/h4 生成目录，滚动高亮当前章节，点击平滑滚动，宽屏（≥1680px）显示

## 原版说明 (Original)

[Simple User Guide(Chinese)](https://fatesinger.com/101971)

## Changelog (Original)

### 0.9.3

- add Japanese support
- style enhancement
- update translation
- remove default logo image

### 0.9.2

- style enhancement

### 0.9.1

- update translation
- style enhancement

### 0.9.0

> [!IMPORTANT]
> scss class name has breaking changes

- update translation
- style enhancement
- add some filters
- fixed loading error in search result page

### 0.8.8

- add post read time
- update translation

### 0.8.7

- style enhancement
- update translation
- use php time format

### 0.8.6

- fixed post views error
- update translation

### 0.8.5

- style enhancement
- update translation
- add clean mode

### 0.8.4

- show excerpt if exists
- add wp gallery style support
- add config for always show cover

### 0.8.3

- style enhancement
- add `threads` icon

### 0.8.2

- style enhancement

### 0.8.1

- fixed post image count error

### 0.8.0

- style enhancement
- add a config for showing image count of the post

### 0.7.9

- show the update time of post
- update translation

### 0.7.8

- add rss tag setting for `follow`

### 0.7.7

- add max width of wp figure
- handle post format when load more posts
- fixed some style bugs

### 0.7.6

- links template link title style
- remove friend icon in comemnt content

### 0.7.5

- add image zoom
- add centered post header option
- fixed render error when fetch posts

### 0.7.4

- fixed related post error with default post format

### 0.7.3

- stable release

### 0.7.2

- add theme setting docs

### 0.7.1

- add twitter head meta

### 0.7.0

- update translation
- add open graph meta

### 0.6.9

- set `wp caption` style
- update translation

### 0.6.8

- add toc title start setting

### 0.6.7

- exclude status post format in archive template

### 0.6.6

- handle related post format

### 0.6.5

- add tag list template
- update translation

### 0.6.4

- fixed author tag in commentlist

### 0.6.3

- add custom sns config

### 0.6.2

- add theme docs link
- update translation

### 0.6.1

- add a config to exclude post_format status in homepage

### 0.6.0

- add theme uploader

### 0.5.10

- update translation
- update category list widget style

### 0.5.9

- add discord icon
- add mastodon icon

### 0.5.8

- update page template header

### 0.5.7

- update translation

### 0.5.6

- add friend icon
- disable some filter in admin panel

### 0.5.5

- add github icon setting
- add some validate rules
- add no reply text setting
- add post category card setting

### 0.5.4

- update translation

### 0.5.3

- add author card sns icon show config

### 0.5.2

- show sns icons in footer
- auto get feed link
- add email address setting
- remove telegram channel and group setting

### 0.5.1

- use wp media to set category cover

### 0.5.0

- add now template

> it's a pre release

### 0.4.10

- drunk too much coffee

### 0.4.9

- disable toc in homepage
- fixed translation error

### 0.4.8

- fixed some style error

### 0.4.7

- add category card template setting

### 0.4.6

- fixed some style error
- show category image in archive template

### 0.4.5

- add a config to disable comment author url

### 0.4.4

- detail style change
- add widget cateogry card

### 0.4.3

- term list style change

### 0.4.2

- fixed related post cover size error when img does not have enough width

### 0.4.1

- term list style change

### 0.4.0

- add category cover config
- add category list template
- add post status format archive template(memes)

### 0.3.9

- fixed copy post url style when url is too long

### 0.3.8

- add post author tip in comment item
- hack douban list style in dark mode

### 0.3.7

- add user sns icon

### 0.3.6

- add pingback style

### 0.3.4

- add post thumbnails support
- add `gravatar` proxy config

### 0.3.2

- make toc collapsible
- update `normalize.css`

### 0.3.1

- fixed next post permalink error

### 0.3.0

- Added table of contents functionality.

### 0.2.4

- Added a “back to top” option.
- Added a bottom toolbar, recommended using the “Classic Widgets” plugin for better compatibility.
- Fixed some styling errors.

### 0.2.3

- Improved menu style.
- Fixed a configuration error.

### 0.2.2

- Added an infinite scroll switch.

### 0.2.1

- Added category statistics.

### 0.2.0

- Added dark mode support.
- Fixed footer style error on mobile devices.

### 0.1.13

- Bug fixes.
- Added support for the “Marker Pro” plugin.

### 0.1.12

- Added dark color scheme.
- Added site logo and favicon configuration options.
- Added microdata to page templates.

### 0.1.11

- Added an option to show parent comments.

### 0.1.9

- Added a configuration for sharing links by copying.
- Optimized comment icons.
- Adjusted menu spacing.
- Enhanced support for “Marker Pro”.

### 0.1.8

- Added contextual links.
- Added an option to display article pagination links.

### 0.1.6

- Added support for table styles.
- Added a toggle for the article like button.
- Added a default thumbnail setting.
- Added a template for Douban pages.

### 0.1.5

- Added pagination links for comments.

### 0.1.4

- Fixed checkbox styling issue in comment form.

### 0.1.3

- Added support for popular CDNs in China.

### 0.1.0

- Initial release.
