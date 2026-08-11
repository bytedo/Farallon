<?php
class Farallon_Widget extends WP_Widget

{
    function __construct()
    {
        $widget_ops = array('description' => __('Show author info', 'Farallon'));
        parent::__construct('about', __('About', 'Farallon'), $widget_ops);
    }

    function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;
        $user = get_user_by('ID', 1);
?>
        <div class="fWidgetAuthor">
            <div class="fWidgetAuthor--name"><?php echo esc_html($user->display_name); ?></div>
            <div class="fWidgetAuthor--description">
                <p><?php echo esc_html($user->description); ?></p>
            </div>
        </div>
        <?php echo $after_widget;
    }
}

class Farallon_Widget_Category extends WP_Widget

{
    function __construct()
    {
        $widget_ops = array('description' => __('Show your category card', 'Farallon'));
        parent::__construct('category', __('Categories', 'Farallon'), $widget_ops);
    }

    function widget($args, $instance)
    {
        extract($args);
        echo $before_widget;
        $categories = get_terms([
            'taxonomy' => 'category',
            'hide_empty' => false,
            // 'orderby' => 'meta_value_num',
            'order' => 'DESC',
            // 'meta_key' => '_views',
        ]);
        echo '<div class="fWidgetCategory--list">';
        foreach ($categories as $category) {
            $link = get_term_link($category, 'category')
        ?>
            <a class="fWidgetCategory--item" title="<?php echo esc_attr($category->name); ?>" aria-label="<?php echo esc_attr($category->name); ?>" href="<?php echo esc_url($link); ?>" data-count="<?php echo esc_attr($category->count); ?>">
                <?php if (get_term_meta($category->term_id, '_thumb', true)) : ?>
                    <img class="fWidgetCategory--image" alt="<?php echo esc_attr($category->name); ?>" aria-label="<?php echo esc_attr($category->name); ?>" src="<?php echo esc_url(get_term_meta($category->term_id, '_thumb', true)); ?>">

                <?php else : ?>
                    <img class="fWidgetCategory--image" alt="<?php echo esc_attr($category->name); ?>" aria-label="<?php echo esc_attr($category->name); ?>" src="<?php echo esc_url(get_template_directory_uri()); ?>/build/images/default.jpg" />
                <?php endif ?>
                <div class="fWidgetCategory--meta">
                    <div class="fWidgetCategory--title"><?php echo esc_html($category->name); ?></div>
                </div>
            </a>
<?php }
        echo '</div>';
        echo $after_widget;
    }
}

add_action('widgets_init', 'farallon_widget_init');
function farallon_widget_init()
{
    register_widget('Farallon_Widget');
    register_widget('Farallon_Widget_Category');
}
