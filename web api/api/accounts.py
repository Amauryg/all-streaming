from flask import Blueprint, request, jsonify, make_response, current_app
from app import db
from models import Accounts

accounts = Blueprint('accounts', __name__)

@accounts.route('/accounts', methods=['POST'])
def accounts_create():
    request_data = request.get_json()
    account = Accounts(
        name=request_data["name"],
        service_id=request_data["service_id"],
        status=request_data["status"],
    )
    account.save()
    return jsonify({'message' : 'ok', 'account' : account.json()})

@accounts.route('/accounts/<id>', methods=['GET'])
def get_by_id(id):
    return jsonify(Accounts().get_by_id(id).json())

@accounts.route('/accounts', methods=['GET'])
def get_all_accounts():
    return jsonify(Accounts().get_all_accounts())

@accounts.route('/accounts/search', methods=['GET'])
def search_accounts():
    args = request.args
    return jsonify(Accounts().search(args.get('status', default=None, type=str), args.get('service_id', default=None, type=str)))

@accounts.route('/accounts/<id>', methods=['PUT'])
def accounts_update(id):
    request_data = request.get_json()
    account = Accounts().get_by_id(id)
    account.name = request_data["name"]
    account.service_id = request_data["service_id"]
    account.status = request_data["status"]
    account.save()
    return jsonify({'message' : 'ok', 'account' : account.json()})

@accounts.route('/accounts/<id>', methods=['DELETE'])
def sccounts_delete(id):
    account = Accounts().get_by_id(id)
    account.delete()
    return jsonify({'message' : 'ok'})