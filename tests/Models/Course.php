<?php

namespace Elijahworkz\InvictaAdmin\Tests\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public $collection = 'courses';

    protected $guarded = [];

    protected $casts = [
        'data' => 'json',
    ];

    protected $with = ['lessons', 'faculty'];

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function students()
    {
        return $this->belongsToMany(Student::class);
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, 'author_id');
    }

    public function categories()
    {
        return $this->morphToMany(Term::class, 'termable');
    }
}
