<?php
  $projects = $site->index()->filterBy('template', 'projects')->children();
  $categories = array();

  foreach($projects as $project) {
    $cat = $project->category()->toString();
    
    if (!isset($categories[$cat])) {
      $categories[$cat] = array();
    }

    $categories[$cat][] = $project;
  }
?>
<div class="Nav container has-width-100 is-flex is-justified-x is-fixed">
    <a href="<?= $site->url() ?>">Logo</a>
    <button class="Nav__btn is-flex is-wrap is-right-x">
      <p class="is-center-y is-flex">Menu <span class="is-block Nav__iconOpen is-flex is-wrap is-center-y is-relative"></span></p>
      <p class="is-center-y is-flex">Fermer <span class="is-block Nav__iconClose is-flex is-wrap is-center-y is-relative"></span></p>
    </button>
</div>
<div class="Nav__content has-width-100 is-fixed has-height-100 is-flex is-center" hidden>
  <div class="container is-flex is-center-y is-justified-x">
    <ul class="is-column has-ml-1 has-mr-1 is-3 Nav__menu">
    <?php foreach($site->pages()->listed() as $page): ?>
      <li><a href="<?= $page->url() ?>"><?= $page->title() ?></a></li>
    <?php endforeach; ?>
    </ul>
    <div class="Nav__categories is-column has-mr-1 is-6 is-flex is-wrap is-right-x">
    <?php foreach($categories as $name => $category): ?>
      <ul class="is-column is-4">
        <li class="has-color-grey"><?= $name ?></li>
        <?php foreach($category as $project): ?>
        <li class="has-fontsize-20"><a href="<?= $project->url() ?>"><?= $project->title() ?></a></li>
        <?php endforeach; ?>
      </ul>
    <?php endforeach; ?>
    </div>
  </div>
</div>