import sys
import requests
import json
from two1.wallet import Wallet
from two1.bitserv.flask import Payment
# provider = TwentyOneProvider()
# sudo pip install requests
# If you don't have pip, brew install pip

# Indentation is python's form of a bracket
# for/while loops and ifs require a :
# If's don't require ()
# Exmaple:
# if a == b:
#   do stuff
# elif c == d:
#   do other stuff
# else:
#   default stuff

# in this file we want to make a get request to our own server,
# which paays us some amount of 'tip' for using our service, and our server will then make a request
# to a 21 module that costs money, and we send the result back to the user



def searchFor( parameters ):
  url = serviceUrl
  r = requests.get(url=url)
  return r.headers['price']



# use = json.loads(sys.stdin)

# print provider
# ret = ''
# for data in sys.stdin:
#   ret = ret + data
# ret = json.loads(ret)
# for searchString in ret:
#   print searchFor(searchString)
  # for service in json.loads(data):
  #   print json.dumps(str(checkService(service.values()[0].encode('utf-8'))), separators=(',',':'))
