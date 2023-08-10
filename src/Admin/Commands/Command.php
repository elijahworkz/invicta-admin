<?php

namespace Eteacher\InvictaAdmin\Admin\Commands;

use Eteacher\InvictaAdmin\InvictaAdmin;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Str;
use JsonSerializable;

class Command implements JsonSerializable
{
    public $handle;

    public $name;

    public $description;

    public $actionButton = 'Run';

    public $command;

    public $type = 'artisan'; //supported types are 'artisan', 'shell'

    /**
     * Changes the color of the action button.
     * If set as string - this will be displayed as warning message.
     *
     * @var bool|string
     */
    public $dangerous = false;

    protected $classBasename;

    public function __construct()
    {
        $this->classBasename = Str::of(get_class($this))->classBasename();
    }

    /**
     * Get the handle for the command.
     *
     * @return string
     */
    public function handle()
    {
        return $this->handle ?: Str::slug($this->classBasename);
    }

    /**
     * Get the displayable name of the command.
     *
     * @return string
     */
    protected function name()
    {
        return $this->name ?: Str::headline($this->classBasename);
    }

    /**
     * Get the description of the command
     *
     * @return string
     */
    public function description()
    {
        return $this->description;
    }

    /**
     * Get the description of the command
     *
     * @return string
     */
    public function icon()
    {
        return InvictaAdmin::svg($this->type);
    }

    /**
     * Set success message to display
     *
     * @return string
     */
    public function successMessage()
    {
        return 'Command ran successfully';
    }

    /**
     * Get the command string that needs to run.
     *
     * @return string
     */
    public function command()
    {
        return $this->command;
    }

    /**
     * Get actionButton attribute for the command.
     *
     * @return string
     */
    protected function actionButton()
    {
        return $this->actionButton;
    }

    protected function dangerous()
    {
        return $this->dangerous
            ? is_string($this->dangerous) ? $this->dangerous : 'This is a dangerous command. Are you sure you want to continue?'
            : false;
    }

    public function run()
    {
        $method = $this->type;

        return $this->$method();
    }

    protected function artisan()
    {
        Artisan::call($this->command());

        $output = Artisan::output();
        $error = Str::of($output)->contains('ERROR');

        return response()->json([
            'message' => [
                'type' => $error ? 'error' : 'success',
                'title' => $output,
            ],
            'output' => $output,
        ]);
    }

    protected function shell()
    {
        $process = Process::run($this->command());

        $type = $process->successful() ? 'success' : 'error';
        $title = $process->failed() ? 'Error '.$process->exitCode() : $this->successMessage();
        $message = $process->failed() ? $process->errorOutput() : null;

        return response()->json([
            'message' => [
                'type' => $type,
                'title' => $title,
                'message' => $message,
            ],
            'output' => [
                'debug' => $process->exitCode(),
                'output' => $process->output(),
                'error' => $process->errorOutput(),
            ],
        ]);
        //     $process = Process::run($this->command, function ($type, $output) {
        //         return $output;
        //     })->throw();
        // return response()->stream(function () use ($question) {
        //     $stream = OpenAI::completions()->createStreamed([
        //         'model' => 'text-davinci-003',
        //         'prompt' => $question,
        //         'max_tokens' => 1024,
        //     ]);

        //     foreach ($stream as $response) {
        //         $text = $response->choices[0]->text;
        //         if (connection_aborted()) {
        //             break;
        //         }

        //         echo "event: update\n";
        //         echo 'data: ' . $text;
        //         echo "\n\n";
        //         ob_flush();
        //         flush();
        //     }

        //     echo "event: update\n";
        //     echo 'data: <END_STREAMING_SSE>';
        //     echo "\n\n";
        //     ob_flush();
        //     flush();
        // }, 200, [
        //     'Cache-Control' => 'no-cache',
        //     'X-Accel-Buffering' => 'no',
        //     'Content-Type' => 'text/event-stream',
        // ]);
    }

    /**
     * Authorize action for given user and model.
     */
    public function authorize($user)
    {
        return true;
    }

    /**
     * Prepare the action for JSON serialization.
     *
     * @return array<string, mixed>
     */
    public function jsonSerialize(): array
    {
        $handle = $this->handle();

        return [
            'handle' => $handle,
            'name' => $this->name(),
            'description' => $this->description(),
            'actionButton' => $this->actionButton(),
            'dangerous' => $this->dangerous(),
            'icon' => $this->icon(),
            'runUrl' => route('invicta.api.commands.run', ['handle' => $handle]),
            'running' => false,
        ];
    }
}
