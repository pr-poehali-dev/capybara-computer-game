
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center">Симулятор Капибара-Компьютера</h1>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Monitor" className="text-purple-500" />
            КапиОС v1.0
          </CardTitle>
          <CardDescription>
            Добро пожаловать в мир капибар и компьютеров!
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex justify-center mb-4">
            <img 
              src="https://cdn.poehali.dev/files/000595b5-4c01-419a-a218-16712ade2431.jpeg"
              alt="Капибара" 
              className="w-64 h-auto rounded-md shadow-md"
            />
          </div>
          <p className="text-center mb-4">
            Погрузитесь в захватывающий мир симулятора компьютера с капибарами!
          </p>
          <div className="flex justify-center">
            <ul className="list-disc ml-6">
              <li>Исследуйте файловую систему</li>
              <li>Смотрите фотографии капибар</li>
              <li>Запустите вирус capybara.avi!</li>
            </ul>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Link to="/capybara">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Icon name="Power" className="mr-2" />
              Запустить КапиОС
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
