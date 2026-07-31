import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/** Path to the local JSON "database" */
const DB_PATH = path.join(process.cwd(), 'data', 'students.json');

function readStudents() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeStudents(students) {
  fs.writeFileSync(DB_PATH, JSON.stringify(students, null, 2), 'utf-8');
}

/**
 * GET /api/students/[id]
 * Returns a single student by ID. Used for login verification.
 * Expects query param `password` for authentication.
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');
    const admin = searchParams.get('admin') === 'true';

    const students = readStudents();
    const student = students.find((s) => s.id === id);

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    // If admin request, return full data
    if (admin) {
      return NextResponse.json({ success: true, data: student });
    }

    // Validate password for student login
    if (password !== student.password) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Strip password from response
    const { password: _, ...studentData } = student;
    return NextResponse.json({ success: true, data: studentData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch student' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/students/[id]
 * Update an existing student's data
 */
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const students = readStudents();

    const index = students.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    // Update student, preserve id
    const updatedStudent = {
      ...students[index],
      ...body,
      id: id, // Cannot change ID via update
    };

    students[index] = updatedStudent;
    writeStudents(students);

    return NextResponse.json({ success: true, data: updatedStudent });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update student' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/students/[id]
 * Remove a student from the database
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const students = readStudents();

    const index = students.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    const deleted = students[index];
    students.splice(index, 1);
    writeStudents(students);

    return NextResponse.json({ success: true, data: deleted });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete student' },
      { status: 500 }
    );
  }
}
