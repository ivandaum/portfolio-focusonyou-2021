<?php
class Svg {
    public static function print(string $slug) {
        $kirby = kirby();
        ob_start();
        if (self::exist($slug)) {
            require $kirby->root() . "/assets/images/svg/$slug.svg";
        }
        return ob_get_clean();
    }

    public static function exist(string $slug) {
        $kirby = kirby();
        return file_exists($kirby->root() . "/assets/images/svg/$slug.svg");
    }
}