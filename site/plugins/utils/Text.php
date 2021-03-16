<?php

class Text {
    public static function withLinebreaks(string $text = '') {
        return str_replace(array("\r\n", "\r", "\n"), "<br />", $text);
    }

    public static function slugify($text) {
        // Strip html tags
        $text=strip_tags($text);
        // Replace non letter or digits by -
        $text = preg_replace('~[^\pL\d]+~u', '-', $text);
        // Transliterate
        setlocale(LC_ALL, 'en_US.utf8');
        $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);
        // Remove unwanted characters
        $text = preg_replace('~[^-\w]+~', '', $text);
        // Trim
        $text = trim($text, '-');
        // Remove duplicate -
        $text = preg_replace('~-+~', '-', $text);
        // Lowercase
        $text = strtolower($text);
        // Check if it is empty
        if (empty($text)) { return 'n-a'; }
        // Return result
        return $text;
    }

    public static function slugifyArray($arr, $toString = true) {
        foreach($arr as $k => $v) {
            $arr[$k] = self::slugify($v);
        }

        if ($toString) {
            return implode(',', $arr);
        }

        return $arr;
    }
}