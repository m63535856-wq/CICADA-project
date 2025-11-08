from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import traceback

# Load environment variables
load_dotenv()

if not os.getenv("GEMINI_API_KEY"):
    print("⚠️ WARNING: GEMINI_API_KEY not found in .env file!")
else:
    print("✅ GEMINI_API_KEY loaded successfully")

import google.generativeai as genai

# Import blueprints
try:
    from routes.auth_routes import auth_bp
    from routes.form_routes import form_bp
    print("✅ Routes imported successfully")
except Exception as e:
    print(f"⚠️ Warning: Could not import routes: {e}")
    auth_bp = None
    form_bp = None

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure Gemini AI
try:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    print("✅ Gemini AI configured successfully")
except Exception as e:
    print(f"❌ Failed to configure Gemini: {e}")

# Register blueprints
if auth_bp:
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
if form_bp:
    app.register_blueprint(form_bp, url_prefix="/api/contact")

# --- HEALTH CHECK ROUTE ---
@app.route("/api/ping")
def ping():
    return jsonify({"message": "Backend is running!"})

# --- LIST AVAILABLE MODELS ---
@app.route("/api/models", methods=["GET"])
def list_models():
    try:
        models = genai.list_models()
        available = []
        for m in models:
            if 'generateContent' in m.supported_generation_methods:
                available.append({
                    "name": m.name,
                    "display_name": m.display_name,
                    "description": m.description
                })
        return jsonify({"models": available, "count": len(available)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- AI CHATBOT ROUTE (Gemini) ---
@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        print("\n📩 Received chat request")
        
        data = request.get_json()
        print(f"📦 Request data: {data}")
        
        user_message = data.get("message", "")
        print(f"💬 User message: {user_message}")

        if not user_message:
            return jsonify({"error": "Message cannot be empty"}), 400

        if not os.getenv("GEMINI_API_KEY"):
            return jsonify({"error": "Gemini API key not configured"}), 500

        # Try multiple model names in order of preference
        model_names = [
            "gemini-1.5-flash",
            "gemini-1.5-pro", 
            "gemini-pro",
            "models/gemini-pro",
            "models/gemini-1.5-flash",
        ]
        
        last_error = None
        
        for model_name in model_names:
            try:
                print(f"🤖 Trying model: {model_name}")
                model = genai.GenerativeModel(model_name)
                response = model.generate_content(user_message)
                print(f"✅ Success with {model_name}!")
                print(f"📝 Response: {response.text[:100]}...")
                
                return jsonify({
                    "reply": response.text,
                    "model_used": model_name
                })
            except Exception as e:
                last_error = str(e)
                print(f"❌ Failed with {model_name}: {e}")
                continue
        
        # If all models failed
        return jsonify({
            "error": f"All models failed. Last error: {last_error}",
            "suggestion": "Visit http://127.0.0.1:5000/api/models to see available models"
        }), 500

    except Exception as e:
        print(f"\n❌ ERROR in /api/chat:")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# --- RUN SERVER ---
if __name__ == "__main__":
    print("\n🚀 Starting Flask server...")
    print(f"📍 Running on http://0.0.0.0:5000")
    print(f"🔧 Debug mode: {os.getenv('FLASK_ENV') == 'development'}")
    print(f"💡 Check available models: http://127.0.0.1:5000/api/models\n")
    
    app.run(
        host="0.0.0.0", 
        port=5000, 
        debug=(os.getenv("FLASK_ENV") == "development")
    )