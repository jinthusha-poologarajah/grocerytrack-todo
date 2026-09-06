// GroceryTrack - Core State & Initial Data Blueprint

export const initialTasks = [
  { id: 1, title: 'Buy Vegetables', completed: false, category: 'Grocery' },
  { id: 2, title: 'Update Inventory Log', completed: true, category: 'App' },
];

// Helper functions for state manipulation
export const addTask = (taskList, newTitle) => {
  if (!newTitle.trim()) return taskList;
  return [
    ...taskList,
    { id: Date.now(), title: newTitle, completed: false, category: 'Grocery' }
  ];
};

export const toggleTask = (taskList, taskId) => {
  return taskList.map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
};
