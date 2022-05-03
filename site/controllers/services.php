<?php

return function ($page, $site) {
  $title = $page->serviceTitle();
  $description = $page->text();
  $cover = $page->cover()->toFile();

  $services = (object) array(
    'title' => $page->serviceTitle(),
    'content' => $page->services()->toStructure(),
  );

  return array(
    'title' => $title,
    'cover' => $cover,
    'description' => $description,
    'services' => $services,
  );
};