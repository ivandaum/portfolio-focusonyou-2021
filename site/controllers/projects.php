<?php

return function ($page, $site) {
  $title = $page->mainTitle();
  $subtitle = $page->subTitle();
  $projects = $page->children();

  $columns = array(array(), array());

  $i = 0;
  $count = count($columns);
  $className = 1;

  foreach($projects as $project) {
    $project->className = $className;
    $columns[$i][] = $project;

    $i++;
    if ($i >= $count) {
      $i = 0;
    }

    $className++;
    if ($className > 4) {
      $className = 1;
    }
  }


  return array(
    'columns' => $columns,
    'title' => $title,
    'subtitle' => $subtitle
  );
};