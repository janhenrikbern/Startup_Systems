import boto3
from botocore.config import Config
import json
import os


def print_error_and_proceed(fn):
    def wrapper_fn(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except Exception as e:
            print(f"!!! Unexpected error: {e}")
            raise e

    return wrapper_fn


def get_db():
    is_production = os.getenv("IS_PRODUCTION", False)
    print(
        f">>> Starting dynamodb on {'production' if is_production else 'local'} environment."
    )
    if is_production:
        config = Config(
            region_name="us-east-1",
            signature_version="v4",
            retries={"max_attempts": 3, "mode": "standard"},
        )
        dynamodb = boto3.resource("dynamodb", config=config)
    else:
        dynamodb = boto3.resource("dynamodb", endpoint_url="http://localhost:8000")

    return dynamodb


@print_error_and_proceed
def serialize(instance):
    return json.dumps(vars(instance))


@print_error_and_proceed
def create_table_entry(instance):
    """
    PUT method. Adds new entry to data table
    """
    dynamodb = get_db()

    table = dynamodb.Table(instance.table)
    table.put_item(Item=vars(instance))
    print(f"Added new entry to {instance.table}: {instance.id}")


@print_error_and_proceed
def get_table_entry(table, id):
    dynamodb = get_db()

    table = dynamodb.Table(table)
    response = table.get_item(Key={"id": id})
    try:
        return response["Item"]
    except KeyError:
        print("Instance with given id doesn't exist.")
        return None


@print_error_and_proceed
def update_table_entry(instance, element):
    dynamodb = get_db()

    table = dynamodb.Table(instance.table)
    table.update_item(
        Key={"id": instance.id},
        UpdateExpression=f"SET {element} = :val1",
        ExpressionAttributeValues={":val1": instance.__dict__[element]},
    )

    print(f"Updated {instance.table} instance {instance.id}.")
