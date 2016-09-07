import sys
import requests
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

for data in sys.stdin:
  r = requests.get('http://www.python.org')
  # r = requests.post('http://localhost:3000', data)
  print resp.text


def callService( service ):
  return