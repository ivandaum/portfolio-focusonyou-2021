<?php snippet('header') ?>
<div class="About" data-router-view="about">
  <div data-url="<?= Iframe::getYoutubeUrl($showreel->url) ?>" class="About__showreel js-about-showreel is-fixed has-width-100 has-height-100">
    <div class="container is-relative has-height-100 is-center is-flex">
      <button class="Nav__btn js-about-showreel--close is-absolute is-flex is-wrap is-right-x">
        <p class="is-center-y is-flex">Fermer <span class="is-block Nav__iconClose is-flex is-wrap is-center-y is-relative"></span></p>
      </button>
      <?= Iframe::youtube($showreel->url); ?>
    </div>
  </div>
  <div class="About__cover is-relative has-width-100 is-flex is-center">
    <div class="About__cover--content has-text-center">
      <h1 class="is-main-title js-main-title"><?= $title ?></h1>
      <button class="About__cover--link js-about-showreel--btn has-fontsize-24 is-flex is-baseline is-relative js-sub-title" data-url="<?= $showreel->url ?>">
        <span class="is-relative is-link"><?= $showreel->wording ?></span>
        <span class="icon is-flex is-center is-absolute"><img class="ignore-lazy" src="/assets/images/play.svg" /></span>
      </button>
    </div>

    <div class="About__cover--picture js-about-cover is-absolute has-width-100 has-height-100">
      <?php if(isset($cover)): ?>
        <?php if($cover->type() === 'image'): ?>
          <?= Image::create($cover) ?>
        <?php endif; ?>
        <?php if($cover->type() === 'video'): ?>
          <?= Video::create($cover) ?>
        <?php endif; ?>
    <?php endif; ?>
    </div>
  </div>

  <div class="About__introduction is-flex is-wrap container">
    <div class="About__introduction--first is-column is-6 is-12-phone has-pr-1">
      <h2 class="About__introduction--title"><?= $introduction->intro ?></h2>
      <div class="has-fontsize-32 has-color-lightgrey"><?= $introduction->text ?></div>
    </div>
    <div data-value="[-25, 50]" class="About__introduction--second js-about-introCover is-column is-6 is-12-phone has-pl-1 is-relative">
      <?php foreach($introduction->pictures as $picture): ?>
        <?= Image::thumb($picture); ?>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="About__conclusion container is-flex is-center">
    <div class="About__conclusion--content has-text-center">
      <div class="has-color-grey has-fontsize-24"><?= $conclusion->supText ?></div>
      <a class="About__conclusion--link is-flex is-baseline is-relative has-fontsize-48" href="<?= $conclusion->url ?>">
        <span class="is-relative is-link"><?= $conclusion->wording ?></span>
        <span class="icon is-flex is-center is-absolute"><img class="ignore-lazy" src="/assets/images/arrow-right.svg" /></span>
      </a>
    </div>
  </div>
  <div class="container">
    <?php snippet('footer-menu') ?>
  </div>
</div>
<?php snippet('footer') ?>
