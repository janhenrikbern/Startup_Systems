import json
import os
from google.oauth2 import id_token
from google.auth.transport import requests


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

def hello(event, context):
    path = event["pathParameters"]["proxy"].split('/')

    if event["path"] == "/whoami" and event["httpMethod"] == "GET":
        body = {
            "message": "jhb353"
        }
    elif path[0] == "carbon" and event["httpMethod"] == "GET":
        token = event["headers"]["Authorization"]
        verify_token(token)
        if len(path) > 1:
            body = get_test_data(path[1])
        else:
            body = get_test_data(-1)
    else:
        body = {
            "input": event
        }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response

    # Use this code if you don't use the http event with the LAMBDA-PROXY
    # integration
    """
    return {
        "message": "Go Serverless v1.0! Your function executed successfully!",
        "event": event
    }
    """
