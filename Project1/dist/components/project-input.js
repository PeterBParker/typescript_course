var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./base.js";
import { validate } from "../utils/validation.js";
import { state } from "../state/project.js";
import { BindToClass } from "../decorators/bind.js";
export class ProjectInput extends Component {
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
