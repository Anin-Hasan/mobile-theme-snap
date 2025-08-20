import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import * as api from '@/api/user';
import { MathRenderer } from './MathRenderer'; // <-- Import the new component

interface QuizProps {
  questions: api.Question[];
  options: api.ExamSetupOptions;
  onSubmit: (result: api.ExamResult) => void;
  onBack: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, options, onSubmit, onBack }) => {
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [timeLeft, setTimeLeft] = useState(options.timeLimitMinutes * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timerRef.current!);
  }, []);

  const handleAnswerChange = (questionId: string, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };
  
  const handleSubmit = async () => {
    clearInterval(timerRef.current!);
    setIsSubmitting(true);
    const userAnswers: api.UserAnswer[] = questions.map(q => ({
      questionId: q._id,
      selectedOptionIndex: answers[q._id] ?? null,
    }));
    
    try {
      const result = await api.submitMockExam(questions, userAnswers, options);
      onSubmit(result);
    } catch(e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 py-4 mb-6">
          {/* Mobile-responsive header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-xl md:text-2xl font-bold text-center sm:text-left">Mock Exam In Progress</h1>
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-lg font-mono ${timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-muted'}`}>
              <Clock className="w-5 h-5" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
        </header>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <Card key={q._id}>
              <CardContent className="p-4 md:p-6">
                <div className="font-semibold mb-4 text-base leading-relaxed">
                  {index + 1}. <MathRenderer text={q.text} />
                </div>
                 {q.image && <img src={q.image} alt={`Question ${index+1}`} className="my-4 rounded-md max-w-full h-auto" />}
                <RadioGroup onValueChange={(val) => handleAnswerChange(q._id, parseInt(val, 10))}>
                  {q.options.map((option, i) => (
                    <div key={option._id} className="flex items-start space-x-3 p-2">
                      <RadioGroupItem value={i.toString()} id={`${q._id}-${i}`} className="mt-1" />
                      <Label htmlFor={`${q._id}-${i}`} className="flex-1 cursor-pointer mt-2">
                        <MathRenderer text={option.text} />
                        {option.image && <img src={option.image} alt={`Option ${i+1}`} className="mt-2 rounded-md max-w-xs h-auto" />}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- Mobile Floating Submit Button --- */}
        <div className="md:hidden fixed bottom-4 right-4 z-20">
            <Button size="lg" onClick={() => setIsAlertOpen(true)} disabled={isSubmitting} className="rounded-full shadow-lg h-14 w-32">
              {isSubmitting ? '...' : 'Submit'}
            </Button>
        </div>

        {/* --- Desktop Submit Button --- */}
        <footer className="mt-8 hidden md:flex justify-end">
          <Button size="lg" onClick={() => setIsAlertOpen(true)} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Exam'}
          </Button>
        </footer>

        {/* --- Shared Alert Dialog --- */}
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your exam will be graded immediately. You cannot change your answers after this.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit}>Yes, Submit</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
      </div>
    </div>
  );
};