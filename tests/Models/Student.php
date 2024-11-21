<?php

namespace Elijahworkz\InvictaAdmin\Tests\Models;

use Elijahworkz\InvictaAdmin\Tests\Models\Factories\StudentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Student extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class)->withPivot('status')->withTimestamps();
    }

    protected static function newFactory()
    {
        return StudentFactory::new();
    }
}
