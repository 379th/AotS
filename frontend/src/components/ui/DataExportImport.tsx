import React, { useRef, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { exportAllData, importData, downloadFile, readFile } from '../../utils/dataExport';
import { clearAllJournalData, hasJournalData } from '../../utils/clearJournalData';
import { exportAllDataToPDF } from '../../utils/pdfExport';

interface DataExportImportProps {
  className?: string;
}

export const DataExportImport: React.FC<DataExportImportProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleExport = async () => {
    try {
      setIsExporting(true);
      setMessage('');
      
      const data = exportAllData();
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `aots-journal-${timestamp}.json`;
      
      downloadFile(data, filename);
      setMessage('Данные успешно экспортированы!');
    } catch (error) {
      setMessage('Ошибка экспорта данных');
      console.error('Ошибка экспорта:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsImporting(true);
      setMessage('');
      
      const content = await readFile(file);
      importData(content);
      setMessage('Данные успешно импортированы!');
      
      // Очищаем input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      setMessage('Ошибка импорта данных');
      console.error('Ошибка импорта:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleExportPDF = async () => {
    try {
      setIsExportingPDF(true);
      setMessage('');
      
      await exportAllDataToPDF();
      setMessage('PDF успешно создан!');
    } catch (error) {
      setMessage('Ошибка создания PDF');
      console.error('Ошибка экспорта PDF:', error);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Вы уверены, что хотите очистить все данные дневника? Это действие нельзя отменить.')) {
      try {
        setIsClearing(true);
        setMessage('');
        
        clearAllJournalData();
        setMessage('Все данные дневника очищены!');
      } catch (error) {
        setMessage('Ошибка при очистке данных');
        console.error('Ошибка очистки:', error);
      } finally {
        setIsClearing(false);
      }
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Кнопки экспорта/импорта */}
      <div className="flex gap-3">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className={`flex-1 px-4 py-2 rounded-lg border transition-all duration-200 ${
            theme === 'dark'
              ? 'border-white/20 bg-white/10 text-white hover:bg-white/20 disabled:opacity-50'
              : 'border-[#5c4032]/40 bg-[#f7f0e6] text-amber-900 hover:bg-[#f7f0e6]/80 disabled:opacity-50'
          }`}
        >
          {isExporting ? 'Экспорт...' : '📤 JSON'}
        </button>
        
        <button
          onClick={handleExportPDF}
          disabled={isExportingPDF}
          className={`flex-1 px-4 py-2 rounded-lg border transition-all duration-200 ${
            theme === 'dark'
              ? 'border-white/20 bg-white/10 text-white hover:bg-white/20 disabled:opacity-50'
              : 'border-[#5c4032]/40 bg-[#f7f0e6] text-amber-900 hover:bg-[#f7f0e6]/80 disabled:opacity-50'
          }`}
        >
          {isExportingPDF ? 'PDF...' : '📄 PDF'}
        </button>
      </div>

      {/* Кнопка импорта */}
      <div className="flex gap-3">
        <button
          onClick={handleImportClick}
          disabled={isImporting}
          className={`flex-1 px-4 py-2 rounded-lg border transition-all duration-200 ${
            theme === 'dark'
              ? 'border-white/20 bg-white/10 text-white hover:bg-white/20 disabled:opacity-50'
              : 'border-[#5c4032]/40 bg-[#f7f0e6] text-amber-900 hover:bg-[#f7f0e6]/80 disabled:opacity-50'
          }`}
        >
          {isImporting ? 'Импорт...' : '📥 Импорт данных'}
        </button>
      </div>

      {/* Кнопка очистки данных */}
      <div className="flex gap-3">
        <button
          onClick={handleClearData}
          disabled={isClearing || !hasJournalData()}
          className={`flex-1 px-4 py-2 rounded-lg border transition-all duration-200 ${
            theme === 'dark'
              ? 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-50'
              : 'border-red-600/30 bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50'
          }`}
        >
          {isClearing ? 'Очистка...' : '🗑️ Очистить все данные'}
        </button>
      </div>

      {/* Скрытый input для выбора файла */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />

      {/* Сообщение о результате */}
      {message && (
        <div className={`text-sm p-2 rounded border transition-colors duration-300 ${
          message.includes('успешно')
            ? theme === 'dark'
              ? 'border-green-500/30 bg-green-500/10 text-green-400'
              : 'border-green-600/30 bg-green-100 text-green-700'
            : theme === 'dark'
              ? 'border-red-500/30 bg-red-500/10 text-red-400'
              : 'border-red-600/30 bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Информация */}
      <div className={`text-xs p-2 rounded border transition-colors duration-300 ${
        theme === 'dark'
          ? 'border-white/20 bg-white/5 text-white/70'
          : 'border-[#5c4032]/30 bg-[#f7f0e6]/50 text-amber-900/70'
      }`}>
        <div className="mb-1 font-medium">💡 Информация:</div>
        <div>• JSON - для резервного копирования и переноса данных</div>
        <div>• PDF - для печати и чтения в удобном формате</div>
        <div>• Импорт восстанавливает данные из JSON файла</div>
        <div>• Данные сохраняются локально в браузере</div>
      </div>
    </div>
  );
};
