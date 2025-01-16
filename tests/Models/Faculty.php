<?php

namespace Elijahworkz\InvictaAdmin\Tests\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    protected $table = 'faculty';

    protected $guarded = [];

    protected $casts = [
        'data' => 'json',
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function categories()
    {
        return $this->morphToMany(Term::class, 'termable');
    }
}
