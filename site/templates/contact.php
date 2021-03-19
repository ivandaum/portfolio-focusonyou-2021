<?php snippet('header') ?>
<div class="Contact" data-router-view="contact">
  <div class="container has-width-100">
    <h1 class="is-main-title js-main-title"><?= $title ?></h1>

    <div class="is-flex js-content">
      <div class="is-6 is-12-touch is-column has-pr-1">
        <div class="Contact__description has-color-grey has-fontsize-32 js-sub-title"><?= $subtitle ?></div>
        <div class="Contact__row">
          <h2 class="has-color-lightgrey">Par email</h2>
          <a class="has-fontsize-32 is-relative is-link-hover" href="mailto:<?= $email ?>"><?= $email ?></a>
        </div>
        <div class="Contact__row">
          <h2 class="has-color-lightgrey">Par téléphone</h2>
          <a class="has-fontsize-32 is-relative is-link-hover" href="tel:<?= $realPhone ?>"><?= $phone ?></a>
        </div>
        <div class="Contact__row">
          <h2 class="has-color-lightgrey">Suivez-nous</h2>
          <ul class="is-flex">
            <?php foreach($social as $s): ?>
            <li><a class="has-fontsize-32 is-relative is-link-hover" target="_blank" href="<?= $s->url() ?>"><?= $s->title() ?></a></li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
      <div class="is-6 is-hidden-touch is-column has-pl-1">
        <?= Image::create($cover); ?>
      </div>
    </div>
    <?php snippet('footer-menu') ?>
  </div>
</div>
<?php snippet('footer') ?>
