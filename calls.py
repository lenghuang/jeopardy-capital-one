import requests
import json
from sorts import merge_sort_dict

url = ("http://jservice.io/api/clues?offset=")
offset = 0
data = []

'''
Use a changing url and offset to access all 
of the api's data. Did this to compensate for
technical issues with my computer and 
bundle install.
'''

# Loop through pages of api and add to list of dicts
while(offset < 300): #156709
    # Make request to changing url / api link
    response = requests.get(url + str(offset))
    # Designate page as one increment of 100 clues
    page = json.loads(response.text)
    # Loop through list of dicts and add to our own
    for i in range (0, len(page)):
        data.append(page[i])
    offset += 100

# Sort our json list. Although highly inefficient 
# upfront, it will make later json access easier
merge_sort_dict(data)

# Create a file for our new list of dictionaries
with open('clues.json', 'w') as f:
        json.dump(data, f)