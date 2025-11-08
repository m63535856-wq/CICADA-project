from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import traceback
import requests

# Load environment variables
load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GITHUB_TOKEN:
    print("⚠️ WARNING: GITHUB_TOKEN not found in .env file!")
else:
    print("✅ GITHUB_TOKEN loaded successfully")

if not GEMINI_API_KEY:
    print("⚠️ WARNING: GEMINI_API_KEY not found in .env file!")
else:
    print("✅ GEMINI_API_KEY loaded successfully")

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

# Register blueprints
if auth_bp:
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
if form_bp:
    app.register_blueprint(form_bp, url_prefix="/api/contact")

# --- HEALTH CHECK ROUTE ---
@app.route("/api/ping")
def ping():
    return jsonify({"message": "Backend is running!"})

# --- AI CHATBOT ROUTE (GitHub Models) ---
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

        if not GITHUB_TOKEN:
            return jsonify({"error": "GitHub token not configured"}), 500

        # GitHub Models API endpoint
        github_api_url = "https://models.inference.ai.azure.com/chat/completions"
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GITHUB_TOKEN}"
        }

        # Try multiple models in order of preference
        models_to_try = [
            "gpt-4o-mini",
            "gpt-4o", 
            "Phi-3-medium-128k-instruct",
            "Mistral-large",
            "Meta-Llama-3.1-70B-Instruct",
        ]

        last_error = None

        for model_name in models_to_try:
            try:
                print(f"🤖 Trying GitHub model: {model_name}")
                
                payload = {
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are MAI, an AI assistant for Mastersolis Infotech. Help users with information about the company, services, and general queries."
                        },
                        {
                            "role": "user",
                            "content": user_message
                        }
                    ],
                    "model": model_name,
                    "temperature": 0.7,
                    "max_tokens": 1000
                }

                response = requests.post(
                    github_api_url,
                    headers=headers,
                    json=payload,
                    timeout=30
                )

                if response.status_code == 200:
                    result = response.json()
                    reply_text = result["choices"][0]["message"]["content"]
                    print(f"✅ Success with {model_name}")
                    print(f"📝 Reply: {reply_text[:100]}...")

                    return jsonify({
                        "reply": reply_text,
                        "model_used": model_name
                    })
                else:
                    last_error = f"{model_name}: {response.status_code} - {response.text}"
                    print(f"❌ Failed with {model_name}: {last_error}")
                    continue

            except requests.exceptions.Timeout:
                last_error = f"{model_name}: Request timeout"
                print(f"❌ Timeout with {model_name}")
                continue
            except Exception as e:
                last_error = f"{model_name}: {str(e)}"
                print(f"❌ Error with {model_name}: {e}")
                continue

        # If all GitHub models failed, try Gemini as fallback
        if GEMINI_API_KEY:
            try:
                print("🔄 Trying Gemini as fallback...")
                from google import genai
                
                client = genai.Client(api_key=GEMINI_API_KEY)
                chat_session = client.chats.create(model="gemini-1.5-flash")
                response = chat_session.send_message(user_message)
                reply_text = response.text
                
                print(f"✅ Gemini fallback successful")
                return jsonify({
                    "reply": reply_text,
                    "model_used": "gemini-1.5-flash (fallback)"
                })
            except Exception as e:
                print(f"❌ Gemini fallback failed: {e}")

        # All models failed
        return jsonify({
            "error": f"All AI models failed. Last error: {last_error}",
            "suggestion": "Check your GitHub token or try again later"
        }), 500

    except Exception as e:
        print(f"\n❌ ERROR in /api/chat:")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# --- LIST AVAILABLE GITHUB MODELS ---
@app.route("/api/models", methods=["GET"])
def list_models():
    try:
        if not GITHUB_TOKEN:
            return jsonify({"error": "GitHub token not configured"}), 500

        headers = {
            "Authorization": f"Bearer {GITHUB_TOKEN}"
        }

        # GitHub Models catalog endpoint
        response = requests.get(
            "https://models.inference.ai.azure.com/models",
            headers=headers,
            timeout=10
        )

        if response.status_code == 200:
            models = response.json()
            return jsonify({
                "models": models,
                "count": len(models.get("data", []))
            })
        else:
            return jsonify({
                "error": f"Failed to fetch models: {response.status_code}",
                "available_models": [
                    "gpt-4o-mini",
                    "gpt-4o",
                    "Phi-3-medium-128k-instruct",
                    "Mistral-large",
                    "Meta-Llama-3.1-70B-Instruct"
                ]
            }), 200

    except Exception as e:
        print("❌ Error listing models:", e)
        return jsonify({
            "error": str(e),
            "available_models": [
                "gpt-4o-mini",
                "gpt-4o",
                "Phi-3-medium-128k-instruct",
                "Mistral-large",
                "Meta-Llama-3.1-70B-Instruct"
            ]
        }), 200

# --- RUN SERVER ---
if __name__ == "__main__":
    print("\n🚀 Starting Flask server...")
    print(f"📍 Running on http://0.0.0.0:5000")
    debug_mode = os.getenv("FLASK_ENV") == "development"
    print(f"🔧 Debug mode: {debug_mode}")
    print(f"💡 Test chatbot: http://127.0.0.1:5000/api/chat")
    print(f"💡 Check models: http://127.0.0.1:5000/api/models\n")
    
    app.run(
        host="0.0.0.0", 
        port=5000, 
        debug=debug_mode
    )