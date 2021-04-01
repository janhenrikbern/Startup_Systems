import json
import os

def get_test_data(id):
    filename = os.path.join('static', 'test.json')
    with open(filename) as file:
        data = json.load(file)

    data["fileID"] = int(id)
    return data

def hello(event, context):
    path = event["pathParameters"]["proxy"].split('/')
    print(path)
    if event["path"] == "/whoami" and event["httpMethod"] == "GET":
        body = {
            "message": "jhb353"
        }
    elif path[0] == "energy" and event["httpMethod"] == "GET":
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
