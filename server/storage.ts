import { type Project, type InsertProject, type Chapter, type InsertChapter } from "@shared/schema";

export interface IStorage {
  // Project operations
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | null>;
  createProject(project: InsertProject): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Chapter operations
  getChapters(projectId: number): Promise<Chapter[]>;
  getChapter(id: number): Promise<Chapter | null>;
  createChapter(chapter: InsertChapter): Promise<Chapter>;
  updateChapter(id: number, data: Partial<InsertChapter>): Promise<Chapter>;
  deleteChapter(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private chapters: Map<number, Chapter>;
  private currentProjectId: number;
  private currentChapterId: number;

  constructor() {
    this.projects = new Map();
    this.chapters = new Map();
    this.currentProjectId = 1;
    this.currentChapterId = 1;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | null> {
    return this.projects.get(id) || null;
  }

  async createProject(projectData: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const now = new Date();
    const project: Project = {
      ...projectData,
      id,
      createdAt: now,
    };
    this.projects.set(id, project);
    return project;
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
    // Delete associated chapters
    const chapterIds = Array.from(this.chapters.entries())
      .filter(([_, chapter]) => chapter.projectId === id)
      .map(([id]) => id);

    chapterIds.forEach(id => this.chapters.delete(id));
  }

  async getChapters(projectId: number): Promise<Chapter[]> {
    return Array.from(this.chapters.values())
      .filter(chapter => chapter.projectId === projectId)
      .sort((a, b) => a.order - b.order);
  }

  async getChapter(id: number): Promise<Chapter | null> {
    return this.chapters.get(id) || null;
  }

  async createChapter(chapterData: InsertChapter): Promise<Chapter> {
    const id = this.currentChapterId++;
    const now = new Date();
    const chapter: Chapter = {
      ...chapterData,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.chapters.set(id, chapter);
    return chapter;
  }

  async updateChapter(id: number, data: Partial<InsertChapter>): Promise<Chapter> {
    const chapter = this.chapters.get(id);
    if (!chapter) throw new Error("Chapter not found");

    const updated: Chapter = {
      ...chapter,
      ...data,
      updatedAt: new Date(),
    };
    this.chapters.set(id, updated);
    return updated;
  }

  async deleteChapter(id: number): Promise<void> {
    this.chapters.delete(id);
  }
}

export const storage = new MemStorage();