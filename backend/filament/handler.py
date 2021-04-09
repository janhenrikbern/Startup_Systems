import json
import os, sys

import cloverly
from api_util import (
    create_response, 
    get_path_list,
    verify_user
)

def app(event, context):

    if event["httpMethod"] == 'OPTIONS':
        return {"statusCode": 200, "headers": headers}
        
    path = get_path_list(event)

    if path[0] == "whoami" and event["httpMethod"] == "GET":
        return create_response(200, body={"message": "jhb353"})

    elif path[0] == "carbon":
        userid = None
        try:
            userid = verify_user(event)
        except:
            print("!!! Encountered error during token verification !!!")
            print(sys.exc_info()[0])
            return create_response(401, body={"message": "Can't verify user."})
            
        if event["httpMethod"] == "GET":
            if len(path) > 1 and int(path[1]) > 0:
                res = cloverly.get_estimate_carbon(path[1])
                return create_response(200, body=res)
            else:
                return create_response(400, body={"message": "No offset uuid provided"})
        
        if event["httpMethod"] == "POST":
            body = json.loads(event["body"])
            if body["type"] == "carbon":
                carbon_usage = body["usage"]
                carbon_units = body["units"]
                res = cloverly.get_estimate_carbon(int(carbon_usage), carbon_units)
                return create_response(200, body=res)
            return create_response(200)
    
    else:
        return create_response(404)
