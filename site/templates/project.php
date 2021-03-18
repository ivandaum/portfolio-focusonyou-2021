<?php snippet('header') ?>
<div class="Project" data-router-view="project">
  <div class="container">
    <div class="Project__video has-width-100">
        <?php if(!$youtube): ?>
          <?= Image::create($cover); ?>
        <?php else: ?>
          <iframe width="100%" src="<?= Iframe::youtube($youtube) ?>" frameborder="0" allowfullscreen></iframe>
        <?php endif; ?>
    </div>

    <h1 class="Project__title has-fontsize-48"><?= $title ?></h1>
    <div class="has-fontsize-24 has-color-grey is-column is-8 is-10-touch is-12-phone"><?= $description ?></div>
    <ul class="Project__specs is-flex is-wrap">
      <?php foreach($specs as $spec): ?>
        <?php if(strlen($spec->value) > 0): ?>
        <li class="Project__spec is-column is-3 is-4-touch is-6-phone">
          <h2 class="has-color-grey Project__spec--title"><?= $spec->title ?></h2>
          <p class="has-fontsize-24"><?= $spec->value ?></p>
        </li>
        <?php endif; ?>
      <?php endforeach; ?>
    </ul>
    <div class="has-fontsize-24 has-color-grey is-column is-8 is-10-touch is-12-phone"><?= $conclusion ?></div>
    <?php if($hasGalery): ?>
    <h2 class="Project__title has-fontsize-48">Galerie</h2>
    <div class="is-flex is-wrap">
      <?php foreach($galery as $picture): ?>
        <div data-slug="<?= Image::getUniqueId($picture) ?>" class="Galery__picture js-picture no-shrink has-height-100 is-relative is-column is-3 is-4-touch is-12-phone">
          <?= Image::thumb($picture); ?>
        </div>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>
    <h2 class="Project__title has-fontsize-48">Autres<br/>projets</h2>
    <div class="Project__projects is-flex is-wrap">
      <?php $i = 0; ?>
      <?php foreach($others as $project): ?>
        <?php if ($page->id() !== $project->id()): ?>
          <div class=" is-relative is-column is-4 is-12-phone">
            <div class="Project__projects--item is-relative">
              <a class="is-flex has-width-100 has-height-100" href="<?= $project->url() ?>">
                <div class="Projects__info is-absolute is-column">
                  <p class="has-color-grey"><?= $project->category() ?></p>
                  <h3 class="has-fontsize-32"><?= $project->title() ?></h3>
                </div>
                <?= Image::create($project->cover()) ?>
              </a>
            </div>
          </div>
          <?php 
            $i++;
            if($i >= 3) break;
          ?>
        <?php endif; ?>
      <?php endforeach; ?>
    </div>
    <?php snippet('footer-menu'); ?>
  </div>
</div>
<?php snippet('footer') ?>
