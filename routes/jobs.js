import express from "express";
import testUser from "../middleware/testUser.js";

const jobsRouter = express.Router();
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
} from "../controllers/jobs.js";

jobsRouter.route("/").post(testUser, createJob).get(getAllJobs);
jobsRouter.route("/stats").get(showStats);

jobsRouter
  .route("/:id")
  .get(getJob)
  .delete(testUser, deleteJob)
  .patch(testUser, updateJob);

export default jobsRouter;
