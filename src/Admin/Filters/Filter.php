<?php

namespace Eteacher\InvictaAdmin\Admin\Filters;

use Illuminate\Support\Str;
use JsonSerializable;

class Filter implements JsonSerializable
{
    public $name;

    /**
     * Get the filter's available options.
     *
     * @return array
     */
    public function options()
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
     * Get the badge name of the filter.
     *
     * @return string
     */
    public function badge()
    {
        return $this->name();
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
        ];
    }
}
