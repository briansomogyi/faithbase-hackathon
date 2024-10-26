import { Router } from "express";
import db from "../utils/dbFunctions.js";
import { AppError } from "../middleware/errorHandler.js";
const patientsRouter = Router();

const ai_module = "http://127.0.0.1:8000/analyze";

patientsRouter.get("/allPatients", async (_req, res) => {
  try {
    const patiens = await db.getPatients();
    res.status(200).json(patiens);
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new AppError("Database error", 500, error, true);
  }
});

patientsRouter.get("/patient/:id", async (req, res) => {
  try {
    const patient = await db.getAllPacientInfo(req.params.id);
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new AppError("Database error", 500, error, true);
  }
});

patientsRouter.post("/patient/updateSymptoms/:id", async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) {
      throw new AppError("Missing required fields", 400);
    }

    const response = await db.updatePatientSymptoms(req.params.id, symptoms);
    if (!response) {
      throw new AppError("Update failed", 404);
    }

    const patient = await db.getAllPacientInfo(req.params.id);
    if (!patient) {
      throw new AppError("Get patient failed", 404);
    }

    //Call AI module

    const ai_promt = fetch(ai_module, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patient }),
    });

    //

    res.status(200).json({ message: "Symptoms updated successfully", });
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new AppError("Database error", 500, error, true);
  }
});

patientsRouter.post("/patient/updateAiModelResponse/:id", async (req, res) => {
  try {
    const { aiModelResponse } = req.body;
    if (!aiModelResponse) {
      throw new AppError("Missing required fields", 400);
    }
    const patient = await db.updatePatientAiModelResponse(req.params.id, aiModelResponse);
    if (!patient) {
      throw new AppError("Update failed", 404);
    }
    res.status(200).json({ message: "Ai model response updated successfully", });
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new AppError("Database error", 500, error, true);
  }
})

export default patientsRouter;
