<?php

class Iframe {
  static public function youtube($url) {
    $path = explode('/', $url);
    $last = $path[count($path) - 1];

    return "<iframe width='100%' src='https://www.youtube.com/embed/$last' frameborder='0' allowfullscreen></iframe>";
  }
}