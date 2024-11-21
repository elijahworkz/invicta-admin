<?php

namespace Elijahworkz\InvictaAdmin\Admin\Filters;

use Illuminate\Support\Str;
use JsonSerializable;

class Filter implements JsonSerializable
{
    public $name;

    public $remote = false;

    public $type = 'select';

    /**
     * Apply filter to the query.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $value  Filter value
     */
    public function apply($query, $value)
    {
        return $query;
    }

    /**
     * Set filter's available options.
     *
     * @return array
     */
    public function options()
    {
        return [];
    }

    /**
     * Get filter's available options remotely.
     */
    public static function remoteOptions($search)
    {
        return [];
    }

    /**
     * Get the displayable name of the filter.
     *
     * @return string
     */
    protected function name()
    {
        return $this->name ?: Str::headline(Str::of($this->key())->classBasename());
    }

    /**
     * Build filter badge.
     *
     * @return string
     */
    public function badge($selected)
    {
        return [
            'name' => $this->name(),
            'value' => is_array($selected)
                ? collect($this->options())
                    ->filter(function ($value, $key) use ($selected) {
                        return in_array($key, $selected);
                    })->values()->all()
                : $this->options()[$selected],
        ];
    }

    /**
     * Get the key for the filter.
     *
     * @return string
     */
    protected function key()
    {
        return get_class($this);
    }

    /**
     * Prepare the filter for JSON serialization.
     *
     * @return array<string, mixed>
     */
    public function jsonSerialize(): array
    {
        return [
            'class' => $this->key(),
            'name' => $this->name(),
            'options' => collect($this->options())->map(function ($label, $value) {
                if (is_array($value)) {
                    return array_merge(['label' => $label], $value);
                } elseif (is_string($label)) {
                    return ['label' => $label, 'value' => $value];
                }

                return ['label' => $value, 'value' => $value];
            })->values()->all(),
            'remote' => $this->remote,
            'type' => $this->type,
        ];
    }
}
