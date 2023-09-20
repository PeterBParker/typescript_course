# Learning Typescript

## Purpose

This is a repository to hold my course work and experiments as I go through the Udemy "Understanding Typescript" course taught by Maximilian Schwarzmuller.

## Section 1 - 2

Introduced the basics of typescript typing and syntax. We reviewed the built-in base types (number, string, any, never, undefined, void, Function) as well as how to define our own types. The biggest take-away for me was that we should only define types of object structures only if the type inference is insufficient. I would have thought to make everything as explicit as possible, but there isn't a need to do something like the following:

```
const person: {name: string, age: number} = {name: "Nathan", age: 27}
```

## Section 3

Learning how to configure the typescript compiler and leverage its features to streamline development. Notable features are:

- The watch flag (`tsc --watch`) automatically recompiles ts files if they are changed
- Setting up tsconfig.json (`tsc --init`) will compile all typescript files in the directory and subdirs with a single `tsc` command. We could also modify the tsconfig.json to include/exclude custom files.
- Setting the `checkJS` setting in the tsconfig.json allows me to use typescript compiler features even if I don't want to write typescript files
- The `sourceMap` setting if set to true will generate `*.map` files that allow a browser to connect the generated javascript to the source typescript. This is useful for me in development so that I can view the source typescript in my browser dev tools and place breakpoints in that source to help me debug.
- Setting `outDir` defines where the generated javascript will be saved
- The `noEmitOnError` option will not generate javascript if there are compilation errors

I also learned about the "Trust Me" symbol for strict null checks. This symbol is an exclamation mark at the end of an expression. It should only be used if I am absolutely sure there will not be a null value returned. FOr example:

```
let button = document.querySelector('button');  // if there is no 'button' on the document, this will return null

button.addEventListener('click', handlerFunc); // button could be null and this will have an error!
```

but if I am 100% sure that `button` will exist, I can tell typescript to trust me on this one with:

```
let button = document.querySelector('button')!; // the trailing exclamation mark is how I surpress the strict null check error
```

## Section 5 - Classes

Private keyword restricts uage to the class that defines the variable. Protected keyword restricts usage to the class and all classese that inherit it.

Getters and setters execute a function when a property is accessed or set. This can be defined by

```
get mostRecentReport() {
    // put your logic here
    return recent_report
}

set mostRecentReport(new_value: string) {
    // run logic
    this.most_recent_report = new_value
}
```

Then these can be used by accessing them _not as functions but as properties_. For example: ` this.mostRecentReport = "new report"`. Since I am used to Python which implementes getters and setters under the hood, and if I want to later use a getter function I don't have to refactor all the code I've written that uses that property, I am not in the habit of starting with getters and setters. In Typescript, I should declare getters and setters from the beginning to make future extensibility easier.

What is a private constructor? It is a tool for the singleton pattern. You can apply the `private` keyword to the constructor just like any other function. Why this is useful is because it prohibits any code outside of the class to make a new instance of it using the `new` keyword. Example: `let instance = new MyClass()` Instead you can combine it with a static property and method to enforce the singleton pattern. Example:

```
class MySingletonClass {
    private static instance: MySingletonClass; // private to keep others from modifying it

    // using the "public" and "private" keywords in declaring the constructor's paramters
    // is shorthand for telling the constructor to automatically make and assign those as properties of the class
    private constructor(public exampleProp1: int, private exampleProp2: string) {
        // extra logic here
    }

    static getInstance() {
        if (MySingletonClass.instance) {
            return this.instance
        } else {
            return new MySingletonClass(1, "example")
        }
    }


}
```

## Section 6 - Advanced Types

Intersection Types is used with `&`. If used with custom types/interfaces, it will make a new type that combines all the properties of the two. However if used with types derived from union typing like

```
type Combinable = number | string
type Truthy = number | boolean

type Example = Combinable & Truthy // this will only be of type 'number' since that's the common type between the two unions
```

Type casting is very important to communicate with Typescript what returned types will be if it is ambiguous. This can be done by either a leading `<type>` or a trailing `as type`. Example:

```
let p = ambiguousFunc() as string
//or
let p = <string>ambiguousFunc()
```

Index Properties allow you to define an interface with an arbitrary amount of properties but with defined property types. For example, the following code snippet allows implementors to define any number of properties that have numbers as the property name and strings as the value:

```
interface Example {
    [prop: number]: string;
}

// Valid implementation
const good: Example = {
    1: "first entry",
    2: "second entry"
}

//Invalid implementation
const bad: Example = {
    first: "first entry"
    second: "second entry"
}
```

Say you have an arbitrary return type in a function you've written. For example, let's say it's a union type called "Group". But you know as the developer that if you pass in certain parameter types you will always get the same sub-type back. You could use type casting every. time. you. call. the. function. ugh. Or you can let typescript know what the precise type is returned depending on what types are passed in using _function overloading_

```
// This type can be either a boolean or a number
type Group = bool | number

// This function could return either a boolean or number so we can overload it with
// an extra line defining what parameter types result in what return type
function mingle(a: number, b: number): number
function mingle(a: Group, b: Group) {
    if typeof a == "number" && typeof b == "number" {
        return a+b
    }
    return False
}
```

Nullish Coalescing operator is `??` and it means "Hey if this value is null or undefined use a different value" Example:
`const example = var1 ?? 'DEFAULT'` this will check if var1 is null or undefined and assign the string 'DEFAULT' to the constant `example` if so.

## Generics

pass

## Decorators
