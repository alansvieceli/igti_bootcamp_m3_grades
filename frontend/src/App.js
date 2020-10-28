import React, { useState, useEffect } from 'react';

import Spinner from './components/Spinner';
import GradesControl from './components/GradesControl';
import ModalGrade from './components/ModalGrade';

import * as api from './api/api.services';

const App = () => {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //componentDidMount
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };
    getGrades();
    //api.getAllGrades().then(grades => setAllGrades(grades));
  }, []);

  const handleDelete = async value => {
    const isDeleted = await api.deleteGrade(value);
    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        grade => grade.id === value.id
      );
      const newGrades = Object.assign([], allGrades);
      newGrades[deletedGradeIndex].isDeleted = true;
      newGrades[deletedGradeIndex].value = 0;

      setAllGrades(newGrades);
    }
  };

  const handlePersist = async value => {
    setSelectedGrade(value);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = async formData => {
    const { id, newValue } = formData;

    const newGrades = Object.assign([], allGrades);

    const gradeToPersist = newGrades.find(grade => grade.id === id);
    gradeToPersist.value = newValue;

    if (gradeToPersist.isDeleted) {
      gradeToPersist.isDeleted = false;
      await api.insertGrade(gradeToPersist);
    } else {
      await api.updateGrade(gradeToPersist);
    }

    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="center">Controle de Notas</h1>

      {allGrades.length <= 0 && <Spinner description={'Aguarde'} />}
      {allGrades.length > 0 && (
        <GradesControl
          data={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
      {isModalOpen && (
        <ModalGrade
          selectedGrade={selectedGrade}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

export default App;
