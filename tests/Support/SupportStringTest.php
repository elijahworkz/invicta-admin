<?php

namespace Elijahworkz\InvictaAdmin\Tests\Support;

use Elijahworkz\InvictaAdmin\Tests\TestCase;
use Illuminate\Support\Str;

class SupportStringTest extends TestCase
{
    /** @test */
    public function str_returns_correct_initials_from_two_word_name()
    {
        $name = 'John Doe';

        $initials = Str::initials($name);

        $this->assertSame('JD', $initials);
    }

    /** @test */
    public function str_fluent_returns_correct_initials_from_two_word_name()
    {
        $name = 'John Doe';

        $initials = Str::of($name)->initials()->__toString();

        $this->assertSame('JD', $initials);
    }

    /** @test */
    public function str_returns_correct_initials_from_many_word_name()
    {
        $name = 'John Doe Pupinsky';

        $initials = Str::initials($name);

        $this->assertSame('JP', $initials);
    }

    /** @test */
    public function str_returns_correct_initials_from_single_word_name()
    {
        $name = 'Christopher';

        $initials = Str::initials($name);

        $this->assertSame('CH', $initials);
    }
}
