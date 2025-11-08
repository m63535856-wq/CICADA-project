from database.supabase_client import supabase

def submit_contact_controller(name, email, message):
    payload = {"name": name, "email": email, "message": message}

    try:
        res = supabase.table("contact_messages").insert(payload).execute()

        # In Supabase v2, errors are raised as exceptions, not stored in res.error
        if not res.data:
            return {"error": "Failed to save message"}, 500

        return {"message": "Message saved!"}, 201

    except Exception as e:
        print("Supabase Error:", e)
        return {"error": "Failed to save message"}, 500
