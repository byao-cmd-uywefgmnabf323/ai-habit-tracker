"use client";

import { useState } from "react";
import { PageHeader } from "../../PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toggleTask } from "../actions";

interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  done: boolean;
}

interface AllTasksClientPageProps {
  groups: Record<string, Task[]>; // date -> tasks
}

export default function AllTasksClientPage({ groups }: AllTasksClientPageProps) {
  const [state, setState] = useState(groups);

  const onToggle = async (id: string) => {
    const prev = structuredClone(state);
    // Optimistic update
    for (const date of Object.keys(state)) {
      state[date] = state[date].map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    }
    setState({ ...state });

    const res = await toggleTask(id);
    if ("error" in res) {
      alert(res.error);
      setState(prev);
    }
  };

  const sortedDates = Object.keys(state).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="space-y-8">
      <PageHeader title="All Tasks" />

      {sortedDates.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-muted-foreground">No tasks yet.</CardContent>
        </Card>
      ) : (
        sortedDates.map((date) => (
          <Card key={date}>
            <CardHeader>
              <CardTitle>{new Date(date).toLocaleDateString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {state[date].map((task) => (
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
              </ul>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
