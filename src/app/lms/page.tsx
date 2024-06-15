import { api } from "@/trpc/server";

import { CoursesPage } from "@/components/dashboard/courses-page";

export default async function Page() {
  const courses = await api.course.getAllCourses();

  return (
    <section className=' mt-20 w-full '>
      <h1 className='mb-6 border-b-2 font-medium'>Dashboard</h1>
      <div className='ml-6'>
        <div className='mb-4'>
          <h2 className=' mb-2 border-b-2 font-normal'>
            Cursos publicados{" "}
            <span className='font-medium'>{courses.info.count}</span>
          </h2>
          <CoursesPage />
          <p>No hay cursos para mostrar</p>
        </div>
        <div>
          <h2 className=' mb-2 border-b-2 font-normal'>
            Cursos no publicados <span className='font-medium'>(0)</span>
          </h2>
          <p>No hay cursos para mostrar</p>
        </div>
      </div>
    </section>
  );
}
