from flask import Flask
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from config import config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config.from_object(config['development'])

    migrate = Migrate(app, db)

    db.init_app(app)
    
    from services import services as routes_blueprint
    app.register_blueprint(routes_blueprint)
    
    from accounts import accounts as routes_blueprint
    app.register_blueprint(routes_blueprint)

    return app