<?php snippet('header') ?>
<div class="Projects container" data-router-view="projects">
  <div class="is-column has-width-100">
    <h1 class="is-main-title"><?= $title ?></h1>
    <div class="has-fontsize-24 has-color-grey"><?= $subtitle ?></div>

    <div class="Projects__content is-flex">
      <?php foreach($columns as $projects): ?>
        <div class="is-column is-<?= 12 / count($columns) ?>">
          <?php foreach($projects as $project): ?>
            <a class="Projects__item is-flex is-relative has-width-100 item-<?= $project->className ?>" href="<?= $project->url() ?>">
              <div class="Projects__info is-absolute is-column">
                <p class="has-color-grey"><?= $project->category() ?></p>
                <h2 class="has-fontsize-32"><?= $project->title() ?></h2>
              </div>
              <?= Image::create($project->cover()) ?>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>
<?php snippet('footer') ?>
