<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'deadline', 'userId'];

    public function assignTask($taskData)
    {
        $task = $this->create($taskData);

        return $task;
    }

    public function allTasks()
    {
        $userId = auth()->user()->id;
        $tasks = $this->where('userId', $userId)->get();
        // dd($tasks);
        return $tasks;
    }
}
