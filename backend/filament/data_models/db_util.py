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
    response = table.put_item(Item=vars(instance))
    print(f"Added new entry to {instance.table}: {instance.id}")

def get_table_entry(table, id, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")

    table = dynamodb.Table(table)
    response = table.get_item(Key={'id': id})
    try:
        return response['Item']
    except KeyError:
        print("Instance with given id doesn't exist.")
        return None

def update_table_entry(instance, element, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
        
    table = dynamodb.Table(instance.table)
    val = instance.__dict__[element]
    response = table.update_item(
        Key={'id': instance.id},
        UpdateExpression= f'SET {element} = :val1',
        ExpressionAttributeValues={
            ':val1': instance.__dict__[element]
        })
    
    print(f"Updated {instance.table} instance {instance.id}.")