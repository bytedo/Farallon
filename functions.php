<?php
define('FARALLON_VERSION', wp_get_theme()->get('Version'));
define('FARALLO_SETTING_KEY', 'farallon_setting');
define('FARALLON_POST_LIKE_KEY', '_postlike');
define('FARALLON_POST_VIEW_KEY', 'views');
define('FARALLON_ARCHIVE_VIEW_KEY', 'views');

function farallon_setup()
{
    load_theme_textdomain('Farallon', get_template_directory() . '/languages');
}

add_action('after_setup_theme', 'farallon_setup');

include_once('modules/setting.php');
include_once('modules/base.php');
include_once('modules/comment.php');
include_once('modules/widget.php');
include_once('modules/update.php');
include_once('modules/scripts.php');

/**
 * 代码高亮与复制按钮
 * 仅文章页加载 highlight.js CDN 资源，复制按钮逻辑在 js/app.ts 中实现
 */
function farallon_enqueue_code_highlight_assets()
{
    if (!is_single()) {
        return;
    }

    // Highlight.js 样式 (VS2015 深色主题)
    wp_enqueue_style('hljs-style', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css', array(), '11.9.0');

    // Highlight.js 核心库
    wp_enqueue_script('hljs-core', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js', array(), '11.9.0', true);
}
add_action('wp_enqueue_scripts', 'farallon_enqueue_code_highlight_assets');
