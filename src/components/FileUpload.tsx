import { useCallback, useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SalesRecord } from "@/types/sales";
import * as XLSX from "xlsx";

interface FileUploadProps {
  onDataLoaded: (data: SalesRecord[]) => void;
}

const FileUpload = ({ onDataLoaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [fileName, setFileName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const processFile = useCallback(
    (file: File) => {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const records: SalesRecord[] = XLSX.utils.sheet_to_json(worksheet);
          
          if (records.length > 0 && records[0].ID_Pedido) {
            onDataLoaded(records);
            setStatus("success");
          } else {
            throw new Error("Invalid data format");
          }
        } catch (err) {
          setStatus("error");
          setErrorMessage("Formato de arquivo inválido. Verifique seu arquivo Excel.");
        }
      };

      reader.onerror = () => {
        setStatus("error");
        setErrorMessage("Erro ao ler o arquivo.");
      };

      reader.readAsArrayBuffer(file);
    },
    [onDataLoaded]
  );

  const isExcelFile = (file: File) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel"
    ];
    return validTypes.includes(file.type) || file.name.endsWith(".xlsx") || file.name.endsWith(".xls");
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && isExcelFile(file)) {
        processFile(file);
      } else {
        setStatus("error");
        setErrorMessage("Por favor, envie um arquivo Excel (.xlsx).");
      }
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 cursor-pointer",
          "hover:border-primary/60 hover:bg-primary/5",
          isDragging && "border-primary bg-primary/10 scale-[1.02]",
          status === "success" && "border-success bg-success/10",
          status === "error" && "border-destructive bg-destructive/10",
          status === "idle" && "border-border"
        )}
      >
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4 text-center">
          {status === "idle" && (
            <>
              <div className="p-4 rounded-full bg-primary/10 glow-primary">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Upload Dados de Vendas
                </h3>
                <p className="text-muted-foreground">
                  Arraste e solte seu arquivo Excel aqui, ou clique para buscar
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Suporta formato Excel (.xlsx)</span>
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <div className="p-4 rounded-full bg-success/20">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  File Loaded Successfully!
                </h3>
                <p className="text-muted-foreground">{fileName}</p>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="p-4 rounded-full bg-destructive/20">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Upload Failed
                </h3>
                <p className="text-muted-foreground">{errorMessage}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
