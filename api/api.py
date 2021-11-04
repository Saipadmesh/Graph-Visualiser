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
def add_result():
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


@app.route('/delcon', methods = ['POST'],strict_slashes=False)
def del_result():
    data = request.json
    if data:
        check = del_connection(data['node1'],data['node2'])
        message = ""
        if(check):
            message = "Connection successfully deleted"
        else:
            message = "Connection does not exist"
       #name1 = str(data['name1'][0])
        return {"check_var":check,"message":message}
    return jsonify("No information is given")

@app.route('/addnode', methods = ['POST'],strict_slashes=False)
def addnode():
    data=request.json
    if data:
        add_node(data['node'])
        return {"message":"Node successfully added"}

@app.route('/delnode',methods=['POST'],strict_slashes=False)
def delnode():
    data=request.json
    if data:
        del_node(data['node'])
        return {'message':"Node successfully deleted"}

@app.route('/rellist')
def get_rel_names():
    rel = list_relationships()
    return {'relationships':rel}

