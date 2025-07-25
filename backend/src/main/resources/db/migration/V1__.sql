CREATE TABLE "user"
(
    id           UUID         NOT NULL,
    name         VARCHAR(100) NOT NULL,
    surname      VARCHAR(100) NOT NULL,
    email        VARCHAR(200) NOT NULL,
    phone_number VARCHAR(30)  NOT NULL,
    active       BOOLEAN,
    created_at   TIMESTAMP    NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

INSERT INTO "user" (id, name, surname, email, phone_number, active, created_at)
VALUES
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69e5', 'John', 'Doe', 'john.doe@example.com', '+15551234567', true, '2025-07-25 22:08:00'),
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69e6', 'Jane', 'Smith', 'jane.smith@example.com', '+420800123456', true, '2025-07-25 22:08:00'),
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69e7', 'Bob', 'Johnson', 'bob.johnson@example.com', '+420800123456', false, '2025-07-25 22:08:00'),
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69e8', 'Alice', 'Williams', 'alice.williams@example.com', '+15554567890', true, '2025-07-25 22:08:00'),
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69e9', 'Charlie', 'Brown', 'charlie.brown@example.com', '+15554568901', false, '2025-07-25 22:08:00'),
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69ea', 'Diana', 'Davis', 'diana.davis@example.com', '+15556789012', true, '2025-07-25 22:08:00'),
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69eb', 'Frank', 'Miller', 'frank.miller@example.com', '+15557890123', true, '2025-07-25 22:08:00'),
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69ec', 'Grace', 'Wilson', 'grace.wilson@example.com', '+15558901234', false, '2025-07-25 22:08:00'),
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69ed', 'Henry', 'Taylor', 'henry.taylor@example.com', '+15559012345', true, '2025-07-25 22:08:00'),
    ('e8e60df5-3f70-4949-a30f-f91c2c1d69ee', 'Ivy', 'Anderson', 'ivy.anderson@example.com', '+15550123456', true, '2025-07-25 22:08:00');
