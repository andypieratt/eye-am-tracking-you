INSERT INTO department (name) VALUES ("Executive"), ("Manager"), ("Teacher");


INSERT INTO roles (title, salary, department_id)
VALUES ("Department Head", "150000", 1), ("Manager", "100000", 2), ("Teacher", "90000", 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Smith", 1, null), ("Martha", "May", 2, null), ("Jeff", "Bezos", 3, 2), ("Alfred", "Jones", 3, 2), ("Jenny", "Jefferson", 2, 1);