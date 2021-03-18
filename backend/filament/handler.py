import json

def hello(event, context):
    if event["path"] == "/whoami" and event["httpMethod"] == "GET":
        body = {
            "message": "jhb353"
        }
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
