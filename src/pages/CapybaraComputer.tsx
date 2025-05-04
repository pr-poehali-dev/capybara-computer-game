
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

// Фотографии капибар
const capybaraImages = [
  "https://cdn.poehali.dev/files/000595b5-4c01-419a-a218-16712ade2431.jpeg",
  "https://cdn.poehali.dev/files/e1b848ac-57e6-44cb-bf8c-c1151b012507.jpeg",
  "https://cdn.poehali.dev/files/d0196444-2893-4629-b32f-d80078df6597.jpeg"
];

const CapybaraComputer = () => {
  const [isOn, setIsOn] = useState(false);
  const [startupComplete, setStartupComplete] = useState(false);
  const [files, setFiles] = useState<string[]>([
    "system.exe", 
    "games.app", 
    "capy_photos.folder", 
    "capybara.avi"
  ]);
  const [activeFile, setActiveFile] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [virusActive, setVirusActive] = useState(false);
  
  // Симуляция загрузки компьютера
  useEffect(() => {
    if (isOn) {
      const timer = setTimeout(() => {
        setStartupComplete(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOn]);
  
  // Обработчик открытия файла
  const handleFileClick = (file: string) => {
    setActiveFile(file);
    
    if (file === "capybara.avi") {
      setVirusActive(true);
      // Показываем первую фотографию при активации вируса
      setSelectedImage(0);
    } else if (file === "capy_photos.folder") {
      setSelectedImage(null);
    }
  };
  
  // Показ фотографии
  const handleShowImage = (index: number) => {
    setSelectedImage(index);
  };
  
  // Выключение компьютера
  const handleTurnOff = () => {
    setIsOn(false);
    setStartupComplete(false);
    setActiveFile(null);
    setVirusActive(false);
    setSelectedImage(null);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Корпус компьютера */}
      <Card className="w-full max-w-md h-[70vh] bg-gray-800 border-2 border-gray-700 rounded-md overflow-hidden shadow-xl relative">
        {/* Экран компьютера */}
        <div className={`w-full h-full p-4 ${isOn ? "bg-[#003366]" : "bg-black"} rounded-sm`}>
          {!isOn && (
            <div className="flex flex-col items-center justify-center h-full">
              <Button 
                onClick={() => setIsOn(true)} 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
              >
                <Icon name="Power" className="mr-2" /> ВКЛЮЧИТЬ
              </Button>
            </div>
          )}
          
          {isOn && !startupComplete && (
            <div className="flex flex-col items-center justify-center h-full text-green-400 font-mono">
              <div className="animate-pulse">ЗАГРУЗКА СИСТЕМЫ...</div>
              <div className="mt-4 w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 animate-[progress_2s_ease-in-out]" style={{width: '100%'}}></div>
              </div>
            </div>
          )}
          
          {isOn && startupComplete && (
            <div className="flex flex-col h-full text-white font-mono">
              {/* Верхняя панель */}
              <div className="flex justify-between items-center bg-blue-900 p-2 mb-4">
                <div>КапиОС v1.0</div>
                <Button variant="ghost" size="sm" onClick={handleTurnOff}>
                  <Icon name="Power" size={16} />
                </Button>
              </div>
              
              {virusActive && (
                <div className="absolute inset-0 z-10 bg-red-900/80 flex flex-col items-center justify-center p-4">
                  <div className="text-red-300 text-xl font-bold animate-pulse mb-4">ВНИМАНИЕ! ВИРУС ОБНАРУЖЕН!</div>
                  <img 
                    src={capybaraImages[0]} 
                    alt="Капибара вирус" 
                    className="w-64 h-64 object-cover mb-4 border-4 border-red-500 animate-[shake_0.5s_infinite]" 
                  />
                  <div className="text-white text-center mb-4">capybara.avi захватил контроль над системой!</div>
                  <Button 
                    onClick={() => setVirusActive(false)}
                    className="bg-red-700 hover:bg-red-800"
                  >
                    <Icon name="ShieldAlert" className="mr-2" /> УДАЛИТЬ ВИРУС
                  </Button>
                </div>
              )}
              
              <div className="flex flex-grow">
                {/* Файловый менеджер */}
                <div className="w-1/3 bg-blue-950 p-2 mr-2 rounded">
                  <div className="mb-2 font-bold">Файлы:</div>
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div
                        key={file}
                        onClick={() => handleFileClick(file)}
                        className={`p-2 cursor-pointer flex items-center ${
                          activeFile === file ? "bg-blue-800" : "hover:bg-blue-900"
                        }`}
                      >
                        <Icon name={
                          file.endsWith(".exe") ? "Terminal" :
                          file.endsWith(".app") ? "Gamepad2" :
                          file.endsWith(".folder") ? "Folder" : "Film"
                        } 
                        size={16}
                        className="mr-2" 
                        />
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Содержимое файла */}
                <div className="flex-grow bg-blue-950 p-2 rounded">
                  {activeFile === "capy_photos.folder" && (
                    <div>
                      <div className="mb-2 font-bold">Фотографии капибар:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {capybaraImages.map((img, index) => (
                          <div
                            key={index}
                            onClick={() => handleShowImage(index)}
                            className="cursor-pointer hover:bg-blue-900 p-1 rounded"
                          >
                            <div className="text-xs mb-1">фото_{index + 1}.jpg</div>
                            <img
                              src={img}
                              alt={`Капибара ${index + 1}`}
                              className="w-full h-20 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {activeFile === "system.exe" && (
                    <div className="h-full flex flex-col justify-center items-center">
                      <Icon name="Settings" size={48} className="mb-4 animate-spin-slow" />
                      <div>Системные настройки</div>
                      <div className="text-xs text-gray-400 mt-2">Функция в разработке</div>
                    </div>
                  )}
                  
                  {activeFile === "games.app" && (
                    <div className="h-full flex flex-col justify-center items-center">
                      <Icon name="Gamepad2" size={48} className="mb-4" />
                      <div>Игры капибар</div>
                      <div className="text-xs text-gray-400 mt-2">Скоро будут доступны</div>
                    </div>
                  )}
                  
                  {!activeFile && (
                    <div className="h-full flex flex-col justify-center items-center text-center">
                      <div>Выберите файл слева</div>
                      <div className="text-xs text-gray-400 mt-2">
                        Нажмите на capybara.avi для запуска вируса
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      {/* Диалог для просмотра фотографий */}
      <Dialog open={selectedImage !== null && !virusActive} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-md mx-auto">
          {selectedImage !== null && (
            <div>
              <img
                src={capybaraImages[selectedImage]}
                alt={`Капибара ${selectedImage + 1}`}
                className="w-full h-auto object-contain"
              />
              <div className="mt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage(
                    selectedImage > 0 ? selectedImage - 1 : capybaraImages.length - 1
                  )}
                >
                  <Icon name="ChevronLeft" />
                </Button>
                <div className="text-center">
                  Фото {selectedImage + 1} / {capybaraImages.length}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedImage(
                    selectedImage < capybaraImages.length - 1 ? selectedImage + 1 : 0
                  )}
                >
                  <Icon name="ChevronRight" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CapybaraComputer;
