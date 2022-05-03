<?php snippet('header') ?>
<div class="Contact" data-router-view="services">
  <div class="container has-width-100">
    <h1 class="is-main-title js-main-title"><?= $title ?></h1>
    <div class="is-6 is-12-touch is-column has-pr-1">
      <div class="has-color-grey has-fontsize-32 js-sub-title"><?= $description ?></div>
    </div>
    <div class="Contact__row is-flex is-center">
      <ul>
      <?php foreach($services->content as $i => $service): ?>
        <li class="has-width-100 js-service-spoiler">
          <h3 class="About__services--btn is-relative has-width-100 is-flex is-baseline is-justified-x js-service-spoiler--btn">
            <div class="is-flex is-baseline ">
              <span class="About__services--number has-fontsize-24 has-text-left has-color-grey"><?= $i+1 ?>.</span>
              <h3 class="About__services--title has-fontsize-64 has-text-left"><?= $service->title() ?></h3>
            </div>
          </h3>
          <div>
            <div class="About__services--text has-fontsize-24 is-column is-6 is-8-touch is-12-phone">
              <?= $service->description() ?>
            </div>
          </div>
        </li>
      <?php endforeach ?>
      </ul>
    </div>
  </div>
  <div class="container">
    <?php snippet('footer-menu') ?>
  </div>
</div>
<?php snippet('footer') ?>