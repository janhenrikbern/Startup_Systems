from pprint import pprint
import boto3
import json


def get_db(is_local=True):
    if is_local:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
    else:
        dynamodb = boto3.resource('dynamodb')

    return dynamodb

def serialize(instance):
    return json.dumps(vars(instance))

def create_table_entry(instance, local=True):
    """
    PUT method. Adds new entry to data table
    """
    dynamodb = get_db()

    table = dynamodb.Table(instance.table)
    table.put_item(Item=vars(instance))
    print(f"Added new entry to {instance.table}: {instance.id}")

def get_table_entry(table, id, local=True):
    dynamodb = get_db()

    table = dynamodb.Table(table)
    response = table.get_item(Key={'id': id})
    try:
        return response['Item']
    except KeyError:
        print("Instance with given id doesn't exist.")
        return None

def update_table_entry(instance, element, local=True):
    dynamodb = get_db()
        
    table = dynamodb.Table(instance.table)
    table.update_item(
        Key={'id': instance.id},
        UpdateExpression= f'SET {element} = :val1',
        ExpressionAttributeValues={
            ':val1': instance.__dict__[element]
        })
    
    print(f"Updated {instance.table} instance {instance.id}.")