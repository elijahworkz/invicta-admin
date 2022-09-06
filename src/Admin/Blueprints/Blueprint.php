<?php

namespace Eteacher\InvictaAdmin\Admin\Blueprints;

use Illuminate\Support\Arr;
use Illuminate\Support\Fluent;


class Blueprint extends Fluent
{
	protected $blueprint;

	public function addToSidebar($fields)
	{
		$sidebar = Arr::has($this, 'sidebar');

		$fields = Arr::isAssoc($fields)
			? [$fields]
			: $fields;

		if (! $sidebar) {
			$this->sidebar(['fields' => $fields]);
		} else {
			$sidebar = $this->sidebar;
			$sidebar['fields'] = [...$sidebar['fields'], ...$fields];
			$this->sidebar($sidebar);
		}

		return $this;
	}
}