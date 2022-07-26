//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistdb");

const itemschema = {
  name : String
};
const item = mongoose.model("item",itemschema);

const item1 = new item({
  name : "welcome to todo-list"
});

const item2 = new item({
  name : "hit the  + button to add a new item"
});

const item3 = new item({
  name : "<-- hit this to delete an item"
});

 const defaultitems = [item1,item2,item3];

// item.insertMany(defaultitems,function(err){
//   if(err)
//     console.log(err);
//   else
//     console.log("run success");
// });

app.get("/", function(req, res) {

      item.find({},function(err,founditems){

        if(founditems.length === 0){
            item.insertMany(defaultitems,function(err){
            if(err)
              console.log(err);
            else
              console.log("run success");
          });
          res.redirect("/");
        }
        else{
          res.render("list", {listTitle: "Today", newListItems: founditems});
        }
        
      });

  

});

app.post("/", function(req, res){

      const itemname = req.body.newItem;

      const itom = new item({
        name : itemname
      });

      itom.save();

      res.redirect("/");
    
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
