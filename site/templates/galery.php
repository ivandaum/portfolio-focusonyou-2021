<?php snippet('header') ?>
<div class="Galery" data-router-view="galery">
  <div class="container">
    <h1 class="is-main-title js-main-title"><?= $title ?></h1>
    <div class="has-fontsize-24 has-color-grey js-sub-title"><?= $subtitle ?></div>

    <div class="Galery__content is-flex is-wrap js-content">
      <?php 
        $lastDate = null; 
        $lastProject = null; 
      ?>
      <?php foreach($pictures as $picture): ?>
        <?php
          $isProject = $picture->page() && $picture->page()->template() != 'galery'; 
          $currentDate = date('m/Y', $picture->exif()->timestamp());
          $currentProject = $picture->page()->title();
        ?>
        <div data-slug="<?= Image::getUniqueId($picture) ?>" class="Galery__picture js-picture no-shrink has-height-100 is-relative is-column is-3 is-4-touch is-12-phone">
          <?php if($isProject): ?>
            <a href="<?= $picture->page()->url() ?>" class="is-block">
          <?php endif; ?>

          <?= Image::thumb($picture); ?>

          <div class="Galery__picture--info">
              <?php if($lastDate !== $currentDate || $lastProject !== $currentProject): ?>
              <p class="Galery__picture--date has-color-grey"><?= $currentDate ?></p>
              <?php if($isProject): ?>
                <p class="Galery__picture--title"><?= $picture->page()->title() ?></p>
              <?php endif; ?>
              <?php endif; ?>
          </div>

          <?php if($isProject): ?>
            </a>
          <?php endif; ?>
        </div>

        <?php $lastDate = $currentDate; ?>
        <?php $lastProject = $currentProject; ?>
      <?php endforeach; ?>
    </div>
  <?php snippet('footer-menu') ?>
  </div>
</div>
<?php snippet('footer') ?>
