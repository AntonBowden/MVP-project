var Task = require("./models/tasks");

module.exports = function(app) {

  // get the task list
  app.get("/api/tasks", function(req, res) {
    Task.find(function(err, tasks) {
      if (err) res.send(err);

      res.json(tasks); // return all tasks in JSON format
    });
  });


  app.post("/api/tasks", function(req, res) {
    // create a task
    Task.create(
      {
        text: req.body.text,
        done: false
      },
      function(err, task) {
        if (err) res.send(err);

        Task.find(function(err, tasks) {
          if (err) res.send(err);
          res.json(tasks);
        });
      }
    );
  });

    app.put("/api/tasks/:task_id", function(req, res) {
      console.log('>>> TICKED ', req.params.task_id);
    Task.update(
      {
        _id: req.params.task_id
      },
      { $set: { done: true }},
      function(err, task) {
        if (err) res.send(err);


        Task.find(function(err, tasks) {
          if (err) res.send(err);
          res.json(tasks);
        });
      }
    );
  });



  app.delete("/api/tasks/:task_id", function(req, res) {
    Task.remove(
      {
        _id: req.params.task_id
      },
      function(err, task) {
        if (err) res.send(err);

        // get the task list after deletion
        Task.find(function(err, tasks) {
          if (err) res.send(err);
          res.json(tasks);
        });
      }
    );
  });


  app.delete("/api/tasks/", function(req, res) {
    Task.remove(
      {
        done: true
      },
      function(err, task) {
        if (err) res.send(err);

        // get the task list after deletion
        Task.find(function(err, tasks) {
          if (err) res.send(err);
          res.json(tasks);
        });
      }
    );
  });






  // application -----------------------------
  // the default route that serves the index.html
  app.get("*", function(req, res) {
    res.sendFile("./public/index.html", { root: __dirname });
  });
};
