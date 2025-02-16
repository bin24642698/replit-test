import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertChapterSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express) {
  // Project routes
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const project = await storage.getProject(id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  });

  app.post("/api/projects", async (req, res) => {
    const parsed = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(parsed);
    res.json(project);
  });

  app.delete("/api/projects/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteProject(id);
    res.status(204).end();
  });

  // Chapter routes
  app.get("/api/projects/:id/chapters", async (req, res) => {
    const projectId = parseInt(req.params.id);
    const chapters = await storage.getChapters(projectId);
    res.json(chapters);
  });

  app.get("/api/chapters/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const chapter = await storage.getChapter(id);
    if (!chapter) {
      res.status(404).json({ message: "Chapter not found" });
      return;
    }
    res.json(chapter);
  });

  app.post("/api/projects/:id/chapters", async (req, res) => {
    const projectId = parseInt(req.params.id);
    const parsed = insertChapterSchema.parse({ ...req.body, projectId });
    const chapter = await storage.createChapter(parsed);
    res.json(chapter);
  });

  app.patch("/api/chapters/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const updateSchema = insertChapterSchema.partial();
    const parsed = updateSchema.parse(req.body);
    const chapter = await storage.updateChapter(id, parsed);
    res.json(chapter);
  });

  app.delete("/api/chapters/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteChapter(id);
    res.status(204).end();
  });

  return createServer(app);
}