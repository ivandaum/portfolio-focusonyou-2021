<?php
  $projects = $site->index()->filterBy('template', 'projects')->children();
  $categories = array();
  $columns = array();

  foreach($projects as $project) {
    $cat = $project->category()->toString();
    if (!isset($categories[$cat])) {
      $categories[$cat] = array();
    }

    $categories[$cat][] = $project;
  }

  $i = 0;
  foreach($categories as $name => $projects) {
    if(!isset($columns[$i])) $columns[$i] = array();

    $columns[$i][] = array(
      'title' => $name,
      'projects' => $projects
    );

    $i++;
    if($i >= 3) $i = 0;
  }
?>

<div class="Nav container has-width-100 is-flex is-justified-x is-fixed">
    <a href="<?= $site->url() ?>">Logo</a>
    <button class="Nav__btn js-navbar-btn is-flex is-wrap is-right-x">
      <p class="is-center-y is-flex">Menu <span class="is-block Nav__iconOpen is-flex is-wrap is-center-y is-relative"></span></p>
      <p class="is-center-y is-flex">Fermer <span class="is-block Nav__iconClose is-flex is-wrap is-center-y is-relative"></span></p>
    </button>
</div>

<div class="Nav__content has-width-100 is-fixed has-height-100 js-navbar-content">
  <div class="Nav__scroller container has-width-100 is-flex is-center-y is-wrap">
    <ul class="Nav__menu js-navbar-menu is-column has-mr-1 is-4 is-12-phone">
    <?php foreach($site->pages()->listed() as $page): ?>
      <li class="is-block"><a class="is-link-hover" href="<?= $page->url() ?>"><?= $page->title() ?></a></li>
    <?php endforeach; ?>
    </ul>
    <div class="Nav__categories js-navbar-categories is-column is-7 is-12-phone is-flex is-wrap is-right-x">
    <?php foreach($columns as $column): ?>
      <div class="is-column is-4 is-12-touch">
      <?php foreach($column as $category): ?>
        <ul>
          <li class="has-color-grey is-block"><?= $category['title'] ?></li>
          <?php foreach($category['projects'] as $project): ?>
          <li class="has-fontsize-20 is-block"><a class="is-link-hover" href="<?= $project->url() ?>"><?= $project->title() ?></a></li>
          <?php endforeach; ?>
        </ul>
      <?php endforeach; ?>
      </div>
      <?php endforeach; ?>

    </div>
  </div>
</div>