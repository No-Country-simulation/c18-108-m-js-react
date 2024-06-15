import { api } from "@/trpc/server";

import { columns } from "@/components/table/columns/students.columns";
import TableComponent from "@/components/table/table-component";

export default async function PageStudents() {
  const data = await api.user.getAllStudents();
  return (
    <>
      <h1 className='text-xl'>Alumnos</h1>
      <section className='mt-8 '>
        <TableComponent data={data.results} columns={columns} />
      </section>
    </>
  );
}
