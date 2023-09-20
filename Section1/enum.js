var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["AUTHOR"] = 1] = "AUTHOR";
    Role[Role["READ_ONLY"] = 2] = "READ_ONLY";
})(Role || (Role = {}));
var person = {
    name: "Nathan",
    age: 27,
    role: Role.ADMIN,
};
console.log(person.role);
