interface obvInit {
    more_text: any;
    loading_text: any;
    now_text: any;
    like_success_message: any;
    copy_success_text(copy_success_text: any): unknown;
    archive_id: any;
    post_view: boolean;
    no_more_posts_message(no_more_posts_message: any, arg1: string): unknown;
    success_message(success_message: any, arg1: string): unknown;
    hide_home_cover: boolean;
    restfulBase: string;
    nonce: string;
    comment_submit_success_text(comment_submit_success_text: any, arg1: string): unknown;
    is_single: boolean;
    post_id: number;
    is_archive: boolean;
    darkmode: boolean;
    version: string;
}

class farallonBase {
    is_single: boolean = false;
    post_id: number = 0;
    is_archive: boolean = false;
    darkmode: any = false;
    VERSION: string;
    obvInit: obvInit;

    constructor() {
        const obvInit = (window as any).obvInit as obvInit;
        this.is_single = obvInit.is_single;
        this.post_id = obvInit.post_id;
        this.is_archive = obvInit.is_archive;
        this.darkmode = obvInit.darkmode;
        this.VERSION = obvInit.version;
        this.obvInit = obvInit;
    }

    getCookie(t: any) {
        if (0 < document.cookie.length) {
            var e = document.cookie.indexOf(t + '=');

            if (-1 != e) {
                e = e + t.length + 1;
                var n = document.cookie.indexOf(';', e);
                return -1 == n && (n = document.cookie.length), document.cookie.substring(e, n);
            }
        }
        return '';
    }

    setCookie(t: any, e: any, n: any) {
        var o = new Date();
        o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);
        var i = 'expires=' + o.toUTCString();
        document.cookie = t + '=' + e + ';' + i + ';path=/';
    }

    showNotice(message: any, type: any = 'success') {
        const html = `<div class="notice--wrapper">${message}</div>`;

        document.querySelector('body')!.insertAdjacentHTML('beforeend', html);
        document.querySelector('.notice--wrapper')!.classList.add('is-active');
        setTimeout(() => {
            document.querySelector('.notice--wrapper')!.remove();
        }, 3000);
    }
}

/**
 * 代码高亮与复制按钮
 * highlight.js 由 functions.php 在文章页引入 CDN
 */
declare const hljs: any;

const farallonInitCodeHighlight = () => {
    if (typeof hljs === 'undefined') return;

    // 1. 规范化代码块：确保每个 pre 内都有 code 元素
    //    兼容 WP 的 pre.wp-block-preformatted（纯文本直接放 pre 里）
    document.querySelectorAll('pre').forEach((pre) => {
        if (pre.querySelector('code')) return;

        const code = document.createElement('code');
        // 保留原有属性与内容，移入 code 元素
        const attrs = Array.from(pre.attributes);
        attrs.forEach((attr) => {
            if (attr.name !== 'class') code.setAttribute(attr.name, attr.value);
        });
        code.innerHTML = pre.innerHTML;
        pre.innerHTML = '';
        pre.appendChild(code);
    });

    // 2. 执行高亮
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });

    // 3. 为代码块添加复制按钮
    document.querySelectorAll('pre').forEach((pre) => {
        const code = pre.querySelector('code');
        if (!code || pre.querySelector('.farallon-copy-btn')) return;

        // 确保定位上下文
        if (getComputedStyle(pre).position === 'static') {
            pre.style.position = 'relative';
        }

        const btn = document.createElement('button');
        btn.className = 'farallon-copy-btn';
        btn.type = 'button';
        btn.title = '复制代码';
        btn.setAttribute('aria-label', '复制代码');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

        btn.addEventListener('click', () => {
            const text = code.textContent || '';

            const showSuccess = () => {
                btn.classList.add('copied');
                const original = btn.innerHTML;
                btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = original;
                }, 2000);
            };

            // 优先使用 Clipboard API，失败时降级到 execCommand
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(showSuccess).catch(() => {
                    // Clipboard API 失败（权限/非安全上下文），降级方案
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        document.execCommand('copy');
                        showSuccess();
                    } catch (e) {
                        // 复制失败，无提示
                    }
                    document.body.removeChild(textarea);
                });
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    showSuccess();
                } catch (e) {
                    // 复制失败，无提示
                }
                document.body.removeChild(textarea);
            }
        });

        pre.appendChild(btn);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', farallonInitCodeHighlight);
} else {
    farallonInitCodeHighlight();
}

/**
 * 右侧固定目录导航 (TOC)
 * 提取文章 h2/h3/h4 生成目录，滚动时高亮当前章节
 */
const farallonInitToc = () => {
    const content = document.querySelector('.fGraph');
    if (!content) return;

    // 收集标题（排除文章自带目录块里的）
    const headings = Array.from(content.querySelectorAll('h2, h3, h4')).filter((h): h is HTMLElement => {
        // 跳过没有 id 的标题（无法锚点跳转）
        return !!(h as HTMLElement).id;
    });
    if (headings.length < 2) return; // 标题太少不显示

    // 构建目录 DOM
    const toc = document.createElement('nav');
    toc.className = 'farallon-toc';
    toc.setAttribute('aria-label', '文章目录');

    const title = document.createElement('div');
    title.className = 'farallon-toc--title';
    title.textContent = '目录';
    toc.appendChild(title);

    const list = document.createElement('ul');
    list.className = 'farallon-toc--list';

    const links: { el: HTMLAnchorElement; target: HTMLElement }[] = [];

    headings.forEach((h) => {
        const li = document.createElement('li');
        li.className = `farallon-toc--item is-${h.tagName.toLowerCase()}`;

        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.textContent = h.textContent?.trim() || '';
        a.title = h.textContent?.trim() || '';

        a.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.getElementById(h.id);
            if (target) {
                // 平滑滚动到标题，并留出顶部间距
                const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top, behavior: 'smooth' });
                history.pushState(null, '', `#${h.id}`);
            }
        });

        li.appendChild(a);
        list.appendChild(li);
        links.push({ el: a, target: h });
    });

    toc.appendChild(list);
    document.body.appendChild(toc);

    // 滚动高亮当前章节（节流）
    let ticking = false;
    const updateActive = () => {
        ticking = false;
        const scrollTop = window.pageYOffset + 120; // 视口上方偏移

        let current: { el: HTMLAnchorElement; target: HTMLElement } | null = null;
        for (const link of links) {
            if (link.target.offsetTop <= scrollTop) {
                current = link;
            } else {
                break;
            }
        }

        links.forEach((link) => {
            link.el.classList.toggle('is-active', link === current);
        });
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateActive);
            ticking = true;
        }
    });
    updateActive();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', farallonInitToc);
} else {
    farallonInitToc();
}
