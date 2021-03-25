<?php

class Video {
    public static function create($video = null, $customSizes = array(), $imgClassname = "") {
        if (!$video) return false;

        if(is_string($video->name())) {
            $file = $video;
        } else {
            $file = $video->toFile();
        }

        if (!$file) return false;

        $mime = $file->mime();
        $title = $file->name();
        $url = $file->url();

        $html = "<video width='100%' height='' loop inline muted autoplay>"; 
        $html .= "<source src='{$url}' type='{$mime}'>";
        $html .= "Your browser does not support the video tag. </video>";

        return $html;
    }
}