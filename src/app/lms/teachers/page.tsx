import { api } from "@/trpc/server";

import { columns } from "@/components/table/columns/teacher-columns";
import TableComponent from "@/components/table/table-component";

export default async function PageTeacher() {
  const data = await api.user.getAllTeachers();
  return (
    <>
      <h1 className='text-xl'>Profesores</h1>
      <section className='mt-8 '>
        <TableComponent data={data.results} columns={columns} />
      </section>
    </>
  );
}
