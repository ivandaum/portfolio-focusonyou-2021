<?php $seo = new Seo($page, $site, $kirby) ?>
<!DOCTYPE html>
<html lang="fr-FR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/x-icon" href="">
    <title><?= $seo->title ?></title>

    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="<?= $seo->baseUrl ?>" />
    <meta property="og:locale" content="<?= $seo->locale ?>" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?= $seo->url ?>" />
    <meta property="og:url" content="<?= $seo->url ?>" />
    <meta property="og:site_name" content="<?= $seo->title ?>" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="description" content="<?= $seo->description ?>">
    <meta property="og:image" content="<?= $seo->image ?>" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <link rel="apple-touch-icon" sizes="180x180" href="/dist/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/dist/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/dist/favicon/favicon-16x16.png">
    <link rel="manifest" href="/dist/favicon/site.webmanifest">
    <link href="<?= asset('dist/index.css') ?>" rel="stylesheet">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <?php if($seo->ga): ?>
    <script async src="https://googletagmanager.com/gtag/js?id=<?= $seo->ga ?>"></script>
    <script>
        window.gaId = <?= $seo->ga ?>;
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', <?= $seo->ga ?>);
    </script>
    <?php endif; ?>
</head>
<body class="is-first-load">
  <div class="Loader has-width-100 is-fixed"></div>
  <?php snippet('nav'); ?>
  <main class="App js-app has-width-100 is-relative">
    <div class="js-scroller has-width-100 has-height-100 is-relative" data-router-wrapper>