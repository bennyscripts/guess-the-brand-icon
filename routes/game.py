import flask
import json

blueprint = flask.Blueprint("game", __name__)

@blueprint.route("/game")
def game():
    data = json.load(open("assets/data.json", "r"))
    return flask.render_template("game.html", data=json.dumps(data))