<?php

namespace Eteacher\InvictaAdmin\Admin\Locales;

class Locales
{
    protected $config;
    protected $languages;
    protected $current;

    public function __construct($config)
    {
        $this->config = $config;
        $this->languages = $this->setLanguages();
    }

    public function current()
    {
        return $this->default();
    }

    public function default()
    {
        return $this->languages->first();
    }

    public function get($handle)
    {
        return $this->languages->get($handle);
    }

    public function selected()
    {
        return $this->get(session('invicta.current-language', $this->default()->handle()));
    }

    protected function setLanguages()
    {
        return collect($this->config)->map(function ($language, $handle) {
            return new Locale($handle, $language);
        });
    }
}
