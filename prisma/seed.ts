import { faker } from "@faker-js/faker";
import { Level, PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

const listSchool = [
  { name: "Mi colegio 1", address: "15291 Nicolette Fields" },
  { name: "Mi colegio 2", address: "251 Meadow View" },
  { name: "Mi colegio 3", address: "381 Chapel Hill" },
];
const listCourses = [
  "Matemáticas",
  "Física",
  "Química",
  "Biología",
  "Historia",
  "Geografía",
  "Lengua y Literatura",
  "Arte",
  "Música",
  "Educación Física",
  "Informática",
  "Economía",
  "Psicología",
  "Sociología",
  "Filosofía",
  "Idiomas",
  "Cívica y Ética",
];

async function cleanup() {
  await prisma.activity.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.grade.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.school.deleteMany({});
}

async function main() {
  await cleanup();

  await prisma.school.createMany({
    data: listSchool,
  });

  const createdSchools = await prisma.school.findMany();

  await prisma.user.createMany({
    data: Array.from({ length: 10 }, () => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      imageUrl: faker.image.avatar(),
      role: faker.helpers.arrayElement([
        Role.ADMIN,
        Role.TEACHER,
        Role.STUDENT,
        Role.PARENT,
      ]),
      schoolId: faker.helpers.arrayElement(createdSchools).id,
    })),
  });

  const createdUsers = await prisma.user.findMany();

  await prisma.course.createMany({
    data: Array.from({ length: 7 }, () => ({
      name: faker.helpers.arrayElement(listCourses),
      imageUrl: faker.image.urlPicsumPhotos(),
      teacherId: faker.helpers.arrayElement(
        createdUsers.filter((user) => user.role === Role.TEACHER)
      ).id,
    })),
  });

  const createdCourses = await prisma.course.findMany();

  await prisma.grade.createMany({
    data: Array.from({ length: 3 }, () => ({
      name: faker.helpers.arrayElement(["1", "2", "3", "4", "5"]),
      level: faker.helpers.arrayElement([Level.PRIMARY, Level.SECONDARY]),
    })),
  });

  const createdGrades = await prisma.grade.findMany();

  await Promise.all(
    createdCourses.map((course) =>
      prisma.course.update({
        where: { id: course.id },
        data: { gradeId: faker.helpers.arrayElement(createdGrades).id },
      })
    )
  );

  await prisma.activity.createMany({
    data: Array.from({ length: 10 }, () => ({
      description: faker.lorem.sentence(),
      date: faker.date.future(),
      score: faker.number.float({ min: 0, max: 100 }),
      courseId: faker.helpers.arrayElement(createdCourses).id,
    })),
  });

  await prisma.post.createMany({
    data: Array.from({ length: 10 }, () => ({
      title: faker.lorem.sentence(),
      userId: faker.helpers.arrayElement(createdUsers).id,
    })),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
