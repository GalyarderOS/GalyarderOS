
import { BookOpen, TrendingUp } from 'lucide-react';

interface KnowledgeSectionProps {
  notesCount: number;
  reflectionEntries: number;
  translations: {
    knowledge: string;
    notes: string;
    reflections: string;
  }
}

const KnowledgeSection = ({ notesCount, reflectionEntries, translations }: KnowledgeSectionProps) => {
  return (
    <div className="bg-white/50 dark:bg-slate-700/50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4 text-indigo-600" />
          <span className="font-semibold text-slate-800 dark:text-slate-100">{translations.knowledge}</span>
        </div>
        <TrendingUp className="h-4 w-4 text-green-600" />
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="font-bold text-slate-800 dark:text-slate-100">{notesCount === 0 ? 'N/A' : notesCount}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">{translations.notes}</div>
        </div>
        <div>
          <div className="font-bold text-slate-800 dark:text-slate-100">{reflectionEntries === 0 ? 'N/A' : reflectionEntries}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">{translations.reflections}</div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeSection;
