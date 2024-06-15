import { CoursesPage } from "@/components/dashboard/courses-page";

async function PageCourses() {
  return (
    <main className=''>
      <h1 className='text-xl'>Cursos</h1>
      <section className='mt-8'>
        <CoursesPage />
      </section>
    </main>
  );
}

export default PageCourses;
