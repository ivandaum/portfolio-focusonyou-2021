<div class="Footer has-width-100">
  <div class="Footer__content is-flex is-wrap is-justified-x">
    <p class="is-column is-5 is-12-phone"><?= t('credits') ?></p>

    <ul class="is-flex is-column is-wrap">
    <?php foreach($site->pages()->listed() as $page): ?>
      <li class="is-column is-5-phone"><a href="<?= $page->url() ?>"><?= $page->title() ?></a></li>
    <?php endforeach; ?>
    </ul>
  </div>
</div>