import flask
import os
import importlib

app = flask.Flask(__name__, template_folder="templates")
root_dir = os.path.dirname(os.path.abspath(__file__))

for route_file in os.listdir("routes"):
    if route_file.endswith(".py"):
        lib = importlib.import_module("routes." + route_file[:-3])
        app.register_blueprint(lib.blueprint)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_resource(path):

    if "data.json" in path:
        return "stop trying to cheat, you sneeky"

    if path != "" and os.path.exists(os.path.join(root_dir, path)):
        return flask.send_from_directory(root_dir, path)
    return flask.send_from_directory(root_dir, "index.html")