<?php

class Iframe {
  static public function youtube($url) {
    $path = explode('/', $url);
    $last = $path[count($path) - 1];
    return "https://www.youtube.com/embed/$last";
  }
}