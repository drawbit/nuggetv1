import mysql from "mysql";
import async from "async";
import bcrypt from 'bcrypt';

const pool = mysql.createPool({
  connectionLimit: 100,
  host: __DEVELOPMENT__ ? 'localhost' : 'aa1l0pm8z8qihld.c8rc790xmppq.us-east-2.rds.amazonaws.com',
  user: 'sapy',
  password : __DEVELOPMENT__ ? '' : 'nugget123secretmysql',
  database: 'nugget_db',
  debug: __DEVELOPMENT__ ? false : false
});

const updatePasswordHash = (req) => {
  const hash = bcrypt.hashSync(req.body.password, 3); // 3 is salt round. 10 is secure but slow.
  //req.body.password = hash;
}

export function createDBconnection(callback) {
  pool.getConnection(function(err, connection) {
    if (err) {
      // if there is error, stop right away.
      // This will stop the async code execution and goes to last function.
      callback(true);
    } else {
      callback(null, connection);
    }
  });
}


export function handle_database(req, type, callback) {
  async.waterfall([
      createDBconnection,
      function(connection, callback) {
        let SQLquery;
        switch (type) {
          case "login":
            SQLquery = "SELECT user_name as name, user_id, account_type from allusers WHERE user_email='" + req.body.email + "' AND `user_password`='" + req.body.password + "'";
            break;
          case "checkEmail":
            SQLquery = "SELECT * from allusers WHERE user_email='" + req.body.email + "'";
            break;
          case "register":
            SQLquery = "INSERT into allusers(user_email,user_password,user_name, account_type) VALUES ('" + req.body.email + "','" + req.body.password + "','" + req.body.name + "','" + req.body.accounttype + "')";
            break;
          case "addStatus":
            SQLquery = "INSERT into user_status(user_id,user_status) VALUES (" + req.session.key["user_id"] + ",'" + req.body.status + "')";
            break;
          case "getStatus":
            SQLquery = "SELECT * FROM user_status WHERE user_id=" + req.session.key["user_id"];
            break;
          default:
            break;
        }
        callback(null, connection, SQLquery);
      },
      function(connection, SQLquery, callback) {
        connection.query(SQLquery, function(err, rows) {
          connection.release();
          if (!err) {
            if (type === "login") {
              callback(rows.length === 0 ? false : rows[0]);
            } else if (type === "getStatus") {
              callback(rows.length === 0 ? false : rows);
            } else if (type === "checkEmail") {
              callback(rows.length === 0 ? false : true);
            } else {
              callback(false);
            }
          } else {
            // if there is error, stop right away.
            // This will stop the async code execution and goes to last function.
            callback(true);
          }
        });
      }
    ],
    function(result) {
      // This function gets call after every async task finished.
      if (typeof(result) === "boolean" && result === true) {
        callback(null);
      } else {
        callback(result);
      }
    });
}

export function registerRoute(req,res){
	updatePasswordHash(req);
    handle_database(req,"checkEmail",function(response){
      if(response === null) {
        res.json({"error" : true, "message" : "This email is already present"});
      } else {
        handle_database(req,"register",function(response){
          if(response === null) {
            res.json({"error" : true , "message" : "Error while adding user."});
          } else {
            res.json({"error" : false, "message" : "Registered successfully.", "regSuccess": true});
          }
        });
      }
    });
}

export function signinRoute(req, res) {
  updatePasswordHash(req);
  handle_database(req, "login", function(response) {
    if (response === null) {
      res.json({ "error": "true", "message": "Database error occured" });
    } else {
      if (!response) {
        res.json({
          "error": "true",
          "message": "Login failed ! No such Username / Password is registered"
        });
      } else {
        req.session.user = response;
        res.json(response);
      }
    }
  });
}

export function logout(req, res) {
  if (req.session.user) {
    req.session.destroy(function() {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
}

export function fetchStatus(req,res){
  if(req.session.user) {
    handle_database(req,"getStatus",function(response){
      if(!response) {
        res.json({"error" : false, "message" : "There is no status to show."});
      } else {
        res.json({"error" : false, "message" : response});
      }
    });
  } else {
    res.json({"error" : true, "message" : "Please login first."});
  }
}

export function addStatus(req,res){
    if(req.session.user) {
      handle_database(req,"addStatus",function(response){
        if(!response) {
          res.json({"error" : false, "message" : "Status is added."});
        } else {
          res.json({"error" : false, "message" : "Error while adding Status"});
        }
      });
    } else {
      res.json({"error" : true, "message" : "Please login first."});
    }
}
