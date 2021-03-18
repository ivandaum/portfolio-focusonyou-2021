<?php snippet('header') ?>
<div class="Project" data-router-view="projects">
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
    <h2 class="Project__galery--title has-fontsize-48">Galerie</h2>
    <div class="is-flex is-wrap">
      <?php foreach($galery as $picture): ?>
        <div class="Galery__picture no-shrink has-height-100 is-relative is-column is-3 is-4-touch is-6-phone">
          <?= Image::thumb($picture); ?>
        </div>
      <?php endforeach; ?>
    </div>

    <?php snippet('footer-menu'); ?>
  </div>
</div>
<?php snippet('footer') ?>
