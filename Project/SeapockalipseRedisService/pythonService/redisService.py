import sys
sys.path.append('../gen-py')


from leaderboard import Leaderboard
from leaderboard.ttypes import *



from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TJSONProtocol
from thrift.server import THttpServer
import SimpleHTTPServer
import BaseHTTPServer
import socket
import redis

r = redis.StrictRedis(host='localhost', port=6379,db=0)

class LeaderboardHandler:
	def __init__(self):
		self.log = {}

	def ping(self):
		print 'ping()'

	def setHighScore(self, playerName, highScore):
		print "about to set Highscore"
		print playerName
		print highScore
		r.zadd('seapockalipse',highScore,playerName)
		return "HighScore SET"
 
	def getTop20(self):
		print "getTop20"
		#self.send_header("Access-Control-Allow-Origin", "*")
		map = dict(r.zrange('seapockalipse',0,20,True,True)) 
		#Although zrange returns in descending order of score, dictionary object re-arranges everything based on Key . Hence ordering is done at javascript level
		return map
		

handler = LeaderboardHandler()
processor = Leaderboard.Processor(handler)
pfactory = TJSONProtocol.TJSONProtocolFactory() #pfactory = TBinaryProtocol.TBinaryProtocolFactory()
port = 30303
#server = THttpServer.THttpServer(processor, transport, tfactory, pfactory)
server = THttpServer.THttpServer(processor, ("localhost", port), pfactory)

print "Starting python server..."
server.serve()
print "done!"