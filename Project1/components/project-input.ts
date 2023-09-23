import { Component } from "./base.js";
import { Validatable, validate } from "../utils/validation.js";
import { state } from "../state/project.js";
import { BindToClass } from "../decorators/bind.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLInputElement;
  peopleInputEl: HTMLInputElement;

  constructor() {
    super("project-input", "app", "afterbegin", "user-input");
    this.titleInputEl = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputEl = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputEl = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private validateInputs(title: string, desc: string, people: string): boolean {
    // This was the implementation for my validation logic
    // const validation_obj = {
    //   [title]: [Validations.NotEmpty],
    //   [desc]: [Validations.NotEmpty],
    //   [people]: [Validations.NotEmpty, Validations.PostiveNum],
    // };
    // const validator = new Validator(validation_obj);
    // return validator.validate();

    // Below is the implemenation logic for the instructors validation logic
    const titleValidatable: Validatable = {
      value: title,
      required: true,
    };
    const descValidatable: Validatable = {
      value: desc,
      required: true,
      minLen: 5,
    };
    const peopleValidatable: Validatable = {
      value: people,
      required: true,
      min: 1,
    };
    return (
      validate(titleValidatable) &&
      validate(descValidatable) &&
      validate(peopleValidatable)
    );
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputEl.value;
    const enteredDesc = this.descriptionInputEl.value;
    const enteredPeople = this.peopleInputEl.value;

    if (!this.validateInputs(enteredTitle, enteredDesc, enteredPeople)) {
      alert("Invalid input, please try again!");
      return;
    }

    return [enteredTitle, enteredDesc, +enteredPeople];
  }

  private clearInputs() {
    this.titleInputEl.value = "";
    this.peopleInputEl.value = "";
    this.descriptionInputEl.value = "";
  }

  @BindToClass
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    this.clearInputs();
    if (userInput?.length === 3) {
      const [title, desc, people] = userInput;
      state.addProject(title, desc, people);
    }
  }
}
