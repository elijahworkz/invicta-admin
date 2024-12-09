<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

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
                'flag' => $item['flag'] ?? null,
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
            $translation = isset($translations[$locale['iso']]) ? $translations[$locale['iso']]->id : null;

            return [
                'name' => $locale['name'],
                'iso' => $locale['iso'],
                'current' => $item->locale == $locale['iso'],
                'translation' => $translation,
                'origin' => $origin->locale == $locale['iso'] ? $origin->id : null,
                'flag' => $locale['flag'] ?? null,
            ];
        });
    }

    public function localizeQuery($query)
    {
        $locale = Session::get('locale', App::currentLocale());

        return $query->where('locale', $locale);
    }
}
