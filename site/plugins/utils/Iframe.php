<?php

class Iframe {
  static public function youtube($url) {
    $url = self::getYoutubeUrl($url);
    return "<iframe width='100%' src='$url' frameborder='0' allowfullscreen></iframe>";
  }

  static public function getYoutubeUrl($url) {
    $parts = parse_url($url);
    $id = null;
    if (isset($parts['query'])) {
      parse_str($parts['query'], $query);
      if (isset($query['v'])) $id = $query['v'];
    } else {
      $path = explode('/', $url);
      $id = $path[count($path) - 1];
    }
    return "https://www.youtube.com/embed/$id";
  }
}