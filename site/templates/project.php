<?php snippet('header') ?>
<div class="Project container" data-router-view="projects">
  <div class="Project__video has-width-100">
      <?php if(!$youtube): ?>
        <?= Image::create($cover); ?>
      <?php else: ?>
        <iframe width="100%" src="<?= Iframe::youtube($youtube) ?>" frameborder="0" allowfullscreen></iframe>
      <?php endif; ?>
  </div>

  <h1 class="Project__title has-fontsize-48"><?= $title ?></h1>
  <div class="has-fontsize-24 has-color-grey is-column is-6"><?= $description ?></div>
  <ul class="Project__specs is-flex is-wrap">
    <?php foreach($specs as $spec): ?>
      <?php if(strlen($spec->value) > 0): ?>
      <li class="Project__spec is-column is-3">
        <h2 class="has-color-grey Project__spec--title"><?= $spec->title ?></h2>
        <p class="has-fontsize-24"><?= $spec->value ?></p>
      </li>
      <?php endif; ?>
    <?php endforeach; ?>
  </ul>
  <div class="has-fontsize-24 has-color-grey is-column is-6"><?= $conclusion ?></div>

  <h2 class="has-fontsize-48">Galerie</h2>
  <div class="Galery__content is-flex is-wrap">
    <?php foreach($galery as $picture): ?>
      <div class="Galery__picture no-shrink has-height-100 is-relative is-column is-3">
        <?= Image::thumb($picture); ?>
      </div>
    <?php endforeach; ?>
  </div>
</div>
</div>
<?php snippet('footer') ?>
