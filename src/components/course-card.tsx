import { useEffect, useState } from "react";
import type { Course, Student } from "@/lib/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  isEnrolled?: boolean;
};


export function CourseCard({ course, student, enrolledAt, isEnrolled }: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="text-base">
            {course.courseTitle}
          </CardTitle>
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
          </CardDescription>
        </div>

        {isEnrolled ? (
          <Badge variant="amber">ลงทะเบียนแล้ว</Badge>
        ) : (
          <Badge variant="purple">เปิดรับ</Badge>
        )}
      </CardHeader>
      
      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>ชื่อ นศ.: {student.firstName} {student.lastName}</p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
