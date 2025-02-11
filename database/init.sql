-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Workout Plans Table (Global or User-Created)
CREATE TABLE workout_plans (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    is_global BOOLEAN DEFAULT FALSE, -- TRUE for global plans, FALSE for user-created
    created_by INT REFERENCES users(id) ON DELETE SET NULL, -- NULL if global
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tracks which users have selected which workout plans
CREATE TABLE user_workout_plans (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    workout_plan_id INT REFERENCES workout_plans(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, workout_plan_id),
    assigned_at TIMESTAMP DEFAULT NOW()
);

-- Workouts Table (Sessions within a plan)
CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    workout_plan_id INT REFERENCES workout_plans(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    day_of_week INT CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Monday, 7=Sunday
    created_at TIMESTAMP DEFAULT NOW()
);

-- Exercises Table (List of all available exercises)
CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    category TEXT, -- e.g., Strength, Cardio
    muscle_group TEXT, -- e.g., Chest, Legs
    equipment TEXT -- e.g., Barbell, Dumbbell, Bodyweight
    type TEXT -- e.g., Compound, Isolation
    difficulty INT CHECK (difficulty BETWEEN 1 AND 5) -- 1=Beginner, 5=Advanced
);

-- Links exercises to workouts with default sets, reps, and weight
CREATE TABLE workout_exercises (
    id SERIAL PRIMARY KEY,
    workout_id INT REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id INT REFERENCES exercises(id) ON DELETE CASCADE,
    default_sets INT CHECK (default_sets > 0),
    default_reps INT CHECK (default_reps > 0),
    default_unit INT CHECK (default_unit BETWEEN 1 AND 4), -- 1=kg, 2=lb 3=seconds 4=minutes
    default_weight DECIMAL(5,2) CHECK (default_weight >= 0), -- in kg
    order_index INT NOT NULL -- Defines order of exercises in a workout
);

-- Logs what the user actually did during a workout
CREATE TABLE exercise_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    workout_id INT REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id INT REFERENCES exercises(id) ON DELETE CASCADE,
    sets INT CHECK (sets > 0),
    reps INT CHECK (reps > 0),
    unit INT CHECK (unit BETWEEN 1 AND 4), -- 1=kg, 2=lb 3=seconds 4=minutes
    weight DECIMAL(5,2) CHECK (weight >= 0),
    completed_at TIMESTAMP DEFAULT NOW()
);
