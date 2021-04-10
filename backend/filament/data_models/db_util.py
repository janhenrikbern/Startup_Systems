from pprint import pprint
import boto3
import json


def serialize(instance):
    return json.dumps(vars(instance))

def create_table_entry(instance, dynamodb=None):
    """
    PUT method. Adds new entry to data table
    """
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table(instance.table)
    response = table.put_item(instance.serialize())
    print(f"{response} Added new entry to {self.table}: {self.id}")

def get_table_entry(table, id, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table(table)
    response = table.get_item(Key={'id': id})
    return json.loads(response['Item'])