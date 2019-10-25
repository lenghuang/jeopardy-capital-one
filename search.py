import requests
import json
import objectpath

clues = []

search = input('Search a category: ')

json_file = open('clues.json', 'r')
data = json.load(json_file)

tree_obj = objectpath.Tree(data)
title = list(tree_obj.execute('$.*[@.title in ' + search + ' or ' + search + ' in @.title]'))

print(title)
