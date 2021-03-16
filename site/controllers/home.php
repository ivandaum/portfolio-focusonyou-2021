<?php

return function ($page, $site) {
  $projects = $page->projects()->toPages();

  return array(
    'projects' => $projects
  );
};