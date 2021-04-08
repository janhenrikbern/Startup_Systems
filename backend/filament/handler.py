import json
import os
from google.oauth2 import id_token
from google.auth.transport import requests

import cloverly

headers = {
  'Access-Control-Allow-Origin': '*'
}


def verify_token(token):
    request = requests.Request()
    # token would come from the header
    id_info = id_token.verify_firebase_token(token, request)

    userid = id_info['sub']
    print(userid)

def get_test_data(id):
    filename = os.path.join('static', 'test.json')
    with open(filename) as file:
        data = json.load(file)

    data["fileID"] = int(id)
    return data

def app(event, context):
    path = event["pathParameters"]["proxy"].split('/')

    if event["httpMethod"] == 'OPTIONS':
        return {"statusCode": 200, "headers": headers}
        

    if event["path"] == "/whoami" and event["httpMethod"] == "GET":
        body = {
            "message": "jhb353"
        }
    elif path[0] == "carbon" and event["httpMethod"] == "GET":
        token = event["headers"]["Authorization"]
        verify_token(token)
        if len(path) > 1 and int(path[1]) > 0:
            body = cloverly.get_estimate_carbon(path[1])
        else:
            body = get_test_data(-1)
    else:
        body = {
            "input": event
        }

    response = {
        "headers": headers,
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response
