import sql from "../../db.js";
let routes = (app) => {
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
};

export default routes;
