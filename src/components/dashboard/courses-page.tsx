import { api } from "@/trpc/server";

import { CourseCard } from "./course-card";

export async function CoursesPage() {
  const courses = await api.course.getAllCourses();

  return (
    <div className='grid grid-cols-1 justify-between gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {courses.results.map((course) => (
        <CourseCard key={course.name} data={course} width={300} height={150} />
      ))}
    </div>
  );
}
