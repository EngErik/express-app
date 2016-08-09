var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName : String,
    lastName : String,
    email : {
      type : String,
      index : true,
      match : /.+\@.+\..+/
    },
    website : {
      type : String,
      get : function(url) {
        if(!url) {
          return url;
        } else {
          if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
            url = 'http://' + url;
          }

          return url;
        }
      }
    },
    userName : {
      type : String,
      trim : true,
      unique : true,
      required : true
    },
    password : {
      type : String,
      validate : [
        function(password) {
          return password.length >= 6;
        },
        'Password should be longer!'
      ]
    },
    created : {
      type : Date,
      default: Date.now
    },
    role : {
      type : String,
      enum : ['Admin', 'Owner', 'User']
    }
});

UserSchema.virtual('fullname').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function() {
  var splitName = fullname.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('User', UserSchema);
