# backend/controllers/auth_controller.py
from werkzeug.security import generate_password_hash, check_password_hash
from database.supabase_client import supabase
from utils.token_utils import create_access_token
from flask import jsonify

def signup_controller(name, email, password):
    try:
        # Check if email already exists
        exists = supabase.table("users").select("id").eq("email", email).execute()
        if exists.data:
            return {"error": "User already exists"}, 400

        hashed = generate_password_hash(password)
        payload = {"name": name, "email": email, "password": hashed}

        res = supabase.table("users").insert(payload).execute()

        if not res.data:
            return {"error": "Failed to create user"}, 500

        user = res.data[0]
        token = create_access_token(user["id"])

        return {
            "user": {
                "id": user["id"],
                "email": user["email"],
                "name": user["name"]
            },
            "token": token
        }, 201

    except Exception as e:
        print("Supabase error:", e)
        return {"error": "Failed to create user"}, 500


def login_controller(email, password):
    try:
        # Fetch user from Supabase
        res = supabase.table("users").select("*").eq("email", email).execute()

        if not res.data:  # no matching user
            return {"error": "Invalid credentials"}, 400

        user = res.data[0]

        # Verify password
        if not check_password_hash(user["password"], password):
            return {"error": "Invalid credentials"}, 400

        # Create JWT token
        token = create_access_token(user["id"])

        return {
            "user": {"id": user["id"], "email": user["email"], "name": user["name"]},
            "token": token
        }, 200

    except Exception as e:
        print("Supabase error:", e)
        return {"error": "Login failed"}, 500
