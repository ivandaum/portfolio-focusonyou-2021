<?php

return function ($page, $site) {
  $title = $page->mainTitle();
  $subtitle = $page->subTitle();
  $cover = $page->cover();
  $email = $page->email();
  $phone = $page->phone();
  $social = $page->social()->toStructure();

  $realPhone = str_replace(array('.',' '), '', $phone);

  return array(
    'title' => $title,
    'subtitle' => $subtitle,
    'cover' => $cover,
    'email' => $email,
    'phone' => $phone,
    'realPhone' => $realPhone,
    'social' => $social
  );
};