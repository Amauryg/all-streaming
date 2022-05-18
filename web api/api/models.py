from app import db
from sqlalchemy.orm import relationship

class Services(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    def save(self):
        if not self.id:
            db.session.add(self)
        db.session.commit()
    
    def json(self):
        return {'id': self.id, 'name': self.name}
    
    @staticmethod
    def get_all_services():
        return [Services.json(t) for t in Services.query.all()]

    @staticmethod
    def get_by_id(id):
        return Services.query.get(id)

    def delete(self):
        Services.query.filter_by(id=self.id).delete()
        db.session.commit()


class Accounts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    status = db.Column(db.String(50))
    service_id = db.Column(db.Integer, db.ForeignKey('services.id', ondelete='CASCADE'), nullable=False)
    service = relationship('Services', foreign_keys=[service_id])

    def save(self):
        if not self.id:
            db.session.add(self)
        db.session.commit()
    
    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'status' : self.status,
            'service_id' : self.service_id,
            'service': self.service.json(),
        }

    @staticmethod
    def search(status, service_id):
        if (status and service_id):
            # print('ambos')
            accounts = Accounts.query.filter_by(status=status, service_id=service_id)
        elif (status):
            # print('status')
            accounts = Accounts.query.filter_by(status=status)
        elif (service_id):
            # print('service_id')
            accounts = Accounts.query.filter_by(service_id=service_id)
        else:
            # print('ninguno')
            accounts = Accounts.query.all()
        return [Accounts.json(account) for account in accounts]

    @staticmethod
    def get_all_accounts():
        return [Accounts.json(account) for account in Accounts.query.all()]

    @staticmethod
    def get_by_id(id):
        return Accounts.query.get(id)

    def delete(self):
        Accounts.query.filter_by(id=self.id).delete()
        db.session.commit()