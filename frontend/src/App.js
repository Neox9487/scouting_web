import React from 'react';
import DataForm from './components/DataForm';

function App() {

  const handleFormSubmit = (formData) => {
    console.log('表單提交的數據:', formData);
    alert('數據已提交，請查看控制台！');
  };

  return (
    <div className="App">
      <h1>測試 DataForm 組件</h1>
      <DataForm onSubmit={handleFormSubmit} initialValues={{}} />
    </div>
  );
}

export default App;
