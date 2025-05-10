import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import AboutUs from "../components/AboutUs";
import Contact from "../components/Contact";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ projects, about }) {
  return (
    <div>
      <Hero />
      <Portfolio projects={projects} />
      <AboutUs about={about} />
      <Contact />
    </div>
  );
}

export async function getStaticProps() {
  const projectsDir = path.join(process.cwd(), "content/projects");
  const aboutFile = path.join(process.cwd(), "content/about.md");

  const projectFiles = await fs.readdir(projectsDir);
  const projects = await Promise.all(
    projectFiles.map(async (file) => {
      const filePath = path.join(projectsDir, file);
      const fileContent = await fs.readFile(filePath, "utf8");
      const { data } = matter(fileContent);
      return {
        slug: file.replace(".md", ""),
        title: data.title,
        description: data.description,
        image: data.image,
      };
    })
  );

  const aboutContent = await fs.readFile(aboutFile, "utf8");
  const { data: aboutData } = matter(aboutContent);
  const about = {
    description: aboutData.description,
    image: aboutData.image,
  };

  return {
    props: {
      projects,
      about,
    },
  };
}
