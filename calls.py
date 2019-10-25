import requests
import json

url = ("http://jservice.io/api/category?id=")
id = 1
data = []

'''
Use a changing url and offset to access all 
of the api's data. Did this to compensate for
technical issues with my computer and 
bundle install.
'''

# Loop through pages of api and add to list of dicts
while(id < 14280): #14280 category is empty, signifying end
    # Make request to changing url / api link
    response = requests.get(url + str(id))
    data.append(json.loads(response.text))
    id += 1

# Create a file for our new list of dictionaries
with open('clues.json', 'w') as f:
        json.dump(data, f)
