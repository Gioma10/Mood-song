import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/RootLayout";
import Home from "./pages/Home";
import ChooseEmotions from "./pages/ChooseEmotions";
import ChooseCategory from "./pages/ChooseCategory";
import GenerateResult from "./pages/GenerateResult";
import { ANSWERQUESTIONS } from "./utils/answerQuestions";

interface AnswerObject {
  emotions: string[],
  songsQuantity: string | number,
}

function App() {
  const [categories, setCategories] = useState<{ title: string; active: boolean; emotions: string[] }[]>(ANSWERQUESTIONS);
  const [answer, setAnswer] = useState<AnswerObject>({emotions: [], songsQuantity: ''});

  // Selezione categoria
  const handleSelectCategory = (index: number) => {
      setCategories(prevCategories =>
          prevCategories.map((category, i) => ({
              ...category,
              active: i === index, // Solo l'elemento cliccato diventa attivo
          }))
      );
  };

  const selectedCategory = categories.find(category => category.active);
  const isSelected = !!selectedCategory;


  // Salvataggio emozioni
  const handleGenerate = (selectedEmotions: string[], quantity: string | number) => {
      setAnswer({emotions: [...selectedEmotions], songsQuantity: quantity});
  };

  console.log(answer);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home setState={setCategories}/>} />
          <Route path="/choose-category" element={<ChooseCategory disableBtn={!isSelected} onSelectCategory={handleSelectCategory} categories={categories}  />} />
          <Route path="/choose-emotions" element= {selectedCategory ? <ChooseEmotions onGenerate={handleGenerate} emotions={selectedCategory.emotions}/> : <Navigate to="/" />} />
          <Route path="/result-generate" element={<GenerateResult answer={answer}/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
