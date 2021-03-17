<?php

return function ($page, $site) {
  $title = $page->title();
  $cover = $page->cover();
  $description = $page->description();
  $conclusion = $page->conclusion();
  $youtube = $page->youtube();
  $releaseDate = $page->releaseDate();
  $cover = $page->cover();
  $galery = $page->galery()->toFiles();

  $list = array('category','artist','client','realisator','productor');
  $specs = array();

  foreach($list as $entry) {
    $specs[] = (object) array(
        'title' => t($entry),
        'value' => $page->{$entry}()
    );
  }

  $otherSpecs = $page->others()->toBuilderBlocks();
  foreach($otherSpecs as $spec) {
      $specs[] = (object) array(
          'title' => $spec->title(),
          'value' => $spec->text(),
      );
  }

  return array(
    'title' => $title,
    'conclusion' => $conclusion,
    'youtube' => $youtube,
    'description' => $description,
    'specs' => $specs,
    'galery' => $galery,
    'cover' => $cover
  );
};