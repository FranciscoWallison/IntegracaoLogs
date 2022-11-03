
import Form from './components/Form';
import { ClinicasProvider } from './context/ClinicasContext'

export default function  App() {
  return (
    <div className="App">
      <ClinicasProvider>
        <Form/>
      </ClinicasProvider>      
    </div>
  );
}