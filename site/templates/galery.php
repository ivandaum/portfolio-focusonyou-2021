<?php snippet('header') ?>
<div class="Galery" data-router-view="galery">
  <div class="is-column has-width-100 container">
    <h1 class="is-main-title"><?= $title ?></h1>
    <div class="has-fontsize-24 has-color-grey"><?= $subtitle ?></div>

    <div class="Galery__content is-flex is-wrap">
      <?php foreach($pictures as $picture): ?>
        <?php $isProject = $picture->page() && $picture->page()->template() != 'galery'; ?>

        <div class="Galery__picture no-shrink has-height-100 is-relative is-column is-3">
          <?php if($isProject): ?>
            <a href="<?= $picture->page()->url() ?>" class="is-block">
          <?php endif; ?>

          <div class="Galery__picture--info is-absolute">
            <p class="Galery__picture--date has-color-grey"><?= date('d/m/Y', $picture->exif()->timestamp()) ?></p>
            <?php if($isProject): ?>
              <p class="Galery__picture--title"><?= $picture->page()->title() ?></p>
            <?php endif; ?>
          </div>
          <?= Image::thumb($picture); ?>

          <?php if($isProject): ?>
            </a>
          <?php endif; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</div>
<?php snippet('footer') ?>
