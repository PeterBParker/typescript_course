"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["ACTIVE"] = "active";
    ProjectStatus["FINISHED"] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
// Project Type
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFunc) {
        this.listeners.push(listenerFunc);
    }
}
// Project State Management
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return new this();
    }
    addProject(title, desc, people) {
        const newProject = new Project(Math.random().toString(), title, desc, people, ProjectStatus.ACTIVE);
        this.projects.push(newProject);
        this.triggerListeners();
    }
    triggerListeners() {
        // Execute every listener function whenever a project is added
        for (const listenerFunc of this.listeners) {
            listenerFunc(this.projects.slice());
        }
    }
    moveProject(projectId, newStatus) {
        const targetProj = this.projects.find((proj) => proj.id === projectId);
        if (targetProj && targetProj.status != newStatus) {
            targetProj.status = newStatus;
            this.triggerListeners();
        }
    }
}
const state = ProjectState.getInstance();
function BindToClass(prototype, funcName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
// ****************************************
// This is my initial attempt at validation.
// The idea is that we could define different types of validations in the enum, and
// the Validator would take an object with the value to validate as the key and a list
// of predefined validations via our enum. It would then loop over them and run the checks we
// specified.
// Example:
// const validator = new Validator({"My value to validate": [Validations.NotEmpty, Validations.NoSwearWords]})
// const validation_result = validator.validate();
var Validations;
(function (Validations) {
    Validations[Validations["NotEmpty"] = 0] = "NotEmpty";
    Validations[Validations["PostiveNum"] = 1] = "PostiveNum";
})(Validations || (Validations = {}));
class Validator {
    constructor(validatees) {
        this.validatees = validatees;
    }
    validate() {
        let isValid = true;
        for (const validate_me in this.validatees) {
            for (const valids in this.validatees[validate_me]) {
                switch (+valids) {
                    case Validations.NotEmpty:
                        if (validate_me.trim().length === 0) {
                            isValid = false;
                        }
                        break;
                    case Validations.PostiveNum:
                        if (+validate_me <= 0) {
                            isValid = false;
                        }
                        break;
                }
            }
        }
        return isValid;
    }
}
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLen != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLen;
    }
    if (validatableInput.maxLen != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLen;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
// ****************************************
// Component Base Class
class Component {
    constructor(templateId, hostElementId, insertLoc, newElementId) {
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertLoc);
    }
    attach(insertLoc) {
        this.hostEl.insertAdjacentElement(insertLoc, this.element);
    }
}
// ProjectItem Class
class ProjectItem extends Component {
    get persons() {
        if (this.project.people === 1) {
            return "1 person";
        }
        else {
            return `${this.project.people} people`;
        }
    }
    constructor(hostId, project) {
        super("single-project", hostId, "beforeend", project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + " assigned";
        this.element.querySelector("p").textContent = this.project.description;
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) {
        console.log("DragEnd");
    }
}
__decorate([
    BindToClass
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    BindToClass
], ProjectItem.prototype, "dragEndHandler", null);
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", "beforeend", `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = "";
        for (const projItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector("ul").id, projItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    configure() {
        state.addListener((projects) => {
            const relevantProjects = projects.filter((proj) => this.type === proj.status);
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault();
            const listEl = this.element.querySelector("ul");
            listEl.classList.add("droppable");
        }
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
    dropHandler(event) {
        const projId = event.dataTransfer.getData("text/plain");
        state.moveProject(projId, this.type);
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppable");
    }
}
__decorate([
    BindToClass
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    BindToClass
], ProjectList.prototype, "dragLeaveHandler", null);
__decorate([
    BindToClass
], ProjectList.prototype, "dropHandler", null);
class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", "afterbegin", "user-input");
        this.titleInputEl = this.element.querySelector("#title");
        this.descriptionInputEl = this.element.querySelector("#description");
        this.peopleInputEl = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent() { }
    validateInputs(title, desc, people) {
        // This was the implementation for my validation logic
        // const validation_obj = {
        //   [title]: [Validations.NotEmpty],
        //   [desc]: [Validations.NotEmpty],
        //   [people]: [Validations.NotEmpty, Validations.PostiveNum],
        // };
        // const validator = new Validator(validation_obj);
        // return validator.validate();
        // Below is the implemenation logic for the instructors validation logic
        const titleValidatable = {
            value: title,
            required: true,
        };
        const descValidatable = {
            value: desc,
            required: true,
            minLen: 5,
        };
        const peopleValidatable = {
            value: people,
            required: true,
            min: 1,
        };
        return (validate(titleValidatable) &&
            validate(descValidatable) &&
            validate(peopleValidatable));
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputEl.value;
        const enteredDesc = this.descriptionInputEl.value;
        const enteredPeople = this.peopleInputEl.value;
        if (!this.validateInputs(enteredTitle, enteredDesc, enteredPeople)) {
            alert("Invalid input, please try again!");
            return;
        }
        return [enteredTitle, enteredDesc, +enteredPeople];
    }
    clearInputs() {
        this.titleInputEl.value = "";
        this.peopleInputEl.value = "";
        this.descriptionInputEl.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        this.clearInputs();
        if ((userInput === null || userInput === void 0 ? void 0 : userInput.length) === 3) {
            const [title, desc, people] = userInput;
            state.addProject(title, desc, people);
        }
    }
}
__decorate([
    BindToClass
], ProjectInput.prototype, "submitHandler", null);
const proj_input = new ProjectInput();
const activeProjList = new ProjectList(ProjectStatus.ACTIVE);
const finishedProjList = new ProjectList(ProjectStatus.FINISHED);
