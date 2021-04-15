import requests
import json
import os


def get_api_key():
    is_production = os.getenv("IS_PRODUCTION", False)
    ### TODO: Uncomment when production is enabled on cloverly
    # return os.getenv("CLOVERY_PUBLIC_KEY") if is_production else os.getenv("CLOVERLY_SANDBOX_KEY")
    return os.getenv("CLOVERLY_SANDBOX_KEY") if is_production else os.getenv("CLOVERLY_SANDBOX_KEY")

""" List applicable matches
curl https://api.cloverly.com/2021-04-beta/offsets \
-H "Content-type: application/json" \
-H "Authorization: Bearer private_key:47800ea0ee541b4c
"""

""" Get details for specific offset
curl https://api.cloverly.com/2019-03-beta/offsets/:offset_slug \
-H "Content-type: application/json" \
-H "Authorization: Bearer public_key:47800ea0ee541b4c"
"""

""" List offsets of certain type
curl https://api.cloverly.com/2019-03-beta/offset-types \
-H "Content-type: application/json" \
-H "Authorization: Bearer public_key:47800ea0ee541b4c"

Find matches close to location and by type
1. "offset_match": {"type": "solar", "location":{"postal_code":"94043","country":"US"}
2. "offset_match": {"type": "solar", "location":{"latlng": [41.1609216,-76.6826642]}
3. "offset_match": {"type": "biomass"}
4. "offset_match": {"slug": "arcata-city-forest-barnum-tract-f07113"}
"""

""" Get estimate and fix price
curl https://api.cloverly.com/2019-03-beta/estimates/carbon \
-X POST \
-d '{"weight":{"value":35,"units":"kg"}}' \
-H "Content-type: application/json" \
-H "Authorization: Bearer public_key:47800ea0ee541b4c"
"""

def get_estimate_carbon(amount, units="kg"):
    url = "https://api.cloverly.com/2019-03-beta/estimates/carbon"
    body = {
        "weight": {
            "value": int(amount) if amount > 0 else 1,
            "units": units
        }
    }
    headers = {
        "Authorization": "Bearer " + get_api_key(),
        "Content-type": "application/json"
    }
    res = requests.post(url, headers=headers, data=json.dumps(body))
    data = json.loads(res.content)
    body = {
        "name": data["offset"]["pretty_name"],
        "offset_amount": data["equivalent_carbon_in_kg"],
        "cost": data["cost"],
        "details": data["offset"],
        "url": data["pretty_url"]
    }
    return body


""" Get electricity offset
curl https://api.cloverly.com/2019-03-beta/purchases/electricity \
-X POST \
-d '{"energy":{"value":200,"units":"kwh"}}' \
-H "Content-type: application/json" \
-H "Authorization: Bearer public_key:47800ea0ee541b4c"
"""

def get_estimate_electricity(amount, units="wh"):
    body = {
        "energy": {
            "value": amount,
            "units": units
        }
    }
    res = requests.get(
        "https://api.cloverly.com/2019-03-beta/estimates/electricity"
    )
    return res

""" Purchase estimate
curl https://api.cloverly.com/2019-03-beta/purchases \
  -X POST \
  -d '{"estimate_slug": "generated-slug-estimate"}' \
  -H "Content-type: application/json" \
  -H "Authorization: Bearer private_key:acb5a14fc34ea2d0"
"""

""" Cancel offset purchase
curl https://api.cloverly.com/2019-03-beta/purchases/:purchase_slug \
-X DELETE \
-H "Content-type: application/json" \
-H "Authorization: Bearer public_key:47800ea0ee541b4c"
"""

""" View purchase
curl https://api.cloverly.com/2019-03-beta/purchases/generated-purchase-slug \
  -H "Content-type: application/json" \
  -H "Authorization: Bearer private_key:acb5a14fc34ea2d0"
"""