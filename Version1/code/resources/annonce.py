from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, current_identity
from models.annonce import AnnonceModel

class Annonce(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('theme',
        type=str,
        required=True,
        help="This field cannot be left blank!"
    )
    parser.add_argument('description',
        type=str,
        required=True,
        help="This field cannot be left blank!"
    )
    # parser.add_argument('user_id',
    #     type=int,
    #     required=True,
    #     help="Every item needs a user_id."
    # )

    @jwt_required()
    def get(self, name):
        annonce = AnnonceModel.find_by_name(name)
        if annonce:
            return annonce.json()
        return {'message': 'Annonce not found'}, 404

    @jwt_required()
    def post(self, name):
        if AnnonceModel.find_by_name(name):
            return {'message': "An annonce with name '{}' already exists.".format(name)}, 400

        data = Annonce.parser.parse_args()

        annonce = AnnonceModel(name, data['theme'], data['description'], current_identity.id)

        try:
            annonce.save_to_db()
        except:
            return {"message": "An error occurred inserting the annonce."}, 500

        return annonce.json(), 201

    def delete(self, name):
        annonce = AnnonceModel.find_by_name(name)
        if annonce:
            annonce.delete_from_db()

        return {'message': 'Annonce deleted'}

    def put(self, name):
        data = Annonce.parser.parse_args()

        annonce = AnnonceModel.find_by_name(name)

        if annonce:
            annonce.theme = data['theme']
        else:
            annonce = AnnonceModel(name, data['annonce'])

        annonce.save_to_db()

        return annonce.json()

class AnnonceList(Resource):
    @jwt_required()
    def get(self):
        return {'annonces': list(map(lambda x: x.json(), AnnonceModel.query.all()))}
