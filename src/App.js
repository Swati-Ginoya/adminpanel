import logo from './logo.svg';
import './App.css';
import Layout from './component/layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Medicine from './container/medicine/Medicine';
import Patient from './container/patient/Patient';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
           <Route path={"/Medicine"} exact component={Medicine}/>
           <Route path={"/Patient"} exact component={Patient}/>
        </Switch>
      </Layout>
    </div>
    
  );
}

export default App;
