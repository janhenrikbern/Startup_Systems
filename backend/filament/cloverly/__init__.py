import requests
import json


SECRETS = {
    "SANDBOX_KEY": "private_key:acb5a14fc34ea2d0",
    "PUBLIC_KEY": "public_key:a285e33af7f4acfb"
}

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
            "value": amount,
            "units": units
        }
    }
    headers = {
        "Authorization": "Bearer " + SECRETS["SANDBOX_KEY"],
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
        "https://api.cloverly.com/2019-03-beta/estimates/carbon"
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