<?php

class Seo {
    public function __construct($page, $site, $kirby) {
        $this->baseTitle = $site->title()->html();
        $this->title = $page->title()->html() . ' - '. $this->baseTitle;

        if ($page->id() === $site->homePageId()) {
            $this->title = $this->baseTitle;
        }

        $this->description = t('site_description');
        $this->url = $page->url();
        $this->baseUrl = $kirby->language()->baseUrl();
        $this->ga = option('ga');
        $this->code = $kirby->language()->code();
        $this->locale = $kirby->language()->locale();
        $this->locale = $this->locale[0];
        $this->image = $this->getPicture($page, $site);
    }

    public function getPicture($page, $site) {
        $cover = $page->cover();

        if ($page->id() === $site->homePageId()) {
            $cover = $page->projects()->toPages()->first()->cover();
        }

        if($cover->toFile()) {
            return $cover->toFile()->crop(1200, 630)->url();
        }

        foreach($page->children() as $children) {
            $cover = $children->cover();

            if($cover->toFile()) {
                return $cover->toFile()->crop(1200, 630)->url();
            }
        }

        return false;
    }
}