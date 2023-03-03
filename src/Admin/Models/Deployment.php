<?php

namespace Eteacher\InvictaAdmin\Admin\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Deployment extends Model
{
    protected $fillable = ['version', 'user_id', 'status'];

    protected $casts = [
        'data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
