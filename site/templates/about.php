<?php snippet('header') ?>
<div class="About" data-router-view="about">
  <div class="About__cover is-relative has-width-100 is-flex is-center">

    <div class="About__cover--content has-text-center">
      <h1 class="is-main-title"><?= $title ?></h1>
      <button class="About__cover--link has-fontsize-24 is-flex is-baseline is-relative" data-url="<?= $showreel->url ?>">
        <span class="is-relative is-link"><?= $showreel->wording ?></span>
        <span class="icon is-flex is-center is-absolute"><img src="/assets/images/play.svg" /></span>
      </button>
    </div>

    <?php if($cover): ?>
      <div class="About__cover--picture is-absolute has-width-100 has-height-100">
        <?= Image::create($cover) ?>
      </div>
    <?php endif; ?>
  </div>

  <div class="About__introduction is-flex container">
    <div class="is-column is-6 has-pr-1">
      <h2 class="About__introduction--title"><?= $introduction->intro ?></h2>
      <div class="has-fontsize-32 has-color-lightgrey"><?= $introduction->text ?></div>
    </div>
    <div class="is-column is-6 has-pl-1">
      <?php foreach($introduction->pictures as $picture): ?>
        <?= Image::thumb($picture); ?>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="About__services is-flex is-center">
    <div class="container has-text-left has-width-100">
      <h2 class="is-main-title"><?= $services->title ?></h2>
      <ul>
      <?php foreach($services->content as $i => $service): ?>
        <li class="has-width-100">
          <button class="About__services--btn is-relative has-width-100 is-flex is-baseline is-justified-x">
            <div class="is-flex is-baseline">
              <span class="About__services--number has-fontsize-24 has-text-left has-color-grey"><?= $i+1 ?>.</span>
              <h3 class="has-fontsize-64"><?= $service->title() ?></h3>
            </div>
            <img src="/assets/images/arrow.svg" />
          </button>
          <div class="About__services--content">
            <div class="About__services--text has-fontsize-24 is-column is-6">
              <?= $service->description() ?>
            </div>
          </div>
        </li>
      <?php endforeach ?>
      </ul>
    </div>
  </div>

  <div class="About__conclusion container is-flex is-center">
    <div class="About__conclusion--content has-text-center">
      <div class="has-color-grey has-fontsize-24"><?= $conclusion->supText ?></div>
      <a class="About__conclusion--link is-flex is-baseline is-relative has-fontsize-48" href="<?= $conclusion->url ?>">
        <span class="is-relative is-link"><?= $conclusion->wording ?></span>
        <span class="icon is-flex is-center is-absolute"><img src="/assets/images/arrow-right.svg" /></span>
      </a>
    </div>
  </div>
</div>
<?php snippet('footer') ?>
