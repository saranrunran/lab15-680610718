"use client";

import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent } from "@/lib/mock-data";

export default function Enrollment() {
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [enrolledAtMap, setEnrolledAtMap] = useState<Record<string, string>>({});

  const handleEnrollSuccess = (courseId: string) => {
    setEnrolledIds((prev) => [...prev, courseId]);
    setEnrolledAtMap((prev) => ({
      ...prev,
      [courseId]: new Date().toTimeString().split(" ")[0],
    }));
  };

  const handleUnenroll = (courseId: string) => {
    setEnrolledIds((prev) => prev.filter((id) => id !== courseId));
    setEnrolledAtMap((prev) => {
      const next = { ...prev };
      delete next[courseId];
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-gray-500 text-sm">Saranporn Putsadee (680610718)</p>
        </div>
        <RegisterDialog
          enrolledCourseIds={enrolledIds}
          onEnrollSuccess={handleEnrollSuccess}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            isEnrolled={enrolledIds.includes(course.courseId)}
            enrolledAt={enrolledAtMap[course.courseId]}
            onUnenroll={handleUnenroll}
          />
        ))}
      </div>
    </div>
  );
}