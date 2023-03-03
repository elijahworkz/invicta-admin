<?php

namespace Eteacher\InvictaAdmin\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DeploymentFinished implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    /**
     * Navigation menu updated.
     *
     * @param  string  $version
     */
    public function __construct(public $version)
    {
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'deployment.finished';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('invicta-events'),
        ];
    }
}
