//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


//HELPER FUNCTIONS AND STRUCTURES

Leaderboard_setHighScore_args = function(args) {
  this.playerName = null;
  this.highScore = null;
  if (args) {
    if (args.playerName !== undefined) {
      this.playerName = args.playerName;
    }
    if (args.highScore !== undefined) {
      this.highScore = args.highScore;
    }
  }
};
Leaderboard_setHighScore_args.prototype = {};
Leaderboard_setHighScore_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.playerName = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.highScore = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Leaderboard_setHighScore_args.prototype.write = function(output) {
  output.writeStructBegin('Leaderboard_setHighScore_args');
  if (this.playerName !== null && this.playerName !== undefined) {
    output.writeFieldBegin('playerName', Thrift.Type.STRING, 1);
    output.writeString(this.playerName);
    output.writeFieldEnd();
  }
  if (this.highScore !== null && this.highScore !== undefined) {
    output.writeFieldBegin('highScore', Thrift.Type.I32, 2);
    output.writeI32(this.highScore);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Leaderboard_setHighScore_result = function(args) {
};
Leaderboard_setHighScore_result.prototype = {};
Leaderboard_setHighScore_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Leaderboard_setHighScore_result.prototype.write = function(output) {
  output.writeStructBegin('Leaderboard_setHighScore_result');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Leaderboard_getTop20_args = function(args) {
};
Leaderboard_getTop20_args.prototype = {};
Leaderboard_getTop20_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Leaderboard_getTop20_args.prototype.write = function(output) {
  output.writeStructBegin('Leaderboard_getTop20_args');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Leaderboard_getTop20_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
Leaderboard_getTop20_result.prototype = {};
Leaderboard_getTop20_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.MAP) {
        var _size0 = 0;
        var _rtmp34;
        this.success = {};
        var _ktype1 = 0;
        var _vtype2 = 0;
        _rtmp34 = input.readMapBegin();
        _ktype1 = _rtmp34.ktype;
        _vtype2 = _rtmp34.vtype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          if (_i5 > 0 ) {
            if (input.rstack.length > input.rpos[input.rpos.length -1] + 1) {
              input.rstack.pop();
            }
          }
          var key6 = null;
          var val7 = null;
          key6 = input.readString().value;
          val7 = input.readI32().value;
          this.success[key6] = val7;
        }
        input.readMapEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Leaderboard_getTop20_result.prototype.write = function(output) {
  output.writeStructBegin('Leaderboard_getTop20_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.MAP, 0);
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.I32, Thrift.objectLength(this.success));
    for (var kiter8 in this.success)
    {
      if (this.success.hasOwnProperty(kiter8))
      {
        var viter9 = this.success[kiter8];
        output.writeString(kiter8);
        output.writeI32(viter9);
      }
    }
    output.writeMapEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

LeaderboardClient = function(input, output) {
    this.input = input;
    this.output = (!output) ? input : output;
    this.seqid = 0;
};
LeaderboardClient.prototype = {};
LeaderboardClient.prototype.setHighScore = function(playerName, highScore, callback) {
  this.send_setHighScore(playerName, highScore, callback); 
};

LeaderboardClient.prototype.send_setHighScore = function(playerName, highScore, callback) {
  this.output.writeMessageBegin('setHighScore', Thrift.MessageType.ONEWAY, this.seqid);
  var args = new Leaderboard_setHighScore_args();
  args.playerName = playerName;
  args.highScore = highScore;
  args.write(this.output);
  this.output.writeMessageEnd();
  if (callback) {
    var self = this;
    this.output.getTransport().flush(true, function() {
      var result = null;
      try {
        result = self.recv_setHighScore();
      } catch (e) {
        result = e;
      }
      callback(result);
    });
  } else {
    return this.output.getTransport().flush();
  }
};
LeaderboardClient.prototype.getTop20 = function(callback) {
  this.send_getTop20(callback); 
  if (!callback) {
    return this.recv_getTop20();
  }
};

LeaderboardClient.prototype.send_getTop20 = function(callback) {
  this.output.writeMessageBegin('getTop20', Thrift.MessageType.CALL, this.seqid);
  var args = new Leaderboard_getTop20_args();
  args.write(this.output);
  this.output.writeMessageEnd();
  if (callback) {
    var self = this;
    this.output.getTransport().flush(true, function() {
      var result = null;
      try {
        result = self.recv_getTop20();
      } catch (e) {
        result = e;
      }
      callback(result);
    });
  } else {
    return this.output.getTransport().flush();
  }
};

LeaderboardClient.prototype.recv_getTop20 = function() {
  var ret = this.input.readMessageBegin();
  var fname = ret.fname;
  var mtype = ret.mtype;
  var rseqid = ret.rseqid;
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(this.input);
    this.input.readMessageEnd();
    throw x;
  }
  var result = new Leaderboard_getTop20_result();
  result.read(this.input);
  this.input.readMessageEnd();

  if (null !== result.success) {
    return result.success;
  }
  throw 'getTop20 failed: unknown result';
};
