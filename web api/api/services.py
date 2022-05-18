from flask import Blueprint, request, jsonify, make_response, current_app
from app import db
from models import Services

services = Blueprint('services', __name__)

@services.route('/services', methods=['POST'])
def services_create():
    request_data = request.get_json()
    service = Services(name=request_data["name"])
    service.save()
    return jsonify({'message' : 'ok', 'service' : service.json()})

@services.route('/services/<id>', methods=['GET'])
def get_by_id(id):
    return jsonify(Services().get_by_id(id).json())

@services.route('/services', methods=['GET'])
def get_all_services():
    return jsonify(Services().get_all_services())

@services.route('/services/<id>', methods=['PUT'])
def services_update(id):
    request_data = request.get_json()
    service = Services().get_by_id(id)
    service.name = request_data["name"]
    service.save()
    return jsonify({'message' : 'ok', 'service' : service.json()})

@services.route('/services/<id>', methods=['DELETE'])
def services_delete(id):
    service = Services().get_by_id(id)
    service.delete()
    return jsonify({'message' : 'ok'})