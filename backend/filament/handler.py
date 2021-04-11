import json
import os, sys

import cloverly
from api_util import (
    create_response, 
    get_path_list,
    verify_user
)
from data_models.users import User

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
            user = User(userid)
            user.get_or_create()
        except:
            print("!!! Encountered error during token verification !!!")
            print(sys.exc_info()[0])
            return create_response(401, body={"message": "Can't verify user."})
        
        print(user.emissions)
        if event["httpMethod"] == "GET":
            print(f"Received GET request for user {userid}")
            res = cloverly.get_estimate_carbon(user.emissions)
            return create_response(200, body=res)
        
        if event["httpMethod"] == "POST":
            body = json.loads(event["body"])
            if body["type"] == "carbon":
                carbon_usage = body["usage"]
                carbon_units = body["units"]
                user.new_emission(float(carbon_usage), carbon_units)
                return create_response(200)
            return create_response(200)
    
    else:
        return create_response(404)
