from flask import Blueprint, request, jsonify
from controllers.auth_controller import signup_controller, login_controller

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    body, status = signup_controller(
        data.get("name"),
        data.get("email"),
        data.get("password")
    )
    return jsonify(body), status

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    body, status = login_controller(
        data.get("email"),
        data.get("password")
    )
    return jsonify(body), status
