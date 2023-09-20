enum Role {
  ADMIN,
  AUTHOR,
  READ_ONLY,
}

const person = {
  name: "Nathan",
  age: 27,
  role: Role.ADMIN,
};

console.log(person.role);
