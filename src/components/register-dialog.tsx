import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses, currentStudent } from "@/lib/mock-data";
import { Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterDialog() {
  const [open, setOpen] = useState(false);

  const getCurrentTime = () => {
    return new Date().toTimeString().split(" ")[0];
  };
  
  const [form, setForm] = useState({
    course: "",
    time: getCurrentTime(),
    fullName: `${currentStudent.firstName} ${currentStudent.lastName}`,
    program: currentStudent.program,
  });

  const selectedCourse = courses.find((c) => c.courseId === form.course);

  const fullCourseLabel = selectedCourse 
    ? `${selectedCourse.courseId} – ${selectedCourse.courseTitle}`
    : undefined;


  const rawCards = typeof window !== "undefined" ? localStorage.getItem("lab15.cards") : null;
  const prevCards = rawCards ? JSON.parse(rawCards) : [];

  const enrolledCourseIds = prevCards
    .filter((card: any) => card.isEnrolled)
    .map((card: any) => card.courseId);

  const availableCourses = courses.filter(
    (c) => !enrolledCourseIds.includes(c.courseId)
  );


  const [courseError, setCourseError] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setForm((prev) => ({ ...prev, time: getCurrentTime(), course: "" }));
      setCourseError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.course) {
      setCourseError(true);
      return;
    }

    const updatedCards = prevCards.map((card: any) => {
      if (card.courseId === form.course || card.id === form.course) {
        return {
          ...card,
          isEnrolled: true,
          studentName: form.fullName,
          program: form.program,
          registeredTime: form.time,
        };
      }
      return card;
    });

    localStorage.setItem("lab15.cards", JSON.stringify(updatedCards));

    setOpen(false);

    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="course">วิชา</Label>
            {/* ดักค่าใส่ form.course */}
            <Select
              value={form.course}
              onValueChange={(val) => {
                setForm({ ...form, course: val ?? "" });
                setCourseError(false);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกวิชา">
                  {fullCourseLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableCourses.map((c) => (
                    <SelectItem key={c.courseId} value={c.courseId}>
                      {c.courseId} – {c.courseTitle}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-input">เวลา</Label>
            <div className="relative">
              <Clock className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="bg-background pl-9"
                id="time-input"
                type="time"
                step="1"
                readOnly
                value={form.time}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input
              id="fullName"
              readOnly
              value={form.fullName}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input
              id="program"
              readOnly
              value={form.program}
            />
          </div>

          <DialogFooter>
            <Button 
              type="submit" 
              disabled={!form.course || form.course.trim() === ""}
            >ยืนยัน</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}