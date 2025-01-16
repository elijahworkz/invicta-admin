<?php

namespace Elijahworkz\InvictaAdmin\Admin\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait UpdatesRelationships
{
    public function updateRelationship($model, $related, $value)
    {
        $relationship = $model->$related();

        // normalize the value into single array of ids or single id
        if (is_array($value)) {
            $value = isset($value['id'])
                ? $value['id']
                : collect($value)->map(function ($item, $key) {
                    return $item['id'];
                })->all();
        }

        // if ($relationship instanceof HasOne) {
        //     $relationship->update([$foreignKey => $value]);
        // }

        if ($relationship instanceof BelongsTo) {
            $foreignKey = $relationship->getForeignKeyName();
            $model->$foreignKey = $value;
            $model->save();
        }

        // We don't allow HasMany relationship to be updated this way
        // if ($type instanceof HasMany) {
        // 	$foreignKey = $model->$relationship()->getForeignKeyName();
        //     $model->$relationship()->update([$foreignKey => null]);
        //     $model->$relationship()->getRelated()->whereIn('id', $value)->update([$foreignKey => $model->id]);
        // }

        if (
            $relationship instanceof BelongsToMany ||
            $relationship instanceof MorphToMany
        ) {
            $relationship->sync($value);
        }
    }
}
