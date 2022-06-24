INSERT INTO departments (name_)
VALUES
    ('Finance'),
    ('Business'),
    ('Retail');

    INSERT INTO roles (title, salary, department_id)
VALUES
    ('Regional Manager', 75000.00, 1),
    ('Local Manager', 65000.00, 2),
    ('Intern', 45000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Ronald', 'Firbank', 1, null),
    ('Virginia', 'Woolf', 2, 1),
    ('Piers', 'Gaveston', 3, 2),
    ('Charles', 'LeRoi', 3, 2);