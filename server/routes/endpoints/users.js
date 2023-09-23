import sql from "../../db.js";

import bcrypt from "bcrypt";
import pgPromise from "pg-promise";
const pgp = pgPromise();
const connectionOptions = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};
const db = pgp(connectionOptions);
let routes = (app) => {
  // API to get all users
  app.get("/api/users", async (req, res) => {
    try {
      const users = await sql`SELECT * FROM users`;
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).send("Internal server error");
    }
  });

  // API to create a new user
  app.post("/api/user", async (req, res) => {
    const { firstname, lastname, email, password, med_history } = req.body;
    if (!password || !firstname || !lastname || !email || !med_history) {
      return res.status(400).json({
        error: `Please fill missing required fields`,
      });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    try {
      const existingUser = await sql`
            SELECT * FROM users WHERE email = ${email}
          `;

      if (existingUser && existingUser.length > 0) {
        return res.status(409).json({ error: "Email is already in use" });
      }

      if (!password.match(passwordRegex)) {
        return res.status(400).json({
          error: `Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.`,
        });
      }

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = await sql`
            INSERT INTO users (firstname, lastname, email, password, med_history)
            VALUES (${firstname}, ${lastname}, ${email}, ${passwordHash}, ${med_history})
            RETURNING *
          `;

      res.status(201).json(newUser[0]);
    } catch (error) {
      //   console.error("Error creating user:", error);
      res.status(500).send("Internal server error");
    }
  });

  // to login
  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await sql`
          SELECT * FROM users WHERE email = ${email}
        `;
      if (!existingUser || existingUser.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const user = existingUser[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      await sql`
          UPDATE users SET onlineStatus = 1 WHERE id = ${user.id}
        `;
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

  // logout user
  app.post("/api/logout", async (req, res) => {
    const { userId } = req.body;

    try {
      await sql`
          UPDATE users SET onlineStatus = 0 WHERE id = ${userId}
        `;
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });

  // API to update a user
  app.put("/api/user/:id", async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, password } = req.body;

    try {
      const updateUser = await sql`
          UPDATE users
          SET firstname = ${firstname}, lastname = ${lastname}, email = ${email}, password = ${password}
          WHERE id = ${id}
          RETURNING *
        `;

      if (updateUser && updateUser.length > 0) {
        res.status(200).json(updateUser[0]);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).send("Internal server error");
    }
  });

  // API to delete a user
  app.delete("/api/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const deleteUser =
        await sql`DELETE FROM users WHERE id = ${id} RETURNING *`;

      if (deleteUser && deleteUser.length > 0) {
        res.status(200).json(deleteUser[0]);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).send("Internal server error");
    }
  });

  app.get("/api/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const user = await sql`
          SELECT * FROM users
          WHERE id = ${id}
        `;

      if (!user || user.length === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json(user[0]);
      }
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).send("Internal server error");
    }
  });

  app.post("/api/history", async (req, res) => {
    const { search, user_id } = req.body;
    try {
      const drug = await db.oneOrNone(
        `
            SELECT id, drugName, ingredients, brand, description, price
            FROM drugs
            WHERE drugName = $1
          `,
        [search]
      );
      if (!drug) {
        return res.status(404).json({ error: "Drug not found" });
      }
      const drug_id = drug.id;
      const drugIngredients = drug.ingredients;

      const results = await db.any(
        `
            SELECT *
            FROM drugs
            WHERE id <> $1 AND ingredients @> $2::jsonb
            ORDER BY price ASC
          `,
        [drug_id, JSON.stringify(drugIngredients)]
      );

      await sql`INSERT INTO history (drug_id, user_id, search, results) VALUES 
        (${drug_id}, ${user_id}, ${search}, ${results}) RETURNING *`;

      const history = {
        drug_id,
        user_id,
        search,
        results,
      };
      res.status(200).json({ drug, history });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  });

  app.get("/api/history/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
      const history = await db.any(
        `
            SELECT * FROM history
            WHERE user_id = $1
          `,
        [user_id]
      );

      res.status(200).json(history);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  });
};

export default routes;
