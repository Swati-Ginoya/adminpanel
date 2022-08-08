import logo from './logo.svg';
import './App.css';
import Layout from './component/layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Medicine from './container/medicine/Medicine';
import Patient from './container/patient/Patient';
import Counter from './container/counter/Counter';
import { configurstore } from './redux/Store';
import { Provider } from 'react-redux';
import { PersistGate} from 'redux-persist/integration/react'
import Doctor from './container/doctor/Doctor';

function App() {

  const {store ,persistor} = configurstore();
  return (
    <div>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Switch>
            <Route path={"/Medicine"} exact component={Medicine} />
            <Route path={"/Patient"} exact component={Patient} />
            <Route path={"/Doctor"} exact component={Doctor} />
            <Route path={"/counter"} exact component={Counter} />
          </Switch>
        </Layout>
        </PersistGate>
      </Provider>



    </div>

  );
}

export default App;
