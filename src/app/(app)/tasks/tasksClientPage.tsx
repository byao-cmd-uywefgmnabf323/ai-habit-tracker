"use client";

import { useState } from "react";
import { PageHeader } from "../PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addTask, toggleTask, saveReflection, Task } from "./actions";

interface TasksClientPageProps {
  date: string;
  tasks: Task[];
  reflection: string;
}

export default function TasksClientPage({ date, tasks: initial, reflection: initialReflection }: TasksClientPageProps) {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [reflection, setReflection] = useState(initialReflection);

  const onAdd = async () => {
    if (!title.trim()) return;
    setSaving(true);
    const res = await addTask(title.trim(), date);
    setSaving(false);
    if (!("error" in res)) {
      setTasks([{ id: crypto.randomUUID(), user_id: "", title: title.trim(), date, done: false, created_at: new Date().toISOString() }, ...tasks]);
      setTitle("");
    } else {
      alert(res.error);
    }
  };

  const onToggle = async (id: string) => {
    const prev = tasks;
    setTasks(prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    const res = await toggleTask(id);
    if ("error" in res) {
      alert(res.error);
      setTasks(prev);
    }
  };

  const onSaveReflection = async () => {
    setSaving(true);
    const res = await saveReflection(date, reflection);
    setSaving(false);
    if ("error" in res) alert(res.error);
  };

  return (
    <div className="space-y-8">
      <PageHeader title="My Tasks" />

      <Card>
        <CardHeader>
          <CardTitle>Today: {new Date(date).toLocaleDateString()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add a task for today..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={saving}
            />
            <Button onClick={onAdd} disabled={saving || !title.trim()}>Add</Button>
          </div>

          <ul className="space-y-2">
            {tasks.map(task => (
              <li key={task.id} className="flex items-center justify-between rounded-xl bg-muted px-3 py-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border"
                    checked={task.done}
                    onChange={() => onToggle(task.id)}
                  />
                  <span className={task.done ? "line-through text-muted-foreground" : ""}>{task.title}</span>
                </label>
              </li>
            ))}
            {tasks.length === 0 && (
              <li className="text-muted-foreground">No tasks yet. Add your first task above.</li>
            )}
          </ul>

          <div className="space-y-2">
            <h3 className="font-heading text-xl font-bold">Daily Reflection</h3>
            <textarea
              className="w-full min-h-[120px] rounded-xl border bg-background px-3 py-2"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="How did today go? What went well? What will you improve tomorrow?"
            />
            <Button onClick={onSaveReflection} disabled={saving}>Save Reflection</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
