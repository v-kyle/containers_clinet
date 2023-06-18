import React, { useLayoutEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from '../stores/UserStore';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      MainPage
    </div>
  );
};

export default observer(Main);
