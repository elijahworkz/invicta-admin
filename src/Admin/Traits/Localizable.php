<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

use Illuminate\Support\Facades\App;

trait Localizable
{
    public function localizeBlueprint($blueprint)
    {
        return $blueprint;
    }

    public function locales()
    {
        $locales = config('invicta.locales');

        return collect($locales)->map(function ($item) {
            return [
                'name' => $item['name'],
                'iso' => $item['iso'],
                'current' => $item['iso'] == App::currentLocale(),
            ];
        });
    }

    public function localesForEdit($item)
    {
        $locales = config('invicta.locales');

        $origin = $item;

        $translations = $this->model()
            ->select('id', 'locale')
            ->where('origin_id', $item->id)
            ->whereIn('locale', collect($locales)->keys())
            ->get()
            ->keyBy('locale');

        if (! is_null($item->origin_id)) {
            $origin = $this->model()
                ->select('id', 'locale')
                ->where('id', $item->origin_id)
                ->first();
        }

        return collect($locales)->map(function ($locale) use ($item, $translations, $origin) {
            return [
                'name' => $locale['name'],
                'iso' => $locale['iso'],
                'current' => $item->locale == $locale['iso'],
                'translation' => isset($translations[$locale['iso']]) ? $translations[$locale['iso']]->id : null,
                'origin' => $origin->locale == $locale['iso'] ? $origin->id : null,
            ];
        });
    }

    public function localizeQuery($query)
    {
        if (request()->has('locale')) {
            App::setLocale(request()->get('locale'));
        }

        return $query->where('locale', App::currentLocale());
    }
}
