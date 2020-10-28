import React from 'react';
import Action from './components/Action';

const GradesControl = ({ data, onDelete, onPersist }) => {
  //...refazer isso aqui...
  const tableGrades = [];
  let currentStudent = data[0].student;
  let currentSubject = data[0].subject;
  let currentGrades = [];
  let id = 1;

  data.forEach(grade => {
    if (grade.subject !== currentSubject) {
      tableGrades.push({
        id: id++,
        student: currentStudent,
        subject: currentSubject,
        grades: currentGrades,
      });

      currentSubject = grade.subject;
      currentGrades = [];
    }

    if (grade.subject !== currentSubject) {
      currentStudent = grade.student;
    }

    currentGrades.push(grade);
  });

  //inserir o ultimo elemento
  tableGrades.push({
    id: id++,
    student: currentStudent,
    subject: currentSubject,
    grades: currentGrades,
  });

  const handleActionClick = (id, type) => {
    const grade = data.find(g => g.id === id);
    if (type === 'delete') {
      onDelete(grade);
      return;
    }
    onPersist(grade);
  };

  return (
    <div className="container center">
      {tableGrades.map(({ grades, id }) => {
        const finalGrade = grades.reduce((acc, curr) => acc + curr.value, 0);
        const classGrade = finalGrade > 80 ? styles.goodGrade : styles.badGrade;

        return (
          <table className="striped" key={id}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Aluno</th>
                <th style={{ width: '20%' }}>Disciplina</th>
                <th style={{ width: '20%' }}>Avaliação</th>
                <th style={{ width: '20%' }}>Nota</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(
                ({ id, subject, student, type, value, isDeleted }) => {
                  return (
                    <tr key={id}>
                      <td>{student}</td>
                      <td>{subject}</td>
                      <td>{type}</td>
                      <td>{isDeleted ? '-' : value}</td>
                      <td>
                        <div>
                          <Action
                            type={isDeleted ? 'add' : 'edit'}
                            id={id}
                            onActionClick={handleActionClick}
                          />
                          {!isDeleted && (
                            <Action
                              type="delete"
                              id={id}
                              onActionClick={handleActionClick}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
            <tfoot>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{ textAlign: 'right' }}>
                  <strong>Total:</strong>
                </td>
                <td>
                  <span style={classGrade}>{finalGrade}</span>
                </td>
                <td>&nbsp;</td>
              </tr>
            </tfoot>
          </table>
        );
      })}
    </div>
  );
};

const styles = {
  goodGrade: {
    fontWeight: 'bold',
    color: 'green',
  },
  badGrade: {
    fontWeight: 'bold',
    color: 'red',
  },

  table: {
    margin: '20px',
    padding: '10px',
  },
};

export default GradesControl;
