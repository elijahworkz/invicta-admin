<?php

namespace Eteacher\InvictaAdmin\Admin\Locales;

use Illuminate\Support\Str;

class Locale
{
    public function __construct(protected $handle, protected $config)
    {
    }

    public function handle()
    {
        return $this->handle;
    }

    public function name()
    {
        return $this->config['name'];
    }

    public function locale()
    {
        return $this->config['locale'];
    }

    public function iso()
    {
        return $this->config['iso'];
    }

    public function url()
    {
        $url = $this->config['url'];

        if ($url === '/') {
            return '/';
        }

        return Str::of($url)
            ->rtrim('/')
            ->start('/');
    }

    public function direction()
    {
        return $this->config['direction'] ?? 'ltr';
    }
}
