-- 1. On s'assure que la DB existe et on l'utilise
CREATE DATABASE IF NOT EXISTS kametrain_db;
USE kametrain_db;

-- 2. Création de la fonction BIN_TO_UUID
DELIMITER //
CREATE OR REPLACE FUNCTION BIN_TO_UUID(b BINARY(16))
    RETURNS CHAR(36)
    DETERMINISTIC
BEGIN
    DECLARE hex CHAR(32);
    SET hex = HEX(b);
    RETURN LOWER(CONCAT(
            LEFT(hex, 8), '-',
            MID(hex, 9, 4), '-',
            MID(hex, 13, 4), '-',
            MID(hex, 17, 4), '-',
            RIGHT(hex, 12)
                 ));
END //
DELIMITER ;

-- 3. Optionnel : Création de la fonction UUID_TO_BIN (pour les INSERT/WHERE)
DELIMITER //
CREATE OR REPLACE FUNCTION UUID_TO_BIN(s CHAR(36))
    RETURNS BINARY(16)
    DETERMINISTIC
BEGIN
    RETURN UNHEX(REPLACE(s, '-', ''));
END //
DELIMITER ;

-- Tables de base / Référentiels
CREATE TABLE users (
    id BINARY(16) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE muscle_group (
    id BINARY(16) PRIMARY KEY,
    libelle VARCHAR(255) NOT NULL
);

CREATE TABLE unit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL
);

INSERT INTO unit (id, libelle) VALUES (1, "reps"), (2, "secondes"), (3, "minutes");

CREATE TABLE template_unit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unit_id INT,
    libelle VARCHAR(50),
    is_range TINYINT(1) DEFAULT 0,
    CONSTRAINT fk_template_unit_unit FOREIGN KEY (unit_id) REFERENCES unit(id)
);

INSERT INTO template_unit (unit_id, libelle, is_range) VALUES
      (1, "reps", false),
      (1, "reps_range", true),
      (2, "secondes", false),
      (2, "secondes_range", true),
      (3, "minutes", false),
      (3, "minutes_range", true);

CREATE TABLE exercise (
    id BINARY(16) PRIMARY KEY,
    muscle_group_id BINARY(16),
    name VARCHAR(255) NOT NULL,
    CONSTRAINT fk_exercise_muscle FOREIGN KEY (muscle_group_id) REFERENCES muscle_group(id)
);

-- Planification (Programmes)
CREATE TABLE programm (
    id BINARY(16) PRIMARY KEY,
    libelle VARCHAR(255),
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    workout_day_number INT,
    rest_day_number INT,
    week_number INT
);

CREATE TABLE user2programm (
    user_id BINARY(16),
    programm_id BINARY(16),
    PRIMARY KEY (user_id, programm_id),
    CONSTRAINT fk_u2p_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_u2p_programm FOREIGN KEY (programm_id) REFERENCES programm(id)
);

CREATE TABLE seance (
    id BINARY(16) PRIMARY KEY,
    programm_id BINARY(16),
    day INT,
    CONSTRAINT fk_seance_programm FOREIGN KEY (programm_id) REFERENCES programm(id)
);

CREATE TABLE seance2exercice (
    id BINARY(16) PRIMARY KEY,
    exercice_id BINARY(16),
    seance_id BINARY(16),
    `order` INT,
    template_unit_id INT,
    CONSTRAINT fk_s2e_exercise FOREIGN KEY (exercice_id) REFERENCES exercise(id),
    CONSTRAINT fk_s2e_seance FOREIGN KEY (seance_id) REFERENCES seance(id),
    CONSTRAINT fk_s2e_template FOREIGN KEY (template_unit_id) REFERENCES template_unit(id)
);

CREATE TABLE seance_exercise_sets (
    id BINARY(16) PRIMARY KEY,
    seance2exercice_id BINARY(16),
    set_number INT,
    min_reps_target INT DEFAULT NULL,
    max_reps_target INT,
    CONSTRAINT fk_ses_s2e FOREIGN KEY (seance2exercice_id) REFERENCES seance2exercice(id)
);

-- Exécution (Workout réel)
CREATE TABLE workout (
    id BINARY(16) PRIMARY KEY,
    seance_id BINARY(16),
    user_id BINARY(16),
    libelle VARCHAR(255),
    programm_name VARCHAR(255),
    day INT,
    week INT,
    created_at DATE,
    duration INT, -- en minutes
    CONSTRAINT fk_workout_seance FOREIGN KEY (seance_id) REFERENCES seance(id),
    CONSTRAINT fk_workout_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE workout2exercices (
    id BINARY(16) PRIMARY KEY,
    workout_id BINARY(16),
    exercice_id BINARY(16),
    `order` INT,
    CONSTRAINT fk_w2e_workout FOREIGN KEY (workout_id) REFERENCES workout(id),
    CONSTRAINT fk_w2e_exercise FOREIGN KEY (exercice_id) REFERENCES exercise(id)
);

CREATE TABLE workout_exercise_sets (
    id BINARY(16) PRIMARY KEY,
    workout2exercices_id BINARY(16),
    set_number INT,
    reps_done INT,
    unit_id INT,
    weight_kg FLOAT DEFAULT NULL,
    CONSTRAINT fk_wes_w2e FOREIGN KEY (workout2exercices_id) REFERENCES workout2exercices(id),
    CONSTRAINT fk_wes_unit FOREIGN KEY (unit_id) REFERENCES unit(id)
);

-- Social
CREATE TABLE follow (
    source_id BINARY(16),
    target_id BINARY(16),
    PRIMARY KEY (source_id, target_id),
    CONSTRAINT fk_follow_source FOREIGN KEY (source_id) REFERENCES users(id),
    CONSTRAINT fk_follow_target FOREIGN KEY (target_id) REFERENCES users(id)
);