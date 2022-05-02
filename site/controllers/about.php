<?php

return function ($page, $site) {
  $title = $page->mainTitle();
  $cover = $page->cover()->toFile();

  $showreel = (object) array(
    'wording' => $page->showreelBtn(),
    'url' => $page->showreelUrl(),
  );

  $introduction = (object) array(
    'intro' => $page->introduction(),
    'text' => $page->text()->kirbytext(),
    'pictures' => $page->pictures()->toFiles()
  );

  // $services = (object) array(
  //   'title' => $page->serviceTitle(),
  //   'content' => $page->services()->toStructure(),
  // );

  $conclusion = (object) array(
    'supText' => $page->conclusionSubtitle(),
    'wording' => $page->conclusionBtn(),
    'url' => $page->conclusionPage()->toPage()->url(),
  );

  return array(
    'title' => $title,
    'cover' => $cover,
    'showreel' => $showreel,
    'introduction' => $introduction,
    // 'services' => $services,
    'conclusion' => $conclusion
  );
};