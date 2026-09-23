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
};


export function CourseCard({ course, student, enrolledAt }: CourseCardProps) {
  const [cards, setCards] = useState([]);

  const loadCards = () => {
    const rawCards = localStorage.getItem("lab15.cards");
    if (rawCards) {
      setCards(JSON.parse(rawCards));
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const enrolledData = cards.find((c: any) => c.courseId === course.courseId);

  const isEnrolled = Boolean((enrolledData as any)?.isEnroll || (enrolledData as any)?.isEnrolled);
  
  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-4">
        <CardTitle className="text-base">
          {course.courseTitle}
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
          </CardDescription>
        </CardTitle>
        {isEnrolled ? (
          <Badge variant="amber">ลงทะเบียนแล้ว</Badge>
        ) : (
          <Badge variant="purple">เปิดรับ</Badge>
        )}
      </CardHeader>
      <CardContent className="flex items-end justify-between">
        <div className="text-xs text-muted-foreground">
          <p>
            ชื่อ นศ.: {student.firstName} {student.lastName}
          </p>
          <p>โปรแกรม: {student.program}</p>
          <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
        </div>
      </CardContent>
    </Card>
  );
}
