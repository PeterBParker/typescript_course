console.log("hello world!!!");

// We want a decorator that will render a provided html template when an instance
// of a decorated class is instantiated. We do not want to render the template if
// there is no instance.
// Well, we'll have to define a decorator whose execution logic returns a class constructor that
// copies the new class and does additional logic to render the template. But when does the execution logic run?
function WithTemplate(template: string, domId: string) {
  console.log(
    "This is the WithTemplate Factory. It runs the moment JS sees it and should return a function of the WithTemplate Decorator logic."
  );
  // This function is the decorator logic. It is executed after its target class is declared.
  // Class decorators take the target class' constructor as the parameter. We've generalized
  // this function to tell typescript this decorator works on any class that has a constructor
  // that takes any number of any type of parameters that results in an instance with a string name property
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // If a class decorator returns a value, it replaces the class declaration with the returned
    // constructor function. In typescript the "class" keyword is syntactic sugar to declare a
    // constructor function. So here we are returning a constructor function that will be used
    // instead of the original when the target class is instantiated.
    return class extends originalConstructor {
      constructor(...args: any[]) {
        // We call the original constructor to get the values provided by the original class' logic
        super();
        const domEl = document.getElementById(domId);
        if (domEl) {
          domEl.innerHTML = template;
          // We reference the original class' name parameter
          domEl.querySelector("h1")!.textContent = this.name;
        } else {
          console.log("Can't find an element with id: " + domId);
        }
      }
    };
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

// By instantiating this object, "Max" is rendered
//const max = new Person();
