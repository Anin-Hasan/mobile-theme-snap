import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import * as api from '@/api/user';
import { Skeleton } from './ui/skeleton';

interface ExamSelectionProps {
  onBack: () => void;
  onStartExam: (questions: api.Question[], options: api.ExamSetupOptions) => void;
}

export const ExamSelection: React.FC<ExamSelectionProps> = ({ onBack, onStartExam }) => {
  const [subjects, setSubjects] = useState<api.Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeLimit, setTimeLimit] = useState(15);
  const [negativeMarking, setNegativeMarking] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    api.getSubjectsAndChapters()
      .then(data => setSubjects(data))
      .catch(error => console.error("Failed to fetch subjects:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleSubjectChange = (subjectName: string, checked: boolean) => {
    const updatedSubjects = checked
      ? [...selectedSubjects, subjectName]
      : selectedSubjects.filter(s => s !== subjectName);
    setSelectedSubjects(updatedSubjects);
  };

  const handleChapterChange = (chapterName: string, checked: boolean) => {
    setSelectedChapters(checked
      ? [...selectedChapters, chapterName]
      : selectedChapters.filter(c => c !== chapterName)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSubjects.length === 0 || selectedChapters.length === 0) {
      toast({ variant: 'destructive', title: 'Invalid Selection', description: 'Please select at least one subject and chapter.' });
      return;
    }
    setIsSubmitting(true);
    const options: api.ExamSetupOptions = {
      subjects: selectedSubjects,
      chapters: selectedChapters,
      numQuestions,
      timeLimitMinutes: timeLimit,
      negativeMarking,
    };

    try {
      const questions = await api.startMockExam(options);
      if (questions.length > 0) {
        onStartExam(questions, options);
      }
    } catch (error) {
      console.error("Failed to start exam:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableChapters = subjects
    .filter(s => selectedSubjects.includes(s.name))
    .flatMap(s => s.chapters.map(chapter => ({ name: chapter, subject: s.name })));

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Create Mock Exam</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader><CardTitle>1. Select Subjects & Chapters</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="font-semibold mb-3 block">Subjects</Label>
                    <div className="space-y-2">
                      {loading ? Array(3).fill(0).map((_,i) => <Skeleton key={i} className="h-6 w-32 my-1"/>) :
                       subjects.map(s => (
                        <div key={s.id} className="flex items-center space-x-2">
                          <Checkbox id={s.id} checked={selectedSubjects.includes(s.name)} onCheckedChange={(c) => handleSubjectChange(s.name, !!c)} />
                          <Label htmlFor={s.id}>{s.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="font-semibold mb-3 block">Chapters</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {availableChapters.length > 0 ? (
                        availableChapters.map(c => (
                          <div key={`${c.subject}-${c.name}`} className="flex items-center space-x-2">
                            <Checkbox id={c.name} checked={selectedChapters.includes(c.name)} onCheckedChange={(ch) => handleChapterChange(c.name, !!ch)} />
                            <Label htmlFor={c.name}>{c.name}</Label>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Select a subject to see chapters.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader><CardTitle>2. Configure Exam</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="numQuestions">Number of Questions</Label>
                    <Input id="numQuestions" type="number" value={numQuestions} onChange={e => setNumQuestions(parseInt(e.target.value, 10))} min="1" max="50" />
                  </div>
                  <div>
                    <Label htmlFor="timeLimit">Total Time (minutes)</Label>
                    <Input id="timeLimit" type="number" value={timeLimit} onChange={e => setTimeLimit(parseInt(e.target.value, 10))} min="1" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="negativeMarking">Negative Marking (-0.25)</Label>
                    <Switch id="negativeMarking" checked={negativeMarking} onCheckedChange={setNegativeMarking} />
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || loading}>
                {isSubmitting ? 'Starting...' : 'Start Exam'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};