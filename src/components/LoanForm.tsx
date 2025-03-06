
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Book } from "../contexts/BookContext";

interface LoanFormProps {
  book: Book;
  onSubmit: (loanData: LoanFormData) => Promise<void>;
  onCancel: () => void;
}

export interface LoanFormData {
  bookId: string;
  bookTitle: string;
  studentName: string;
  studentId: string;
  studentGrade: string;
  returnDate: string;
}

const grades = [
  "6º Ano - Ensino Fundamental",
  "7º Ano - Ensino Fundamental",
  "8º Ano - Ensino Fundamental",
  "9º Ano - Ensino Fundamental",
  "1º Ano - Ensino Médio",
  "2º Ano - Ensino Médio",
  "3º Ano - Ensino Médio",
  "Professor(a)",
  "Funcionário(a)",
  "Outro",
];

// Calculate minimum tomorrow and maximum 30 days from now
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 30);

const formatDateForInput = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const LoanForm = ({ book, onSubmit, onCancel }: LoanFormProps) => {
  const [formData, setFormData] = useState<LoanFormData>({
    bookId: book.id,
    bookTitle: book.title,
    studentName: "",
    studentId: "",
    studentGrade: "",
    returnDate: formatDateForInput(new Date(tomorrow.getTime() + 14 * 24 * 60 * 60 * 1000)), // Default to 14 days from tomorrow
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGradeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, studentGrade: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Registrar Empréstimo</CardTitle>
        <CardDescription>
          Livro: <span className="font-medium">{book.title}</span>
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentName">Nome do Aluno</Label>
            <Input
              id="studentName"
              name="studentName"
              placeholder="Nome completo do aluno"
              required
              value={formData.studentName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentId">Matrícula do Aluno</Label>
            <Input
              id="studentId"
              name="studentId"
              placeholder="Número de matrícula"
              required
              value={formData.studentId}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentGrade">Série/Ano</Label>
            <Select
              value={formData.studentGrade}
              onValueChange={handleGradeChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a série/ano" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="returnDate">Data de Devolução</Label>
            <Input
              id="returnDate"
              name="returnDate"
              type="date"
              required
              min={formatDateForInput(tomorrow)}
              max={formatDateForInput(maxDate)}
              value={formData.returnDate}
              onChange={handleChange}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                <span>Registrando...</span>
              </div>
            ) : (
              "Registrar Empréstimo"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoanForm;
