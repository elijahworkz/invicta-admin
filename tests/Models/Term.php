<?php

namespace Elijahworkz\InvictaAdmin\Tests\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Term extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get all courses that have this term.
     *
     * @relatedModel App\Models\Course
     */
    public function courses()
    {
        return $this->morphedByMany(Course::class, 'termable');
    }

    /**
     * Get all faculty that have this term.
     *
     * @relatedModel App\Models\Faculty
     */
    public function faculties()
    {
        return $this->morphedByMany(Faculty::class, 'termable');
    }
}
