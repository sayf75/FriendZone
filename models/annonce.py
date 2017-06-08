from db import db

class AnnonceModel(db.Model):
    __tablename__ = 'annonces'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    description = db.Column(db.String(140))
    theme = db.Column(db.String(30))
    # price = db.Column(db.Float(precision=2))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    store = db.relationship('UserModel')

    def __init__(self, name, theme, description, user_id):
        self.name = name
        self.theme = theme
        self.description = description
        self.user_id = user_id

    def json(self):
        return {'name': self.name, 'theme': self.theme, 'description': self.description, 'user_id': self.user_id}

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
