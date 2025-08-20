import React from 'react';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ExamResult, QuestionResult } from '@/api/user';
import { Button } from './ui/button';
import { MathRenderer } from './MathRenderer'; // <-- Import the new component

interface MockExamResultProps {
  examResult: ExamResult;
  onBack: () => void;
}

const ResultStat = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg text-center">
    <div className="text-xl sm:text-2xl font-bold">{value}</div>
    <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
  </div>
);

export const MockExamResult: React.FC<MockExamResultProps> = ({ examResult, onBack }) => {

  const getOptionStyle = (q: QuestionResult, optionIndex: number) => {
    const isCorrect = optionIndex === q.correctAnswerIndex;
    const isUserAnswer = optionIndex === q.userAnswerIndex;

    if (isCorrect) return 'border-green-500 bg-green-50 dark:bg-green-900/30';
    if (isUserAnswer && !q.isCorrect) return 'border-red-500 bg-red-50 dark:bg-red-900/30';
    return 'border-border';
  };
  
  const getQuestionStatusIcon = (q: QuestionResult) => {
      if(q.userAnswerIndex === null) return <EyeOff className="w-5 h-5 text-gray-500 shrink-0"/>;
      if (q.isCorrect) return <CheckCircle className="w-5 h-5 text-green-500 shrink-0"/>;
      return <XCircle className="w-5 h-5 text-red-500 shrink-0"/>;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
       <div className="max-w-4xl mx-auto">
        <header className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2 md:mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold">Exam Result</h1>
        </header>

        <Card className="mb-6">
            <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                <ResultStat label="Score" value={`${examResult.score} / ${examResult.totalMarks}`} />
                <ResultStat label="Rank" value={`#${examResult.rank}`} />
                <ResultStat label="Correct" value={examResult.correctCount} />
                <ResultStat label="Incorrect" value={examResult.incorrectCount} />
            </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Question Review</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
            {examResult.results.map((q, index) => (
                <AccordionItem value={`item-${index}`} key={q._id} className="bg-card border rounded-lg px-2 sm:px-4">
                    <AccordionTrigger>
                        <div className="flex items-center space-x-3 text-left">
                            {getQuestionStatusIcon(q)}
                            <div className="flex-1">
                               <span className="font-semibold pr-2">Q{index + 1}:</span>
                               <MathRenderer text={q.text} />
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                        <div className="space-y-2 mb-4">
                            {q.options.map((option, i) => (
                                <div key={option._id} className={`p-3 border rounded-md text-sm ${getOptionStyle(q, i)}`}>
                                    <MathRenderer text={option.text} />
                                    {option.image && <img src={option.image} alt="Option" className="mt-2 rounded-md max-w-xs h-auto" />}
                                </div>
                            ))}
                        </div>
                        {(q.explanation || q.explanationImage) && (
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="font-semibold mb-2 flex items-center"><AlertCircle className="w-4 h-4 mr-2"/>Explanation</h4>
                                {q.explanation && <p className="text-sm text-muted-foreground mb-2"><MathRenderer text={q.explanation} /></p>}
                                {q.explanationImage && <img src={q.explanationImage} alt="Explanation" className="rounded-md mt-2 max-w-full h-auto"/>}
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
       </div>
    </div>
  );
};