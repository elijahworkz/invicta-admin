<?php

namespace Eteacher\InvictaAdmin\Admin\Traits;

use Illuminate\Database\Eloquent\Relations\HasMany;

trait UpdatesRelationships
{
    public function updateRelationship($model, $relationship, $value)
    {
        $type = $model->$relationship();

        if ($type instanceof HasOne) {
        }

        if ($type instanceof HasMany) {
        }

        if ($type instanceof BelongsTo || $type instanceof BelongsToMany) {
            $model->$relationship()->sync($value);
        }
    }
}
