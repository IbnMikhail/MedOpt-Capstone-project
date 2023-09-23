import express from "express";
import sql from "./db.js";
import cors from "cors";
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
const app = express();

// import crypto from "crypto";
// const jwtSecret = crypto.randomBytes(32).toString('base64');

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/drugs", async (req, res) => {
  const drugs = await sql`SELECT * FROM drugs`;
  if (drugs) {
    res.status(200).send(drugs);
  } else {
    res.status(500).send("Error getting drugs");
  }
});

app.post("/api/drug", async (req, res) => {
  const { drugName, brand, price, description, ingredients } = req.body;
  const drugs =
    await sql`INSERT INTO drugs (drugName, brand, price, description, ingredients) VALUES 
    (${drugName}, ${brand}, ${price}, ${description}, ${ingredients}) RETURNING *`;
  if (drugs) {
    res.status(200).send(drugs);
  } else {
    res.status(500).send("Internal server Error");
  }
});

app.put("/api/drug/:id", async (req, res) => {
  const { id } = req.params;
  const { name, brand, price, description, ingredients } = req.body;

  try {
    const updateDrug = await sql`
      UPDATE drugs
      SET name = ${name}, brand = ${brand}, price = ${price}, description = ${description}, ingredients = ${ingredients}
      WHERE id = ${id}
      RETURNING *
    `;

    if (updateDrug && updateDrug.length > 0) {
      res.status(200).json(updateDrug[0]);
    } else {
      res.status(404).send("Drug not found");
    }
  } catch (error) {
    console.error("Error updating drug:", error);
    res.status(500).send("Internal server error");
  }
});

app.delete("/api/drug/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteDrug =
      await sql`DELETE FROM drugs WHERE id = ${id} RETURNING *`;

    if (deleteDrug && deleteDrug.length > 0) {
      res.status(200).json(deleteDrug[0]);
    } else {
      res.status(404).send("Drug not found");
    }
  } catch (error) {
    console.error("Error deleting drug:", error);
    res.status(500).send("Internal server error");
  }
});

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
  try {
    const existingUser = await sql`
        SELECT * FROM users WHERE email = ${email}
      `;
    if (existingUser && existingUser.length > 0) {
      return res.status(409).json({ error: "Email is already in use" });
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

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
