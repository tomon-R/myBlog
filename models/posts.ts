import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { Locale } from "./translation";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags?: string[];
  author?: string;
  readTime?: string;
  featured?: boolean;
}

export interface Post {
  slug: string;
  locale: Locale;
  metadata: PostMetadata;
  content: string;
}

// Recursively get all MDX files in a directory
function getMDXFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getMDXFiles(fullPath, baseDir));
    } else if (item.name.endsWith(".mdx")) {
      // Get relative path from base directory
      const relativePath = path.relative(baseDir, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

export function getAllPosts(locale: Locale): Post[] {
  // Get all MDX file paths recursively from locale directory
  const localeDir = path.join(postsDirectory, locale);
  const filePaths = getMDXFiles(localeDir);

  const allPostsData = filePaths.map((filePath) => {
    // Remove ".mdx" extension and convert to slug format
    const slug = filePath.replace(/\.mdx$/, "");

    // Read markdown file as string
    const fullPath = path.join(localeDir, filePath);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    return {
      slug,
      locale,
      metadata: data as PostMetadata,
      content,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.metadata.date < b.metadata.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(
  locale: Locale,
  slug: string | string[]
): Post | null {
  try {
    // Handle both string and array slugs
    const slugPath = Array.isArray(slug) ? slug.join("/") : slug;
    const localeDir = path.join(postsDirectory, locale);
    const fullPath = path.join(localeDir, `${slugPath}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      slug: slugPath,
      locale,
      metadata: data as PostMetadata,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllSlugs(locale: Locale): string[][] {
  const localeDir = path.join(postsDirectory, locale);
  const filePaths = getMDXFiles(localeDir);
  return filePaths.map((filePath) => {
    // Remove ".mdx" and split by path separator
    const slug = filePath.replace(/\.mdx$/, "");
    return slug.split(path.sep);
  });
}

export function getFeaturedPosts(locale: Locale): Post[] {
  const allPosts = getAllPosts(locale);
  return allPosts.filter((post) => post.metadata.featured === true);
}
