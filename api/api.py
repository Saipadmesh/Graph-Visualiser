import time
from graph import *
from flask import Flask
from flask_cors import CORS
from flask import request,jsonify


app = Flask(__name__,static_folder='../')
CORS(app)


@app.route('/nodelist')
def get_node_names():
    return list_nodes()

@app.route('/addcon', methods = ['POST'],strict_slashes=False)
def result():
    data = request.json
    if data:
        check = add_connection(data['node1'],data['node2'])
        message = ""
        if(check):
            message = "Connection already exists"
        else:
            message = "Connection successfully added"
       #name1 = str(data['name1'][0])
        return {"check_var":check,"message":message}
    return jsonify("No information is given")
