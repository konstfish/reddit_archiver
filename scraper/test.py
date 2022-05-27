# -*- coding: utf-8 -*-

"""
praw based scraper
"""

import praw
import requests
import json
#import pymongo
import time
import json 

url = 'http://127.0.0.1:2701/'

#mdbc = pymongo.MongoClient('mongodb://database:27017/')
#mdb = mdbc["reddit"]
#db_subreddits = mdb['subreddits']
#db_images = mdb['images']

response = requests.get((url + 'sub/getSubreddits'),headers={})
print(response.text)

print()
print()
print()
print()

response = requests.get((url + 'image/getImages'),
data={
    'subreddit': "me_irl",
},
headers={})

print(response.text)

