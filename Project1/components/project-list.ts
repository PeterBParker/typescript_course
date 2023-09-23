import { Project, ProjectStatus } from "../models/project.js";
import { Component } from "./base.js";
import { DragTarget } from "../models/drag-drop.js";
import { ProjectItem } from "./project-item.js";
import { state } from "../state/project.js";
import { BindToClass } from "../decorators/bind.js";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: ProjectStatus) {
    super("project-list", "app", "beforeend", `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;

    listEl.innerHTML = "";
    for (const projItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, projItem);
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;

    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  configure() {
    state.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(
        (proj) => this.type === proj.status
      );
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
  }

  @BindToClass
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  @BindToClass
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  @BindToClass
  dropHandler(event: DragEvent): void {
    const projId = event.dataTransfer!.getData("text/plain");
    state.moveProject(projId, this.type);
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }
}
