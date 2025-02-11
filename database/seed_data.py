import json
import psycopg2

DB_NAME = "workout_db"
DB_USER = "admin"
DB_PASSWORD = "admin"
DB_HOST = "db"

# Load JSON data
with open('/docker-entrypoint-initdb.d/data.json', 'r') as f:
    data = json.load(f)

# Connect to database
conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST
)
cur = conn.cursor()

# Insert Workouts and Plans
for workout in data["workouts"]:
    cur.execute("INSERT INTO workouts (id, name, description, rest_intervals, intensity) VALUES (%s, %s, %s, %s, %s) ON CONFLICT DO NOTHING;",
                (workout["id"], workout["name"], workout["description"], workout["restIntervals"], workout["intensity"]))

    for plan in workout["plan"]:
        cur.execute("INSERT INTO workout_plans (id, workout_id, name) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING;",
                    (plan["id"], workout["id"], plan["name"]))

        # Insert Exercises & Repetitions
        for exercise in plan["warmups"] + plan["exercises"]:
            cur.execute("INSERT INTO exercises (name, type, muscle) VALUES (%s, %s, %s) ON CONFLICT (name) DO NOTHING;",
                        (exercise["exerciseName"], ','.join(exercise["category"]), ','.join(exercise["subCategory"])))

            cur.execute("SELECT id FROM exercises WHERE name = %s;", (exercise["exerciseName"],))
            exercise_id = cur.fetchone()[0]

            cur.execute("INSERT INTO repetitions (exercise_id, min, max) VALUES (%s, %s, %s) RETURNING id;",
                        (exercise_id, exercise["reps"]["min"], exercise["reps"]["max"]))
            reps_id = cur.fetchone()[0]

            cur.execute("INSERT INTO workout_exercises (plan_id, exercise_id, category, subcategory, sets, reps_id, is_warmup) VALUES (%s, %s, %s, %s, %s, %s, %s);",
                        (plan["id"], exercise_id, exercise["category"], exercise["subCategory"], exercise["sets"], reps_id, "warmup" in exercise["category"]))

# Commit and close
conn.commit()
cur.close()
conn.close()
