from flask import Blueprint, request, jsonify
from controllers.form_controller import submit_contact_controller

form_bp = Blueprint("form_bp", __name__)

@form_bp.route("/submit", methods=["POST"])
def submit_form():
    data = request.json
    body, status = submit_contact_controller(
        data.get("name"),
        data.get("email"),
        data.get("message")
    )
    return jsonify(body), status
