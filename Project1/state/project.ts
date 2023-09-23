type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFunc: Listener<T>) {
    this.listeners.push(listenerFunc);
  }
}
import { Project, ProjectStatus } from "../models/project.js";

// Project State Management
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return new this();
  }

  addProject(title: string, desc: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desc,
      people,
      ProjectStatus.ACTIVE
    );
    this.projects.push(newProject);
    this.triggerListeners();
  }

  triggerListeners() {
    // Execute every listener function whenever a project is added
    for (const listenerFunc of this.listeners) {
      listenerFunc(this.projects.slice());
    }
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const targetProj = this.projects.find((proj) => proj.id === projectId);
    if (targetProj && targetProj.status != newStatus) {
      targetProj.status = newStatus;
      this.triggerListeners();
    }
  }
}
export const state = ProjectState.getInstance();
