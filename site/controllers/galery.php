<?php

return function ($page, $site) {
  $title = $page->mainTitle();
  $subtitle = $page->subTitle();

  $galery = $page->galery()->toFiles();
  $projects = $site->index()->filterBy('template', 'projects')->children();

  foreach($projects as $project) {
    $galery->add($project->galery()->toFiles());
  }

  $pictures = array();
  foreach($galery as $image) {
    $pictures[] = $image;
  }

  usort($pictures, function($a, $b) {
    return $a->exif()->timestamp() < $b->exif()->timestamp();
  });

  return array(
    'pictures' => new Files($pictures),
    'title' => $title,
    'subtitle' => $subtitle
  );
};