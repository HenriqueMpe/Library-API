
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

interface BookFormProps {
  onSubmit: (book: BookFormData) => Promise<void>;
}

export interface BookFormData {
  title: string;
  author: string;
  publisher: string;
  year: number;
  isbn: string;
  category: string;
}

const categories = [
  "Literatura Brasileira",
  "Literatura Estrangeira",
  "Infantil",
  "Juvenil",
  "Didático",
  "Biografia",
  "História",
  "Ciências",
  "Matemática",
  "Filosofia",
  "Sociologia",
  "Geografia",
  "Ensino Religioso",
  "Artes",
  "Educação Física",
  "Outro",
];

const currentYear = new Date().getFullYear();

const BookForm = ({ onSubmit }: BookFormProps) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    publisher: "",
    year: currentYear,
    isbn: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        title: "",
        author: "",
        publisher: "",
        year: currentYear,
        isbn: "",
        category: "",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Adicionar Novo Livro</CardTitle>
        <CardDescription>
          Preencha o formulário para adicionar um novo livro à biblioteca
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              name="title"
              placeholder="Título do livro"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              name="author"
              placeholder="Nome do autor"
              required
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="publisher">Editora</Label>
              <Input
                id="publisher"
                name="publisher"
                placeholder="Nome da editora"
                required
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Ano de Publicação</Label>
              <Input
                id="year"
                name="year"
                type="number"
                placeholder="Ano"
                required
                min="1000"
                max={currentYear}
                value={formData.year}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              name="isbn"
              placeholder="ISBN do livro"
              required
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></div>
                <span>Adicionando...</span>
              </div>
            ) : (
              "Adicionar Livro"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BookForm;
