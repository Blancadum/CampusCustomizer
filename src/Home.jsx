import React, { useState, useEffect, useMemo } from 'react';
import HomeHeroBanner from './components/home/HomeHeroBanner.jsx';
import CampusRetosGrid from './components/home/CampusRetosGrid.jsx';

let memoryTasksCache = null;

const formatTaskDate = (d) => {
  if (!d) return '--';
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${day} ${months[d.getMonth()]}`;
};

export default function Home() {
  const [userName, setUserName] = useState(() => localStorage.getItem('micampus_user_name') || 'Compañero/a');

  const handleRenameUser = () => {
    const next = window.prompt('¿Cómo te llamas? (Se guardará en tu navegador)', userName);
    if (next && next.trim()) {
      setUserName(next.trim());
      try {
        localStorage.setItem('micampus_user_name', next.trim());
      } catch {}
    }
  };

  const [tasks, setTasks] = useState(() => {
    if (memoryTasksCache && memoryTasksCache.length > 0) return memoryTasksCache;
    return [];
  });

  useEffect(() => {
    fetch('/data/tasks.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          memoryTasksCache = data;
          setTasks(data);
        }
      })
      .catch(() => {});
  }, []);

  const { nextTask } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = tasks
      .map((t) => {
        const dateObj = new Date(t.date);
        dateObj.setHours(0, 0, 0, 0);
        const diffMs = dateObj.getTime() - today.getTime();
        const daysRemaining = Math.round(diffMs / (1000 * 60 * 60 * 24));
        return {
          ...t,
          dateObj,
          daysRemaining,
          formattedDate: formatTaskDate(dateObj),
        };
      })
      .filter((t) => t.daysRemaining >= 0 && !t.done)
      .sort((a, b) => a.daysRemaining - b.daysRemaining);

    return {
      nextTask: upcoming.length > 0 ? upcoming[0] : null,
    };
  }, [tasks]);

  return (
    <main className="app-container">
      <HomeHeroBanner
        userName={userName}
        onRenameUser={handleRenameUser}
        tasksCount={tasks.filter((t) => !t.done).length}
        nextTask={nextTask}
      />
      <CampusRetosGrid />
    </main>
  );
}
