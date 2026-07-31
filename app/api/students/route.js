import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/** Path to the local JSON "database" */
const DB_PATH = path.join(process.cwd(), 'data', 'students.json');

/** Read all students from the JSON file */
function readStudents() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/** Write students array back to the JSON file */
function writeStudents(students) {
  fs.writeFileSync(DB_PATH, JSON.stringify(students, null, 2), 'utf-8');
}

/**
 * GET /api/students
 * Returns all students (passwords stripped for security unless admin param)
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';
    const admin = searchParams.get('admin') === 'true';

    let students = readStudents();

    // Filter by search query
    if (query) {
      students = students.filter(
        (s) =>
          s.id.toLowerCase().includes(query) ||
          s.name.toLowerCase().includes(query) ||
          s.exam.toLowerCase().includes(query)
      );
    }

    // Strip passwords for non-admin requests
    if (!admin) {
      students = students.map(({ password, ...rest }) => rest);
    }

    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to read students' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/students
 * Add a new student to the database
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const students = readStudents();

    // Validate required fields
    const required = ['id', 'password', 'name', 'exam', 'score', 'total', 'grade'];
    for (const field of required) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check for duplicate ID
    if (students.find((s) => s.id === String(body.id))) {
      return NextResponse.json(
        { success: false, error: 'Student ID already exists' },
        { status: 409 }
      );
    }

    const newStudent = {
      id: String(body.id),
      password: String(body.password),
      name: body.name,
      phone: body.phone || '',
      exam: body.exam,
      score: Number(body.score),
      total: Number(body.total),
      grade: body.grade,
      rank: Number(body.rank) || 0,
      message: body.message || '',
    };

    students.push(newStudent);
    writeStudents(students);

    return NextResponse.json({ success: true, data: newStudent }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add student' },
      { status: 500 }
    );
  }
}
