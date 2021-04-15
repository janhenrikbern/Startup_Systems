import boto3
import argparse

# Get the service resource.
def get_db(is_production):
    print(f">>> Starting dynamodb for {'production' if is_production else 'local'} environment.")
    if is_production:
        dynamodb = boto3.resource('dynamodb')
    else:
        dynamodb = boto3.resource('dynamodb', endpoint_url="http://localhost:8000")
    return dynamodb

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('--production', default=False, type=bool, help='create table on production db.')
args = parser.parse_args()

dynamodb = get_db(args.production)
# Create the DynamoDB table.
table = dynamodb.create_table(
    TableName='users',
    KeySchema=[
        {
            'AttributeName': 'id',
            'KeyType': 'HASH'
        }
    ],
    AttributeDefinitions=[
        {
            'AttributeName': 'id',
            'AttributeType': 'S'
        } 
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 1,
        'WriteCapacityUnits': 1
    }
)

# Wait until the table exists.
table.meta.client.get_waiter('table_exists').wait(TableName='users')

# Print out some data about the table.
print(f"Created new dynamoDB table. Current item count: {table.item_count}")