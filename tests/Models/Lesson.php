<?php

namespace Elijahworkz\InvictaAdmin\Tests\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $casts = [
        'data' => 'json',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
