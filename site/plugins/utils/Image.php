<?php

class Image {
    const sizes = array('2048', '1600', '1280', '1024', '768');

    public static function isValid($image = null) {
        if (!$image) return false;
        $file = $image->toFile();

        if (!$file) return false;

        return true;
    }

    public static function getWidthFromHeight($height, $image) {
        if (!$image) return false;

        if(is_string($image->name())) {
            $file = $image;
        } else {
            $file = $image->toFile();
        }

        $w = $file->dimensions()->ratio() * (float) $height;
        return round($w);
    }

    public static function create($image = null, $customSizes = array(), $imgClassname = "") {
        if (!$image) return false;

        if(is_string($image->name())) {
            $file = $image;
        } else {
            $file = $image->toFile();
        }

        if (!$file) return false;

        $dimensions = $file->dimensions();
        $className = $dimensions->orientation();

        if (empty($customSizes)) {
            $sizes = self::sizes;
        } else {
            $sizes = $customSizes;
        }

        $mime = $file->mime();
        $title = $file->name();
        $img = null;
        $thumb = $file->resize(1);
        $r = $dimensions->height / $dimensions->width * 100;
        $r = str_replace(',', '.', (string) $r);

        $html = "<picture class='is-picture-" . $className . " is-flex is-center' style='padding-top:" . $r . "%'>";
        foreach($sizes as $size) {
            $img = $file->resize($size);
            $html .= "<source srcset='' media='(min-width: {$size}px)' type='$mime' data-srcset='{$img->url()}' />";
        }
        $html .= "<img alt='$title' src='{$thumb->url()}' data-src='{$img->url()}' class='is-absolute " . $imgClassname . "'/>";
        $html .= "</picture>";
        return $html;
    }

    public static function thumb($image, $sizes = array('1024', '768', '360')) {
      return self::create($image, $sizes);
    }

    public static function getUniqueId($image) {
      if (!$image) return false;

        if(is_string($image->name())) {
            $file = $image;
        } else {
            $file = $image->toFile();
        }

        if (!$file) return false;

        return $file->name() . time();
    }
}