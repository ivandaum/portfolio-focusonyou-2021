  <?php if ($page->id() !== $site->homePageId()): ?>
  <div class="Footer has-width-100 container">
    <div class="Footer__content is-flex is-justified-x ">
      <p><?= t('credits') ?></p>

      <ul class="is-flex">
      <?php foreach($site->pages()->listed() as $page): ?>
        <li><a href="<?= $page->url() ?>"><?= $page->title() ?></a></li>
      <?php endforeach; ?>
      </ul>
    </div>
  </div>
  <?php endif; ?>
  </main>
  <script type="text/javascript" src="<?= asset('dist/index.js') ?>"></script>
</body>