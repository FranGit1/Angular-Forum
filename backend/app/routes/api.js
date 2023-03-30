module.exports = function (express, pool) {
  const apiRouter = express.Router();
  apiRouter.get("/", function (req, res) {
    res.json({ message: "Dobro dosli na nas API!" });
  });

  apiRouter
    .route("/users")
    .get(async function (req, res) {
      try {
        let conn = await pool.getConnection();
        let rows = await conn.query("SELECT * FROM users");
        conn.release();
        res.json({ status: "OK", users: rows });
      } catch (e) {
        console.log(e);
        return res.json({ code: 100, status: "Error with query" });
      }
    })
    .post(async function (req, res) {
      const user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        _id: req.body._id,
      };

      try {
        let conn = await pool.getConnection();
        let q = await conn.query("INSERT INTO users SET ?", user);
        conn.release();
        res.json({ status: "OK", insertId: q.insertId });
      } catch (e) {
        console.log(e);
        res.json({ status: "NOT OK" });
      }
    });

  apiRouter
    .route("/posts")
    .get(async function (req, res) {
      try {
        let conn = await pool.getConnection();
        let rows = await conn.query("SELECT * FROM posts");
        conn.release();
        res.json({ status: "OK", post: rows });
      } catch (e) {
        console.log(e);
        return res.json({ code: 100, status: "Error with query" });
      }
    })
    .post(async function (req, res) {
      try {
        let conn = await pool.getConnection();
        let q = await conn.query("INSERT INTO posts SET ?", req.body);
        conn.release();
        res.json({ status: "OK", insertId: q.insertId });
      } catch (e) {
        console.log(e);
        res.json({ status: "NOT OK" });
      }
    })
    .put(async function (req, res) {
      console.log(req.body);

      try {
        let conn = await pool.getConnection();
        let q = await conn.query("UPDATE posts SET ? WHERE _id = ?", [
          req.body,
          req.body._id,
        ]);
        conn.release();
        res.json({ status: "OK", changedRows: q.changedRows });
        console.log(q);
      } catch (e) {
        console.log(e);
        res.json({ status: "NOT OK" });
      }
    });

  apiRouter.route("/posts/:id").delete(async function (req, res) {
    try {
      let conn = await pool.getConnection();
      let q = await conn.query(
        "DELETE FROM posts WHERE _id = ?",
        req.params.id
      );
      conn.release();
      res.json({ status: "OK", affectedRows: q.affectedRows });
    } catch (e) {
      res.json({ status: "NOT OK" });
    }
  });

  return apiRouter;
};
