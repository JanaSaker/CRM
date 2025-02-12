"use client";

import React, { useEffect, useRef, useState } from "react";
import dragula from "dragula";
import "dragula/dist/dragula.css";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Section {
  id: string;
  name: string;
  tasks: Task[];
}

interface DragAndDropProps {
  initialSections: Section[];
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ initialSections }) => {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const containerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    
    const mirrorContainer = document.createElement("div");
    document.body.appendChild(mirrorContainer);
  
    const drake = dragula(containerRefs.current.filter(Boolean), {
      mirrorContainer, 
    });
  
    drake.on("drop", (el: HTMLElement, target: HTMLElement, source: HTMLElement) => {
      const sourceId = source.dataset.sectionId;
      const targetId = target.dataset.sectionId;
      const taskId = el.dataset.taskId;
  
      if (sourceId && targetId && taskId) {
        setSections((prevSections) => {
          const updatedSections = [...prevSections];
  
          const sourceSection = updatedSections.find((s) => s.id === sourceId);
          const taskToMove = sourceSection?.tasks.find((t) => t.id === taskId);
          if (sourceSection && taskToMove) {
            sourceSection.tasks = sourceSection.tasks.filter((t) => t.id !== taskId);
          }
  
          const targetSection = updatedSections.find((s) => s.id === targetId);
          if (targetSection && taskToMove) {
            targetSection.tasks.push(taskToMove);
          }
  
          return updatedSections;
        });
      }
    });
  
    return () => {
      drake.destroy(); 
      document.body.removeChild(mirrorContainer);
    };
  }, []);
  
  const addTask = (sectionId: string) => {
    const title = prompt("Enter task title:");
    const description = prompt("Enter task description:");
    if (title && description) {
      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                tasks: [
                  ...section.tasks,
                  { id: `${Date.now()}`, title, description },
                ],
              }
            : section
        )
      );
    }
  };

  const deleteTask = (sectionId: string, taskId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.filter((task) => task.id !== taskId),
            }
          : section
      )
    );
  };

  return (
    <div style={{ display: "flex", gap: "1rem", padding: "20px" }}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => {
            if (el) containerRefs.current[index] = el;
          }}
          data-section-id={section.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            width: "250px",
            minHeight: "300px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h3 style={{ margin: 0 }}>{section.name}</h3>
            <button
              onClick={() => addTask(section.id)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
          {section.tasks.map((task) => (
  <div
    key={task.id}
    data-task-id={task.id}
    style={{
      background: "#fff",
      margin: "5px 0",
      padding: "10px",
      borderRadius: "4px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      cursor: "move",
    }}
  >
    <strong>{task.title}</strong>
    <p style={{ fontSize: "12px", color: "#666", margin: "5px 0" }}>
      {task.description}
    </p>
  </div>
))}

        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
