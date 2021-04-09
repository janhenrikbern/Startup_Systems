"""
API utility functions for streamlined handling of requests. 
"""
import json

def create_response(statusCode, body={}, headers={'Access-Control-Allow-Origin': '*'}):\
    return {
        "headers": headers,
        "statusCode": statusCode,
        "body": json.dumps(body)
    }


def get_path_list(event):
    return event["pathParameters"]["proxy"].split('/')


from google.oauth2 import id_token
from google.auth.transport import requests
def verify_user(event):
    token = event["headers"]["Authorization"]
    request = requests.Request()
    id_info = id_token.verify_firebase_token(token, request)
    userid = id_info['sub']
    print("Authenticated userid: " + str(userid))
    return userid


def get_test_data(id):
    filename = os.path.join('static', 'test.json')
    with open(filename) as file:
        data = json.load(file)

    data["fileID"] = int(id)
    return data