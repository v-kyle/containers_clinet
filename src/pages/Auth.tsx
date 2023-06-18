import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import TextInput from '../components/inputs/TextInput';
import { Tab, Tabs } from '@mui/material';
import TabPanel from '../components/TabPanel';
import { userStore } from '../stores/UserStore';
import htmlClasses from 'html-classes';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Auth = () => {
  const [nameLogin, setNameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const [nameRegister, setNameRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const isLoginReady = useMemo(() => {
    return nameLogin.length >= 3 && passwordLogin.length >=8;
  }, [nameLogin, passwordLogin]);

  const isRegisterReady = useMemo(() => {
    return nameRegister.length >= 3 && passwordRegister.length >=8;
  }, [nameRegister, passwordRegister]);

  const login = async () => {
    if (isLoginReady) {
      userStore.login({userName: nameLogin, password: passwordLogin}).then((r) => console.log(r));
    }
  }

  const register = async () => {
    if (isRegisterReady) {
      userStore.register({name: nameLogin, password: passwordLogin}).then((r) => console.log(r));
    }
  }

  return (
    <div>
      <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Login" {...a11yProps(0)} />
        <Tab label="Register" {...a11yProps(1)} />
      </Tabs>
      <div className="d-flex flex-direction-column" style={{ width: '600px' }}>
        <TabPanel value={tabValue} index={0}>
          <h2>Login</h2>
          <TextInput label="Email" value={nameLogin} onChange={(e) => setNameLogin(e.target.value)} />
          <TextInput
            label="Password"
            type="password"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
          <div className={htmlClasses('btn _primary c-white fw-600', { _disabled: !isLoginReady })} onClick={() => login()}>Login</div>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <h2>Register</h2>
          <TextInput label="Email" value={nameRegister} onChange={(e) => setNameRegister(e.target.value)} />
          <TextInput
            label="Password"
            type="password"
            value={passwordRegister}
            onChange={(e) => setPasswordRegister(e.target.value)}
          />
          <div className={htmlClasses('btn _primary c-white fw-600', {_disabled: !isRegisterReady})} onClick={() => register()}>Register</div>
        </TabPanel>
      </div>
    </div>
  );
};

export default observer(Auth);
