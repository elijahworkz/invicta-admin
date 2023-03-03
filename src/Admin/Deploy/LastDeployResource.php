<?php

namespace Eteacher\InvictaAdmin\Admin\Deploy;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LastDeployResource extends JsonResource
{
    private $status;

    private $health;

    private $date;

    private $data;

    public function __construct(private $version)
    {
    }

    public function date(string $date): void
    {
        $this->date = $date;
    }

    public function data(array $data): void
    {
        $this->data = $data;
    }

    public function status(string $status): void
    {
        $this->status = $status;
    }

    public function health(string $health): void
    {
        $this->health = $health;
    }

    public function toArray(Request $request): array
    {
        return [
            'version' => $this->version,
            'status' => $this->status,
            'health' => $this->health,
            'date' => $this->date,
            'data' => $this->data,
        ];
    }
}
